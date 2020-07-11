import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import styles from './Synth.css';
import DelayEffect from '../Effects/DelayEffect/DelayEffect';
import Tuna from 'tunajs';
import { useWaveshape, useNewEffects, useNewEffectSettings, useGainSetting } from '../../hooks/EffectsProvider';
import Waveshapes from '../Waveshapes/Waveshapes';
import ChorusEffect from '../Effects/ChorusEffect/ChorusEffect';
import Effects from '../Effects/Effects';
import BitcrusherEffect from '../Effects/BitcrusherEffect/BitcrusherEffect';
import FilterEffect from '../Effects/FilterEffect/FilterEffect';
import MoogFilterEffect from '../Effects/MoogFilterEffect/MoogFilterEffect';
import OverdriveEffect from '../Effects/OverdriveEffect/OverdriveEffect';
import PannerEffect from '../Effects/PannerEffect/PannerEffect';
import PhaserEffect from '../Effects/PhaserEffect/PhaserEffect';
import ReverbEffect from '../Effects/ReverbEffect/ReverbEffect';
import TremoloEffect from '../Effects/TremoloEffect/TremoloEffect';
import WahWahEffect from '../Effects/WahWahEffect/WahWahEffect';
import CompressorEffect from '../Effects/CompressorEffect/CompressorEffect';
import PingPongDelayEffect from '../Effects/PingPongDelayEffect/PingPongDelayEffect';
import Oscilloscope from 'oscilloscope';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import DimensionsProvider from '../../hooks/DimensionsProvider';
import Collapsible from 'react-collapsible';
import '../../../public/rawStyles/piano.css';
import useEventListener from '@use-it/event-listener';
import { IoMdResize } from 'react-icons/io';

let audioCtx, tuna, inputGain, outputGain, scope, OScope, canvas, waveshape;
let midiAccess = null;
let tunaEffects = [];
let activeNotes = [];
const activeOscillators = {};

