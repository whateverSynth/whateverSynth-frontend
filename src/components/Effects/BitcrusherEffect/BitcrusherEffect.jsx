import React from 'react';
import {
  useBitcrusherSettings,
  useHandleBitcrusher,
} from '../../../hooks/EffectsProvider';
import styles from '../Effects.css';

const BitcrusherEffect = () => {
  const bitcrusherSettings = useBitcrusherSettings();
  const handleBitcrusher = useHandleBitcrusher();

  return (
    <section className={styles.Effects}>
      <section>
        <h2>bitcrusher &nbsp;</h2>
        <button>x</button>
      </section>

      <section>
        <input
          type="range"
          min="1"
          max="16"
          value={bitcrusherSettings.bits}
          step="1"
          id="bitcrusherBitsRange"
          onChange={handleBitcrusher}
          name="bits"
        ></input>
        <label>
          bits: <p>{bitcrusherSettings.bits}</p>
        </label>
      </section>

      <section>
        <input
          type="range"
          min="0"
          max="1"
          value={bitcrusherSettings.normfreq}
          step="0.1"
          id="bitcrusherNormFreqRange"
          onChange={handleBitcrusher}
          name="normfreq"
        ></input>
        <label>
          norm freq: <p>{Math.floor(bitcrusherSettings.normfreq * 100)} %</p>
        </label>
      </section>

      <section>
        <input
          type="range"
          min="256"
          max="16384"
          value={bitcrusherSettings.bufferSize}
          step="1"
          id="BitcrusherBufferSizeRange"
          onChange={handleBitcrusher}
          name="bufferSize"
        ></input>
        <label>
          buffer size: <p>{bitcrusherSettings.bufferSize}</p>
        </label>
      </section>

      <input
        type="checkbox"
        value={bitcrusherSettings.bypass}
        onChange={handleBitcrusher}
        name="bypass"
      ></input>
      <label className={styles.bypass}>bypass</label>
    </section>
  );
};

export default BitcrusherEffect;
