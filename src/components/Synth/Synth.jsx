import React, { useState } from 'react';
import styles from './Synth.css';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { keyboardFrequencyMap } from '../../utils/data';
import Tuna from 'tunajs';
import Effects from '../Effects/Effects';

export default function Synth() {
  const [waveshape, setWaveshape] = useState('sine');
  const [delayWet, setDelayWet] = useState(0.5);

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const tuna = new Tuna(audioCtx);
  const delay = new tuna.Delay({
    feedback: delayWet,    //0 to 1+
    delayTime: 150,    //1 to 10000 milliseconds
    wetLevel: 0.25,    //0 to 1+
    dryLevel: 1,       //0 to 1+
    cutoff: 2000,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
    bypass: 0
  });

  const gain = audioCtx.createGain();
  gain.connect(delay);
  delay.connect(audioCtx.destination);
  const activeOscillators = {};

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

  const handleWaveshape = ({ target }) => {
    setWaveshape(target.value);
  };

  const handleDelayWetness = ({ target }) => {
    setDelayWet(target.value);
  };

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
      <input
        className={styles.Radio}
        type="radio"
        value="square"
        name="waveshapes"
        id="square"
        onClick={() => handleWaveshape(event)}
      />
      <label>square</label>
      <input
        type="radio"
        value="sine"
        name="waveshapes"
        id="sine"
        onClick={() => handleWaveshape(event)}
      />
      <label>sine</label>
      <input
        type="radio"
        value="triangle"
        name="waveshapes"
        id="triangle"
        onClick={() => handleWaveshape(event)}
      />
      <label>triangle</label>
      <input
        type="radio"
        value="sawtooth"
        name="waveshapes"
        id="sawtooth"
        onClick={() => handleWaveshape(event)}
      />
      <label>sawtooth</label>
      <Effects tuna={tuna} delayWet={delayWet} handleDelayWetness={handleDelayWetness}/>
    </div>
  );
}
