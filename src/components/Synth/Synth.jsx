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
// import EnvelopeGen from 'envelope-generator';
import 'react-piano/dist/styles.css';
import Envelope from '../Envelope/Envelope';

let audioCtx;
let tuna;
let inputGain;
let outputGain;
let tunaEffects = [];
let scope;
// let OScope;
let canvas;
let midiAccess = null;
// let env;
// let settings;
let activeNotes = [];

const activeOscillators = {};

export default function Synth() {
  const [localEffects, setLocalEffects] = useState([]);

  const waveshape = useWaveshape();
  const gainSetting = useGainSetting();

  // NEW EFFECT STATE
  const newEffects = useNewEffects();
  const newEffectSettings = useNewEffectSettings();

  useEffect(() => {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    tuna = new Tuna(audioCtx);
    inputGain = audioCtx.createGain();
    outputGain = audioCtx.createGain();
    // settings = {
    //   curve: 'linear',
    //   attackCurve: 'linear',
    //   decayCurve: 'linear',
    //   releaseCurve: 'linear',
    //   initialValueCurve: Float32Array,
    //   releaseValueCurve: Float32Array,
    //   sampleRate: 44100,
    //   delayTime: 2,
    //   startLevel: 0,
    //   maxLevel: 1,
    //   attackTime: 0.1,
    //   holdTime: 0,
    //   decayTime: 24,
    //   sustainLevel: 12,
    //   releaseTime: 1,
    // };

    canvas = document.createElement('canvas');
    canvas.width = 450;
    canvas.height = 450;

    document.body.appendChild(canvas);

    inputGain.connect(outputGain);
    outputGain.connect(audioCtx.destination);

    // env.start(audioCtx.currentTime);

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
      context.strokeStyle = '#2BFDA2';
      context.lineWidth = 5;
      // console.log(context);

      scope.animate(context);
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
    // osc.start(audioCtx.currentTime);
    // env = new EnvelopeGen(audioCtx, settings);
    // env.connect(inputGain.gain);
    // env.start(audioCtx.currentTime);
    // let stopAt = env.getReleaseCompleteTime();
    // env.release(audioCtx.currentTime + 1);
    // env.stop(stopAt);
  };

  const noteOff = (noteNumber) => {
    const position = activeNotes.indexOf(noteNumber);
    if (position !== -1) {
      activeNotes.splice(position, 1);
    }
    if (activeNotes.length === 0) {
      // shut off the envelope
      // let stopAt = env.getReleaseCompleteTime();
      // env.release(audioCtx.currentTime + 1);
      // env.stop(stopAt);
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
          noteOn(event.data[1]);
          return;
        }
        break;
      // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
      case 0x80:
        noteOff(event.data[1]);
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
      <h1>whateverSynth</h1>
      <section className={styles.Container}>
        <Piano
          className="PianoRetroTheme"
          noteRange={{ first: 45, last: 67 }}
          playNote={noteOn}
          stopNote={noteOff}
          width={1000}
          keyboardShortcuts={keyboardShortcuts}
        />
        <Envelope />

        <Waveshapes />
        <Effects />
        <div className={styles.effectsDrawer}>{effectNodes}</div>
      </section>
    </>
  );
}
