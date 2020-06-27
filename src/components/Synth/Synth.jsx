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
} from '../../hooks/EffectsProvider';
import Waveshapes from '../Waveshapes/Waveshapes';
import Keyboard from '../Keyboard/Keyboard';
import ChorusEffect from '../Effects/ChorusEffect/ChorusEffect';
import Effects from '../Effects/Effects';

let audioCtx;
let tuna;
let gain;
let tunaEffects = [];

export default function Synth() {
  const [localEffects, setLocalEffects] = useState([]);

  const waveshape = useWaveshape();
  const gainSetting = useGainSetting();
  const activeOscillators = {};

  // NEW EFFECT STATE
  const effects = useEffects();
  const bitcrusherSettings = useBitcrusherSettings();
  const chorusSettings = useChorusSettings();
  const delaySettings = useDelaySettings();
  const filterSettings = useFilterSettings();
  const moogSettings = useMoogSettings();
  const overdriveSettings = useOverdriveSettings();
  const pannerSettings = usePannerSettings();
  const phaserSettings = usePhaserSettings();
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
      if (name === 'Chorus') return new tuna[name](chorusSettings);
      if (name === 'Delay') return new tuna[name](delaySettings);
      if (name === 'Filter') return new tuna[name](filterSettings);
      if (name === 'MoogFilter') return new tuna[name](moogSettings);
      if (name === 'Overdrive') return new tuna[name](overdriveSettings);
      if (name === 'Panner') return new tuna[name](pannerSettings);
      if (name === 'Phaser') return new tuna[name](phaserSettings);
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
    console.log(tunaEffects);
  }, [effects]);

  //useEffect Effects
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
      (effect) => effect.name === 'Chorus'
    );
    if (chainIndex === -1) return;
    Object.entries(chorusSettings).forEach((setting) => {
      tunaEffects[chainIndex][setting[0]] = setting[1];
    });
  }, [chorusSettings]);

  // useEffect(() => {
  //   const chainIndex = tunaEffects.findIndex(
  //     (effect) => effect.name === 'Chorus'
  //   );
  //   if (chainIndex === -1) return;
  //   Object.entries(chorusSettings).forEach((setting) => {
  //     tunaEffects[chainIndex][setting[0]] = setting[1];
  //   });
  // }, [chorusSettings]);

  useEffect(() => {
    gain.gain.value = gainSetting; //defaults to 0.8
  }, [gainSetting]);

  //HANDLES CREATION & STORING OF OSCILLATORS
  function playNote(key) {
    const osc = audioCtx.createOscillator();
    osc.frequency.setValueAtTime(
      keyboardFrequencyMap[key],
      audioCtx.currentTime
    );
    osc.type = waveshape;
    activeOscillators[key] = osc;
    activeOscillators[key].connect(gain);
    activeOscillators[key].start();
  }

  function keyDown(event) {
    const key = (event.detail || event.which).toString();
    if (keyboardFrequencyMap[key] && !activeOscillators[key]) {
      playNote(key);
    }
  }

  function keyUp(event) {
    const key = (event.detail || event.which).toString();
    if (keyboardFrequencyMap[key] && activeOscillators[key]) {
      activeOscillators[key].stop();
      delete activeOscillators[key];
    }
  }

  function removeFocus(event) {
    if (event.target.type === 'select-one') return;
    else {
      event.target.blur();
      Object.values(activeOscillators).forEach((oscillator) => {
        oscillator.stop();
      });
    }
  }

  window.addEventListener('mouseup', removeFocus);

  const effectNodes = localEffects.map((effect) => {
    if (effect.name === 'Bitcrusher')
      return <li key={effect.name}>BITCRUSHER SETTINGS</li>;
    if (effect.name === 'Chorus') return <ChorusEffect key={effect.name} />;
    if (effect.name === 'Delay') return <DelayEffect key={effect.name} />;
    if (effect.name === 'Filter')
      return <li key={effect.name}>FILTER SETTINGS</li>;
    if (effect.name === 'MoogFilter')
      return <li key={effect.name}>MOOG FILTER</li>;
    if (effect.name === 'Overdrive')
      return <li key={effect.name}>OVERDRIVE SETTINGS</li>;
    if (effect.name === 'Panner')
      return <li key={effect.name}>PANNER SETTINGS</li>;
    if (effect.name === 'Phaser')
      return <li key={effect.name}>PHASER SETTINGS</li>;
    if (effect.name === 'Convolver')
      return <li key={effect.name}>REVERB SETTINGS</li>;
    if (effect.name === 'Tremolo')
      return <li key={effect.name}>TREMOLO SETTINGS</li>;
    if (effect.name === 'WahWah')
      return <li key={effect.name}>WAHWAH SETTINGS</li>;
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
      <ul>{effectNodes}</ul>
    </section>
  );
}
