import React, { useEffect, useState } from 'react';
import styles from './Synth.css';
import DelayEffect from '../Effects/DelayEffect/DelayEffect';
import Tuna from 'tunajs';
import {
  useWaveshape,
  useNewEffects,
  useNewEffectSettings,
  useGainSetting,
} from '../../hooks/EffectsProvider';
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
import '../../../public/rawStyles/piano.css';

let audioCtx;
let tuna;
let inputGain;
let outputGain;
let tunaEffects = [];
let scope;
let OScope;
let canvas;
let midiAccess = null;
let activeNotes = [];
const activeOscillators = {};
let waveshape;

export default function Synth() {
  const [localEffects, setLocalEffects] = useState([]);
  const [newActiveNotes, setNewActiveNotes] = useState([]);
  waveshape = useWaveshape();

  const gainSetting = useGainSetting();

  // NEW EFFECT STATE
  const newEffects = useNewEffects();
  const newEffectSettings = useNewEffectSettings();

  // HIDDEN COMPONENTS
  const [canvasVisibility, setCanvasVisibility] = useState(true);
  const [pianoVisibility, setPianoVisibility] = useState(true);
  const [keyboardShortcutsVisibility, setKeyboardShortcutsVisibility] = useState(false);
  const [effectsDrawerVisibility, setEffectsDrawerVisibility] = useState(true);
  const handleCanvasVisibilityClick = () => setCanvasVisibility(visibility => !visibility);
  const handlePianoVisibilityClick = () => setPianoVisibility(visibility => !visibility);
  const handleKeyboardShortcutsVisibilityClick = () => setKeyboardShortcutsVisibility(visibility => !visibility);
  const handleEffectsDrawerVisibilityClick = () => setEffectsDrawerVisibility(visibility => !visibility);

  useEffect(() => {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    tuna = new Tuna(audioCtx);
    inputGain = audioCtx.createGain();
    outputGain = audioCtx.createGain();

    canvas = document.createElement('canvas');
    canvas.height = 400;

    const root = document.getElementById('root');
    const header = root.firstChild;
    const logo = header.firstChild;
    const canvasContainer = header.lastChild;
    canvasContainer.appendChild(canvas);


    inputGain.connect(outputGain);
    outputGain.connect(audioCtx.destination);

    if (navigator.requestMIDIAccess)
      navigator.requestMIDIAccess().then(onMIDIInit, onMIDIReject);
    else alert('No MIDI support present in your browser.');

    function onMIDIInit(midi) {
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
    }

    const onMIDIReject = () => {
      alert('The MIDI system failed to start.');
    };
  }, []);

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
        tunaEffects[chainIndex].effect[setting[0]] = setting[1];
      });
    });
  }, [newEffectSettings]);

  useEffect(() => {
    inputGain.gain.value = gainSetting; //defaults to 0.15
  }, [gainSetting]);

  const firstNote = MidiNumbers.fromNote('c3');
  const lastNote = MidiNumbers.fromNote('f5');
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
        <h1>synthinator</h1>
        <div className={styles.CanvasMinimizer} onClick={handleCanvasVisibilityClick}>Toggle OScope</div>
        <section className={`${styles.OScope} ${!canvasVisibility && styles.hidden}`}>{OScope}</section>
      </header>
      <section className={styles.Container}>


        <div style={{ 'min-width' : '0' }}>
          <div className={styles.PianoMinimizer} onClick={handlePianoVisibilityClick}>Toggle Piano</div>
          <div className={styles.KeyboardShortcutsVisibilityToggle} onClick={handleKeyboardShortcutsVisibilityClick}>Toggle Keyboard Shortcuts</div>
          <DimensionsProvider>
            {({ containerWidth }) => (
              <Piano
                className={`$'PianoRetroTheme' ${!pianoVisibility && styles.hidden}`}
                noteRange={{ first: 45, last: 67 }}
                activeNotes={newActiveNotes}
                playNote={noteOn}
                stopNote={noteOff}
                width={containerWidth}
                keyboardShortcuts={keyboardShortcuts}
              />
            )}
          </DimensionsProvider>
        </div>
        <Waveshapes />
        <div className={styles.EffectsDrawerMinimizer} onClick={handleEffectsDrawerVisibilityClick}>Toggle Effects</div>
        <Effects className={`${!effectsDrawerVisibility && styles.hidden}`}></Effects>

        <div className={`${styles.effectsDrawer} ${!effectsDrawerVisibility && styles.hidden}`}>{effectNodes}</div>
      </section>
    </>
  );
}