export default function Synth() {
  const [localEffects, setLocalEffects] = useState([]);
  const [newActiveNotes, setNewActiveNotes] = useState([]);
  const [octave, setOctave] = useState(0);
  waveshape = useWaveshape();

  const gainSetting = useGainSetting();

  // NEW EFFECT STATE
  const newEffects = useNewEffects();
  const newEffectSettings = useNewEffectSettings();

  const [
    keyboardShortcutsVisibility,
    setKeyboardShortcutsVisibility,
  ] = useState(false);
  const handleKeyboardShortcutsVisibilityClick = () =>
    setKeyboardShortcutsVisibility((visibility) => !visibility);

  const [canvasMaximized, setCanvasMaximized] = useState(true);
  const handleCanvasMaximizeClick = () => setCanvasMaximized(toggle => !toggle);
  useEffect(() => {
  }, [canvasMaximized]);

  const [pianoMaximized, setPianoMaximized] = useState(true);
  const handlePianoMaximizeClick = () => setPianoMaximized(toggle => !toggle);
  useEffect(() => {
  }, [pianoMaximized]);


  useEffect(() => {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    tuna = new Tuna(audioCtx);
    inputGain = audioCtx.createGain();
    outputGain = audioCtx.createGain();

    canvas = document.createElement('canvas');
    canvas.width = `${canvasMaximized ?  '1000' : '1000'}`;
    canvas.height = `${canvasMaximized ?  '200' : '1000'}`;
    const root = document.getElementById('root');
    const header = root.firstChild;
    // const logo = header.firstChild;

    const panel = header.lastChild;
    const panelCanvas = panel.lastChild;
    const collapsibleInner = panelCanvas.lastChild;
    const resizableCanvas = collapsibleInner.lastChild;
    resizableCanvas.appendChild(canvas);


    inputGain.connect(outputGain);
    outputGain.connect(audioCtx.destination);

    const onMIDIInit = (midi) => {
      midiAccess = midi;
      let haveAtLeastOneDevice = false;
      const inputs = midiAccess.inputs.values();

      for (
        let input = inputs.next();
        input && !input.done;
        input = inputs.next()
      ) {
        input.value.onmidimessage = MIDIMessageEventHandler;
        haveAtLeastOneDevice = true;
      }
      if (!haveAtLeastOneDevice) return;
    };

    if (navigator.requestMIDIAccess)
      navigator.requestMIDIAccess().then(onMIDIInit, onMIDIReject);
    else alert('No MIDI support present in your browser.');

    const onMIDIReject = () => {
      alert('The MIDI system failed to start.');
    };
  }, []);

  useEventListener('keydown', (e) => changeSettings(e.keyCode));

  useEffect(() => {
    tunaEffects = newEffects.map((effect) => {
      const name = effect.type;
      const setting = newEffectSettings.find(
        (setting) => setting.id === effect.id
      );
      return { id: effect.id, effect: new tuna[name](setting.settings) };
    });

    inputGain.disconnect();

    // MAKE CHAIN BY ITERATING OVER EFFECTS
    if (tunaEffects.length === 0) {
      inputGain.connect(outputGain);
      outputGain.connect(audioCtx.destination);
      scope = new Oscilloscope(outputGain);
      const context = canvas.getContext('2d');
      context.strokeStyle = '#00ff9f';
      context.lineWidth = 3;
      // console.log(context);

      OScope = scope.animate(context);
    } else {
      tunaEffects.forEach((effect, i) => {
        const realEffect = effect.effect;
        if (tunaEffects.length === 1) {
          inputGain.connect(realEffect);
          realEffect.connect(outputGain);
          outputGain.connect(audioCtx.destination);
          return;
        } else if (i === 0) {
          inputGain.connect(realEffect);
        } else if (i > 0 && i < tunaEffects.length - 1) {
          tunaEffects[i - 1].effect.connect(realEffect);
        } else if (i === tunaEffects.length - 1) {
          tunaEffects[i - 1].effect.connect(realEffect);
          realEffect.connect(outputGain);
          outputGain.connect(audioCtx.destination);
        }
      });
    }
    setLocalEffects(tunaEffects);
  }, [newEffects]);

  //useEffect Effects
  useEffect(() => {
    newEffectSettings.forEach((effectSetting) => {
      const chainIndex = tunaEffects.findIndex(
        (effect) => effect.id === effectSetting.id
      );
      Object.entries(effectSetting.settings).forEach((setting) => {
        // REVERB IMPULSE CHANGE
        if (
          setting[0] === 'impulse' &&
          tunaEffects[chainIndex].effect[setting[0]] !== setting[1]
        ) {
          const ajaxRequest = new XMLHttpRequest();
          ajaxRequest.open('GET', setting[1], true);
          ajaxRequest.responseType = 'arraybuffer';
          ajaxRequest.onload = function () {
            let audioData = ajaxRequest.response;
            audioCtx.decodeAudioData(
              audioData,
              function (buffer) {
                tunaEffects[chainIndex].effect.convolver.buffer = buffer;
              },
              function (e) {
                'Error decoding audio data' + e.err;
              }
            );
          };
          ajaxRequest.send();
        }
        tunaEffects[chainIndex].effect[setting[0]] = setting[1];
      });
    });
  }, [newEffectSettings]);

  useEffect(() => {
    inputGain.gain.value = gainSetting; //defaults to 0.15
  }, [gainSetting]);

  const firstNote = MidiNumbers.fromNote('c3') + octave * 12;
  const lastNote = MidiNumbers.fromNote('f5') + octave * 12;
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  //MIDI
  const noteOn = (noteNumber) => {
    const osc = audioCtx.createOscillator();
    osc.frequency.setValueAtTime(
      frequencyFromNoteNumber(noteNumber),
      audioCtx.currentTime
    );
    osc.type = waveshape;
    activeOscillators[noteNumber] = osc;
    activeOscillators[noteNumber].connect(inputGain);
    activeOscillators[noteNumber].start();
  };

  const noteOff = (noteNumber) => {
    const position = activeNotes.indexOf(noteNumber);
    if (position !== -1) {
      activeNotes.splice(position, 1);
    }
    if (activeNotes.length === 0) {
      // shut off the envelope
      activeOscillators[noteNumber]?.stop();
      delete activeOscillators[noteNumber];
    } else {
      activeOscillators[noteNumber]?.stop();
      delete activeOscillators[noteNumber];
    }
  };

  function changeSettings(code) {
    const x = code;
    if (x === 88 && octave < 5) {
      setNewActiveNotes([]);
      setOctave((octave) => octave + 1);
    }
    if (x === 90 && octave > -2) {
      setNewActiveNotes([]);
      setOctave((octave) => octave - 1);
    }
  }

  const frequencyFromNoteNumber = (note) => {
    return 440 * Math.pow(2, (note - 69) / 12);
  };

  const MIDIMessageEventHandler = (event) => {
    switch (event.data[0] & 0xf0) {
      case 0x90:
        if (event.data[2] !== 0) {
          // if velocity != 0, this is a note-on message
          activeNotes.push(event.data[1]);
          const newNodes = [...activeNotes];
          setNewActiveNotes(newNodes);
          return;
        }
        break;
      // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
      case 0x80:
        setNewActiveNotes(activeNotes.filter((note) => note !== event.data[1]));
        return;
    }
  };

  //PITCH DOWN
  const pitchKeyPressDown = (e) => {
    const x = e.keyCode;
    switch (x) {
      case 49:
        Object.values(activeOscillators).forEach((osc) => {
          osc.frequency.value += -20;
        });
        break;
      case 50:
        Object.values(activeOscillators).forEach((osc) => {
          osc.frequency.value += 20;
        });
        break;
    }
  };

  const pitchNormal = (e) => {
    const x = e.keyCode;
    switch (x) {
      case 49:
        Object.values(activeOscillators).forEach((osc) => {
          osc.frequency.value += 20;
        });
        break;
      case 50:
        Object.values(activeOscillators).forEach((osc) => {
          osc.frequency.value += -20;
        });
        break;
    }
  };

  useEventListener('keydown', pitchKeyPressDown);
  useEventListener('keyup', pitchNormal);

  //EFFECTS NODES
  const effectNodes = localEffects.map((effect) => {
    if (effect.effect.name === 'Bitcrusher')
      return <BitcrusherEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'Compressor')
      return <CompressorEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'Chorus')
      return <ChorusEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'Delay')
      return <DelayEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'Filter')
      return <FilterEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'MoogFilter')
      return <MoogFilterEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'Overdrive')
      return <OverdriveEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'Panner')
      return <PannerEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'Phaser')
      return <PhaserEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'PingPongDelay')
      return <PingPongDelayEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'Convolver')
      return <ReverbEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'Tremolo')
      return <TremoloEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'WahWah')
      return <WahWahEffect key={effect.id} id={effect.id} />;
  });

  return (
    <>
      <header>
        <div className={styles.Menu}>
          <h1>whateverSynth</h1>
          <button
            className={styles.buttonMinimize}
            onClick={handleKeyboardShortcutsVisibilityClick}
            className={`${keyboardShortcutsVisibility ? 'VisibilityOn' : ''}`}
          >
            ?
          </button>
        </div>

        <Collapsible trigger="Oscilloscope" triggerWhenOpen="_" open="true">
          <button className={styles.buttonResize} onClick={handleCanvasMaximizeClick}><IoMdResize/></button>
          <div className={`${canvasMaximized ? 'fullWidth' : 'miniWidth'}`}>{OScope}</div>
        </Collapsible>
      </header>
      <div style={{ minWidth: '0' }}>
        <Collapsible trigger="Piano" triggerWhenOpen="_" open="true">
          <DimensionsProvider>
            {({ containerWidth }) => (

              <div className={`pianoContainer ${pianoMaximized ? 'fullWidth' : 'miniWidth'}`}>
                <Piano
                  className={`${keyboardShortcutsVisibility ? '' : 'shortcutsHidden'}`}
                  noteRange={{ first: firstNote - 3, last: lastNote - 10 }}
                  activeNotes={newActiveNotes}
                  playNote={noteOn}
                  stopNote={noteOff}
                  width={containerWidth}
                  keyboardShortcuts={keyboardShortcuts}
                />
              </div>
            )}
          </DimensionsProvider>

        </Collapsible>
      </div>
      <Collapsible trigger="Instrument" triggerWhenOpen="_" open="true">
        <div className={styles.octave}>
          Octave:
          <button onClick={(e) => changeSettings(Number(e.target.value))} value={90}>↓</button>
          C{octave + 2}
          <button onClick={(e) => changeSettings(Number(e.target.value))} value={88}>↑</button>
        </div>
        <Waveshapes />
      </Collapsible>

      <Collapsible trigger="Effects" triggerWhenOpen="_" open="true">
        <Effects />
        <div className={`${styles.effectsDrawer}`}>{effectNodes}</div>
      </Collapsible>
    </>
  );
}
