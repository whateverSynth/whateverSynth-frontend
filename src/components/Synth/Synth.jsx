import React, { useEffect, useState } from 'react';
import styles from './Synth.css';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { keyboardFrequencyMap } from '../../utils/data';
import DelayEffect from '../Effects/DelayEffect/DelayEffect';
import Tuna from 'tunajs';
import {
  useWaveshape,
  useEffects,
  useGainSetting,
  useBitcrusherSettings,
  useChorusSettings,
  useDelaySettings,
  useFilterSettings,
  useMoogSettings,
  useOverdriveSettings,
  usePannerSettings,
  usePhaserSettings,
  useReverbSettings,
  useTremoloSettings,
  useWahWahSettings,
  useCompressorSettings,
  usePingPongDelaySettings,
} from '../../hooks/EffectsProvider';
import Waveshapes from '../Waveshapes/Waveshapes';
import Keyboard from '../Keyboard/Keyboard';
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

let audioCtx;
let tuna;
let gain;
let tunaEffects = [];
let midiAccess = null;
let activeNotes = [];

export default function Synth() {
  const [localEffects, setLocalEffects] = useState([]);

  const waveshape = useWaveshape();
  const gainSetting = useGainSetting();
  const activeOscillators = {};

  // NEW EFFECT STATE
  const effects = useEffects();
  const bitcrusherSettings = useBitcrusherSettings();
  const chorusSettings = useChorusSettings();
  const compressorSettings = useCompressorSettings();
  const delaySettings = useDelaySettings();
  const filterSettings = useFilterSettings();
  const moogSettings = useMoogSettings();
  const overdriveSettings = useOverdriveSettings();
  const pannerSettings = usePannerSettings();
  const phaserSettings = usePhaserSettings();
  const pingPongDelaySettings = usePingPongDelaySettings();
  const reverbSettings = useReverbSettings();
  const tremoloSettings = useTremoloSettings();
  const wahWahSettings = useWahWahSettings();

  useEffect(() => {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    tuna = new Tuna(audioCtx);
    gain = audioCtx.createGain();
    gain.connect(audioCtx.destination);
  }, []);

  useEffect(() => {
    tunaEffects = effects.map((effect) => {
      const name = effect;
      if (name === 'Bitcrusher') return new tuna[name](bitcrusherSettings);
      if (name === 'Compressor') return new tuna[name](compressorSettings);
      if (name === 'Chorus') return new tuna[name](chorusSettings);
      if (name === 'Delay') return new tuna[name](delaySettings);
      if (name === 'Filter') return new tuna[name](filterSettings);
      if (name === 'MoogFilter') return new tuna[name](moogSettings);
      if (name === 'Overdrive') return new tuna[name](overdriveSettings);
      if (name === 'Panner') return new tuna[name](pannerSettings);
      if (name === 'Phaser') return new tuna[name](phaserSettings);
      if (name === 'PingPongDelay')
        return new tuna[name](pingPongDelaySettings);
      if (name === 'Convolver') return new tuna[name](reverbSettings);
      if (name === 'Tremolo') return new tuna[name](tremoloSettings);
      if (name === 'WahWah') return new tuna[name](wahWahSettings);
    });

    gain.disconnect();

    // MAKE CHAIN BY ITERATING OVER EFFECTS
    if (tunaEffects.length === 0) gain.connect(audioCtx.destination);
    else {
      tunaEffects.forEach((effect, i) => {
        if (tunaEffects.length === 1) {
          gain.connect(effect);
          effect.connect(audioCtx.destination);
          return;
        } else if (i === 0) {
          gain.connect(effect);
        } else if (i > 0 && i < tunaEffects.length - 1) {
          tunaEffects[i - 1].connect(effect);
        } else if (i === tunaEffects.length - 1) {
          tunaEffects[i - 1].connect(effect);
          effect.connect(audioCtx.destination);
        }
      });
    }
    setLocalEffects(tunaEffects);
    // console.log(tunaEffects);
  }, [effects]);

  //useEffect Effects
  useEffect(() => {
    const chainIndex = tunaEffects.findIndex(
      (effect) => effect.name === 'Bitcrusher'
    );
    if (chainIndex === -1) return;
    Object.entries(bitcrusherSettings).forEach((setting) => {
      tunaEffects[chainIndex][setting[0]] = setting[1];
    });
  }, [bitcrusherSettings]);

  useEffect(() => {
    const chainIndex = tunaEffects.findIndex(
      (effect) => effect.name === 'Compressor'
    );
    if (chainIndex === -1) return;
    Object.entries(compressorSettings).forEach((setting) => {
      tunaEffects[chainIndex][setting[0]] = setting[1];
    });
  }, [compressorSettings]);

  useEffect(() => {
    const chainIndex = tunaEffects.findIndex(
      (effect) => effect.name === 'Chorus'
    );
    if (chainIndex === -1) return;
    Object.entries(chorusSettings).forEach((setting) => {
      tunaEffects[chainIndex][setting[0]] = setting[1];
    });
  }, [chorusSettings]);

  useEffect(() => {
    const chainIndex = tunaEffects.findIndex(
      (effect) => effect.name === 'Delay'
    );
    if (chainIndex === -1) return;
    Object.entries(delaySettings).forEach((setting) => {
      tunaEffects[chainIndex][setting[0]] = setting[1];
    });
  }, [delaySettings]);

  useEffect(() => {
    const chainIndex = tunaEffects.findIndex(
      (effect) => effect.name === 'Filter'
    );
    if (chainIndex === -1) return;
    Object.entries(filterSettings).forEach((setting) => {
      tunaEffects[chainIndex][setting[0]] = setting[1];
    });
  }, [filterSettings]);

  useEffect(() => {
    const chainIndex = tunaEffects.findIndex(
      (effect) => effect.name === 'MoogFilter'
    );
    if (chainIndex === -1) return;
    Object.entries(moogSettings).forEach((setting) => {
      tunaEffects[chainIndex][setting[0]] = setting[1];
    });
  }, [moogSettings]);

  useEffect(() => {
    const chainIndex = tunaEffects.findIndex(
      (effect) => effect.name === 'Overdrive'
    );
    if (chainIndex === -1) return;
    Object.entries(overdriveSettings).forEach((setting) => {
      tunaEffects[chainIndex][setting[0]] = setting[1];
    });
  }, [overdriveSettings]);

  useEffect(() => {
    const chainIndex = tunaEffects.findIndex(
      (effect) => effect.name === 'Panner'
    );
    if (chainIndex === -1) return;
    Object.entries(pannerSettings).forEach((setting) => {
      tunaEffects[chainIndex][setting[0]] = setting[1];
    });
  }, [pannerSettings]);

  useEffect(() => {
    const chainIndex = tunaEffects.findIndex(
      (effect) => effect.name === 'Phaser'
    );
    if (chainIndex === -1) return;
    Object.entries(phaserSettings).forEach((setting) => {
      tunaEffects[chainIndex][setting[0]] = setting[1];
    });
  }, [phaserSettings]);

  useEffect(() => {
    const chainIndex = tunaEffects.findIndex(
      (effect) => effect.name === 'PingPongDelay'
    );
    if (chainIndex === -1) return;
    Object.entries(pingPongDelaySettings).forEach((setting) => {
      tunaEffects[chainIndex][setting[0]] = setting[1];
    });
  }, [pingPongDelaySettings]);

  useEffect(() => {
    const chainIndex = tunaEffects.findIndex(
      (effect) => effect.name === 'Convolver'
    );
    if (chainIndex === -1) return;
    Object.entries(reverbSettings).forEach((setting) => {
      tunaEffects[chainIndex][setting[0]] = setting[1];
    });
  }, [reverbSettings]);

  useEffect(() => {
    const chainIndex = tunaEffects.findIndex(
      (effect) => effect.name === 'Tremolo'
    );
    if (chainIndex === -1) return;
    Object.entries(tremoloSettings).forEach((setting) => {
      tunaEffects[chainIndex][setting[0]] = setting[1];
    });
  }, [tremoloSettings]);

  useEffect(() => {
    const chainIndex = tunaEffects.findIndex(
      (effect) => effect.name === 'WahWah'
    );
    if (chainIndex === -1) return;
    Object.entries(wahWahSettings).forEach((setting) => {
      tunaEffects[chainIndex][setting[0]] = setting[1];
    });
  }, [wahWahSettings]);

  useEffect(() => {
    gain.gain.value = gainSetting; //defaults to 0.8
  }, [gainSetting]);

  //HANDLES CREATION & STORING OF OSCILLATORS
  const playNote = (key) => {
    const osc = audioCtx.createOscillator();
    osc.frequency.setValueAtTime(
      keyboardFrequencyMap[key],
      audioCtx.currentTime
    );
    osc.type = waveshape;
    activeOscillators[key] = osc;
    activeOscillators[key].connect(gain);
    activeOscillators[key].start();
  };

  const keyDown = (event) => {
    const key = (event.detail || event.which).toString();
    if (keyboardFrequencyMap[key] && !activeOscillators[key]) {
      playNote(key);
    }
  };

  const keyUp = (event) => {
    const key = (event.detail || event.which).toString();
    if (keyboardFrequencyMap[key] && activeOscillators[key]) {
      activeOscillators[key].stop();
      delete activeOscillators[key];
    }
  };

  const removeFocus = (event) => {
    if (event.target.type === 'select-one') return;
    else {
      event.target.blur();
      Object.values(activeOscillators).forEach((oscillator) => {
        oscillator.stop();
      });
    }
  };

  window.addEventListener('mouseup', removeFocus);

  //MIDI
  const noteOn = (noteNumber) => {
    const osc = audioCtx.createOscillator();
    osc.frequency.setValueAtTime(
      frequencyFromNoteNumber(noteNumber),
      audioCtx.currentTime
    );
    osc.type = waveshape;
    activeOscillators[noteNumber] = osc;
    activeOscillators[noteNumber].connect(gain);
    activeOscillators[noteNumber].start();
  };

  const noteOff = (noteNumber) => {
    const position = activeNotes.indexOf(noteNumber);
    if (position !== -1) {
      activeNotes.splice(position, 1);
    }
    if (activeNotes.length === 0) {
      // shut off the envelope
      activeOscillators[noteNumber].stop();
      delete activeOscillators[noteNumber];
    } else {
      activeOscillators[noteNumber].stop();
      delete activeOscillators[noteNumber];
    }
  };

  const frequencyFromNoteNumber = (note) => {
    return 440 * Math.pow(2, (note - 69) / 12);
  };

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
    if (effect.name === 'Bitcrusher')
      return <BitcrusherEffect key={effect.name} />;
    if (effect.name === 'Compressor')
      return <CompressorEffect key={effect.name} />;
    if (effect.name === 'Chorus') return <ChorusEffect key={effect.name} />;
    if (effect.name === 'Delay') return <DelayEffect key={effect.name} />;
    if (effect.name === 'Filter') return <FilterEffect key={effect.name} />;
    if (effect.name === 'MoogFilter')
      return <MoogFilterEffect key={effect.name} />;
    if (effect.name === 'Overdrive')
      return <OverdriveEffect key={effect.name} />;
    if (effect.name === 'Panner') return <PannerEffect key={effect.name} />;
    if (effect.name === 'Phaser') return <PhaserEffect key={effect.name} />;
    if (effect.name === 'PingPongDelay')
      return <PingPongDelayEffect key={effect.name} />;
    if (effect.name === 'Convolver') return <ReverbEffect key={effect.name} />;
    if (effect.name === 'Tremolo') return <TremoloEffect key={effect.name} />;
    if (effect.name === 'WahWah') return <WahWahEffect key={effect.name} />;
  });

  return (
    <section className={styles.Container}>
      <KeyboardEventHandler
        handleKeys={['all']}
        onKeyEvent={(key, e) => keyDown(e)}
      />

      <KeyboardEventHandler
        handleKeys={['all']}
        handleEventType="keyup"
        onKeyEvent={(key, e) => keyUp(e)}
      />

      <h1>synthinator</h1>
      <Keyboard />
      <Waveshapes />
      <Effects />
      <div className={styles.effectsDrawer}>{effectNodes}</div>
    </section>
  );
}
