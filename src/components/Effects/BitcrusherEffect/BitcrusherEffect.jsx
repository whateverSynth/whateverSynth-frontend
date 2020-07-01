import React from 'react';
import {
  useBitcrusherSettings,
  useHandleBitcrusher,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';

const BitcrusherEffect = ({ id }) => {
  const bitcrusherSettings = useBitcrusherSettings();
  const handleBitcrusher = useHandleBitcrusher();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();

  return (
    <div className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={bitcrusherSettings.bypass}
            onChange={handleBitcrusher}
            name="bypass"
            id="bitcrusherBypass"
          ></input>
          <h2>bitcrusher</h2>
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>&#10060;</button>
        </header>
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
      </main>
    </div>
  );
};

export default BitcrusherEffect;

BitcrusherEffect.propTypes = {
  id: PropTypes.string,
};
