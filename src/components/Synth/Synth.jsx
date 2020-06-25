import React, { useState, useEffect } from 'react';
import styles from './Synth.css';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { keyboardFrequencyMap } from '../../utils/data';
import DelayEffect from '../Effects/DelayEffect/DelayEffect';
import Tuna from 'tunajs';
import {
  useDelayWetLevel,
  useDelayBypass,
  useDelayFeedback,
  useDelayTime,
  useDelayDryLevel,
  useDelayCutoff,
  useWaveshape,
  useEffects,
  useDelaySettings,
  useGainSetting,
} from '../../hooks/EffectsProvider';
import Waveshapes from '../Waveshapes/Waveshapes';

export default function Synth() {
  const waveshape = useWaveshape();
  const delayBypass = useDelayBypass();
  const delayFeedback = useDelayFeedback();
  const delayTime = useDelayTime();
  const delayWetLevel = useDelayWetLevel();
  const delayDryLevel = useDelayDryLevel();
  const delayCutoff = useDelayCutoff();

  // NEW EFFECT STATE
  const effects = useEffects();
  const delaySettings = useDelaySettings();

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const tuna = new Tuna(audioCtx);
  const gain = audioCtx.createGain();
  const gainSetting = useGainSetting();
  const activeOscillators = {};

  // CREATE TUNA EFFECTS USING PROVIDER STATE
  const tunaEffects = Object.entries(effects).map(effect => {
    const name = effect[0];
    if(name === 'Delay') return new tuna[name](delaySettings);
    else return new tuna[name](effect[1]);
  });

  // const compressor = new tuna.Compressor({
  //   threshold: -1, //-100 to 0
  //   makeupGain: 0, //0 and up (in decibels)
  //   attack: 0, //0 to 1000
  //   release: 0.25, //0 to 3000
  //   ratio: 20, //1 to 20
  //   knee: 5, //0 to 40
  //   automakeup: false, //true/false
  //   bypass: 0,
  // });

  // const delay = new tuna.Delay({
  //   feedback: delayFeedback, //0 to 1+
  //   delayTime: delayTime, //1 to 10000 milliseconds
  //   wetLevel: delayWetLevel, //0 to 1+
  //   dryLevel: delayDryLevel, //0 to 1+
  //   cutoff: delayCutoff, //cutoff frequency of the built in lowpass-filter. 20 to 22050
  //   bypass: delayBypass,
  // });


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

  // gain.connect(audioCtx.destination);
  // delay.connect(compressor);
  // compressor.connect(audioCtx.destination);

  gain.gain.value = gainSetting; //defaults to 0.8
  
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
