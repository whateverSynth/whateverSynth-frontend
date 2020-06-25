import React, { useEffect } from 'react';
import styles from './Synth.css';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { keyboardFrequencyMap } from '../../utils/data';
import DelayEffect from '../Effects/DelayEffect/DelayEffect';
import Tuna from 'tunajs';
import {
  useWaveshape,
  useEffects,
  useDelaySettings,
  useGainSetting,
  useChorusSettings,
  usePhaserSettings,
  useTremoloSettings,
  useWahWahSettings,
  useBitcrusherSettings,
} from '../../hooks/EffectsProvider';
import Waveshapes from '../Waveshapes/Waveshapes';

let audioCtx;
let tuna;
let gain;
let tunaEffects;

export default function Synth() {

  const waveshape = useWaveshape();
  const gainSetting = useGainSetting();
  const activeOscillators = {};

  // NEW EFFECT STATE
  const effects = useEffects();
  const chorusSettings = useChorusSettings();
  const phaserSettings = usePhaserSettings();
  const delaySettings = useDelaySettings();
  const tremoloSettings = useTremoloSettings();
  const wahWahSettings = useWahWahSettings();
  const bitcrusherSettings = useBitcrusherSettings();

  useEffect(() => {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    tuna = new Tuna(audioCtx);
    gain = audioCtx.createGain();

    tunaEffects = effects.map(effect => {
      const name = effect;
      if(name === 'Chorus') return new tuna[name](chorusSettings);
      if(name === 'Phaser') return new tuna[name](phaserSettings);
      if(name === 'Delay') return new tuna[name](delaySettings);
      if(name === 'Tremolo') return new tuna[name](tremoloSettings);
      if(name === 'WahWah') return new tuna[name](wahWahSettings);
      if(name === 'Bitcrusher') return new tuna[name](bitcrusherSettings);
    });
  
    // MAKE CHAIN BY ITERATING OVER EFFECTS
    tunaEffects.forEach((effect, i) => {
      if(tunaEffects.length === 1) {
        gain.connect(effect);
        effect.connect(audioCtx.destination);
        return;
      }
      else if(i === 0) {
        gain.connect(effect);
      }
      else if(i > 0 && i < tunaEffects.length - 1) {
        tunaEffects[i - 1].connect(effect);
      }
      else if(i === tunaEffects.length - 1) {
        tunaEffects[i - 1].connect(effect);
        effect.connect(audioCtx.destination);
      }
    });
  }, []);

  useEffect(() => {
    const chainIndex = tunaEffects.findIndex(effect => effect.name === 'Delay');
    Object.entries(delaySettings).forEach(setting => {
      tunaEffects[chainIndex][setting[0]] = setting[1];
    });
  }, [delaySettings]);

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
    if(keyboardFrequencyMap[key] && !activeOscillators[key]) {
      playNote(key);
    }
  }

  function keyUp(event) {
    const key = (event.detail || event.which).toString();
    if(keyboardFrequencyMap[key] && activeOscillators[key]) {
      activeOscillators[key].stop();
      delete activeOscillators[key];
    }
  }

  function removeFocus(event) {
    event.target.blur();
    Object.values(activeOscillators).forEach(oscillator => {
      oscillator.stop();
    });
  }

  window.addEventListener('mouseup', removeFocus);

  return (
    <div className={styles.Container}>
      <KeyboardEventHandler
        handleKeys={['all']}
        onKeyEvent={(key, e) => keyDown(e)}
      />

      <KeyboardEventHandler
        handleKeys={['all']}
        handleEventType="keyup"
        onKeyEvent={(key, e) => keyUp(e)}
      />
      <h1>Synthinator</h1>

      <Waveshapes />

      <DelayEffect />
    </div>
  );
}
