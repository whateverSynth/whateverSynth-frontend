import React from 'react';
import {
  useHandleWaveshape,
  useHandleGainSetting,
  useGainSetting,
} from '../../hooks/EffectsProvider';
import styles from './Waveshapes.css';

const Waveshapes = () => {
  const gainSetting = useGainSetting();
  const handleGainSetting = useHandleGainSetting();
  const handleWaveshape = useHandleWaveshape();

  return (
    <section className={styles.Radio}>
      <input
        type="range"
        min="0"
        max="1"
        value={gainSetting}
        step="0.01"
        id="gainSetting"
        onChange={handleGainSetting}
      ></input>
      <label className={styles.Gain}>
        volume: <p>{Math.floor(gainSetting * 100)} %</p>
      </label>

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
    </section>
  );
};

export default Waveshapes;
