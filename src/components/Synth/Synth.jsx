import React from 'react';
import styles from './Synth.css';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { keyboardFrequencyMap } from '../../utils/data';
import Tuna from 'tunajs';
import {
  useDelayWetLevel,
  useHandleDelayWetLevel,
  useDelayBypass,
  useHandleDelayBypass,
  useDelayFeedback,
  useHandleDelayFeedback,
  useDelayTime,
  useHandleDelayTime,
  useDelayDryLevel,
  useDelayCutoff,
  useHandleDelayDryLevel,
  useHandleDelayCutoff,
  useHandleWaveshape,
  useWaveshape,
} from '../../hooks/EffectsProvider';

export default function Synth() {
  const waveshape = useWaveshape();
  const delayBypass = useDelayBypass();
  const delayFeedback = useDelayFeedback();
  const delayTime = useDelayTime();
  const delayWetLevel = useDelayWetLevel();
  const delayDryLevel = useDelayDryLevel();
  const delayCutoff = useDelayCutoff();
  const handleWaveshape = useHandleWaveshape();
  const handleDelayBypass = useHandleDelayBypass();
  const handleDelayFeedback = useHandleDelayFeedback();
  const handleDelayTime = useHandleDelayTime();
  const handleDelayWetLevel = useHandleDelayWetLevel();
  const handleDelayDryLevel = useHandleDelayDryLevel();
  const handleDelayCutoff = useHandleDelayCutoff();

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const tuna = new Tuna(audioCtx);
  const gain = audioCtx.createGain();
  const activeOscillators = {};

  const compressor = new tuna.Compressor({
    threshold: -1, //-100 to 0
    makeupGain: 0, //0 and up (in decibels)
    attack: 0, //0 to 1000
    release: 0.25, //0 to 3000
    ratio: 20, //1 to 20
    knee: 5, //0 to 40
    automakeup: false, //true/false
    bypass: 0,
  });

  const delay = new tuna.Delay({
    feedback: delayFeedback, //0 to 1+
    delayTime: delayTime, //1 to 10000 milliseconds
    wetLevel: delayWetLevel, //0 to 1+
    dryLevel: delayDryLevel, //0 to 1+
    cutoff: delayCutoff, //cutoff frequency of the built in lowpass-filter. 20 to 22050
    bypass: delayBypass,
  });

  gain.gain.value = 0.8;
  gain.connect(delay);
  delay.connect(compressor);
  compressor.connect(audioCtx.destination);

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
    event.target.blur();
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
      <input
        type="radio"
        value="sine"
        name="waveshapes"
        id="sine"
        defaultChecked
        onClick={() => handleWaveshape(event)}
      />
      <label>sine</label>
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

      <div>
        <input
          type="checkbox"
          value={delayBypass}
          onChange={handleDelayBypass}
          // onClick={window.focus()}
        ></input>
        <label>Delay Bypass</label>
      </div>

      <div>
        <input
          type="range"
          min="0"
          max="1"
          value={delayFeedback}
          step="0.05"
          id="delayFeedbackRange"
          onChange={handleDelayFeedback}
        ></input>
        <label>Delay Feedback</label>
      </div>

      <div>
        <input
          type="range"
          min="1"
          max="1000"
          value={delayTime}
          step="1"
          id="delayTimeRange"
          onChange={handleDelayTime}
        ></input>
        <label>Delay Time</label>
      </div>

      <div>
        <input
          type="range"
          min="0"
          max="1"
          value={delayWetLevel}
          step="0.1"
          id="delayWetLevelRange"
          onChange={handleDelayWetLevel}
        ></input>
        <label>Delay Wet Level</label>
      </div>

      <div>
        <input
          type="range"
          min="0"
          max="1"
          value={delayDryLevel}
          step="0.1"
          id="delayDryLevelRange"
          onChange={handleDelayDryLevel}
        ></input>
        <label>Delay Dry Level</label>
      </div>

      <div>
        <input
          type="range"
          min="20"
          max="22050"
          value={delayCutoff}
          step="10"
          id="delayCutoffRange"
          onChange={handleDelayCutoff}
        ></input>
        <label>Delay Cutoff</label>
      </div>
    </div>
  );
}
