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
    <section className={styles.Controls}>
      
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
      <div className={styles.Radio}>
        <label>
          <input
            type="radio"
            value="sine"
            name="waveshapes"
            id="sine"
            defaultChecked
            onClick={() => handleWaveshape(event)}
            img="../../../public/assets/sine.png"
          />
        sine</label>
        <label>
          <input
            type="radio"
            value="square"
            name="waveshapes"
            id="square"
            onClick={() => handleWaveshape(event)}
          />
        square</label>
        <label>
          <input
            type="radio"
            value="triangle"
            name="waveshapes"
            id="triangle"
            onClick={() => handleWaveshape(event)}
          />
        triangle</label>
        <label>
          <input
            type="radio"
            value="sawtooth"
            name="waveshapes"
            id="sawtooth"
            onClick={() => handleWaveshape(event)}
          />
        sawtooth</label>
      </div>
    </section>
  );
};

export default Waveshapes;
