import React, { useState } from 'react';
import styles from './app.css';
import KeyboardEventHandler from 'react-keyboard-event-handler';

export default function App() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let keyOff;
  const gain = audioCtx.createGain();
  const activeOscillators = {};

  const [waveshape, setWaveshape] = useState('sine');

  const keyboardFrequencyMap = {
    '65': 261.625565300598634, //A - C
    '87': 277.182630976872096, //W - C#
    '83': 293.66476791740756, //S - D
    '69': 311.12698372208091, //E - D#
    '68': 329.627556912869929, //D - E
    '70': 349.228231433003884, //F - F
    '84': 369.994422711634398, //T - F#
    '71': 391.995435981749294, //G - G
    '89': 415.304697579945138, //Y - G#
    '72': 440.0, //H - A
    '85': 466.163761518089916, //U - A#
    '74': 493.883301256124111, //J - B
    '75': 523.251130601197269, //K - C
    '79': 554.365261953744192, //O - C#
    '76': 587.32953583481512, //L - D
    '80': 622.253967444161821, //P - D#
    '186': 659.255113825739859, //; - E
    '222': 698.456462866007768, //' - F
    '221': 739.988845423268797, //] - F#
  };

  gain.connect(audioCtx.destination);

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
    if (keyboardFrequencyMap[key] && !activeOscillators[key] && !keyOff) {
      playNote(key);
    }
  }

  function keyUp(event) {
    const key = (event.detail || event.which).toString();
    if (keyboardFrequencyMap[key] && activeOscillators[key] && !keyOff) {
      activeOscillators[key].stop();
      delete activeOscillators[key];
    }
  }

  // window.addEventListener('keydown', keyDown, false);
  // window.addEventListener('keyup', keyUp, false);

  const handleWaveshape = ({ target }) => {
    console.log(target.value);
    setWaveshape(target.value);
  };

  return (
    <>
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
      </div>
    </>
  );
}
