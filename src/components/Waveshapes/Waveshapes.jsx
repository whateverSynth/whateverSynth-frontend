import React from 'react';
import {
  useHandleWaveshape,
  useHandleGainSetting,
  useGainSetting,
} from '../../hooks/EffectsProvider';
import styles from './Waveshapes.css';
import Sine from '../../../public/assets/sine.svg';
import Square from '../../../public/assets/square.svg';
import Triangle from '../../../public/assets/triangle.svg';
import Sawtooth from '../../../public/assets/sawtooth.svg';

const Waveshapes = () => {
  const gainSetting = useGainSetting();
  const handleGainSetting = useHandleGainSetting();
  const handleWaveshape = useHandleWaveshape();

  return (
    <section className={styles.Controls}>
      <section className={styles.Volume}>
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
      </section>
      <div className={styles.Radio}>
        <label>
          <input
            type="radio"
            value="sine"
            name="waveshapes"
            id="sine"
            defaultChecked
            onClick={() => handleWaveshape(event)}
          />
          <Sine />
        </label>
        <label>
          <input
            type="radio"
            value="square"
            name="waveshapes"
            id="square"
            onClick={() => handleWaveshape(event)}
          />
          <Square />
        </label>
        <label>
          <input
            type="radio"
            value="triangle"
            name="waveshapes"
            id="triangle"
            onClick={() => handleWaveshape(event)}
          />
          <Triangle />
        </label>
        <label>
          <input
            type="radio"
            value="sawtooth"
            name="waveshapes"
            id="sawtooth"
            onClick={() => handleWaveshape(event)}
          />
          <Sawtooth />
        </label>
      </div>
    </section>
  );
};

export default Waveshapes;
