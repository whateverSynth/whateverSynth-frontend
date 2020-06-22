import React from 'react';

export default function App() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let keyOff;
  const gain = audioCtx.createGain();
  const activeOscillators = {};
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
    osc.type = 'square';
    activeOscillators[key] = osc;
    activeOscillators[key].connect(gain);
    activeOscillators[key].start();
  }

  window.addEventListener('keydown', function (e) {
    let x = e.keyCode;
    if (
      x === 65 ||
      x === 87 ||
      x === 83 ||
      x === 69 ||
      x === 68 ||
      x === 70 ||
      x === 84 ||
      x === 71 ||
      x === 89 ||
      x === 72 ||
      x === 85 ||
      x === 74 ||
      x === 75 ||
      x === 79 ||
      x === 76 ||
      x === 80 ||
      x === 186 ||
      x === 222 ||
      x === 221
    ) {
      // if (!keyOff) {
      //   const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
      //   key.classList.add('active');
      // }
    }
  });

  window.addEventListener('keyup', function (e) {
    let x = e.keyCode;
    if (
      x === 65 ||
      x === 87 ||
      x === 83 ||
      x === 69 ||
      x === 68 ||
      x === 70 ||
      x === 84 ||
      x === 71 ||
      x === 89 ||
      x === 72 ||
      x === 85 ||
      x === 74 ||
      x === 75 ||
      x === 79 ||
      x === 76 ||
      x === 80 ||
      x === 186 ||
      x === 222 ||
      x === 221
    ) {
      // const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
      // key.classList.remove('active');
    }
  });

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

  window.addEventListener('keydown', keyDown, false);
  window.addEventListener('keyup', keyUp, false);

  return <h1>Hello World</h1>;
}
