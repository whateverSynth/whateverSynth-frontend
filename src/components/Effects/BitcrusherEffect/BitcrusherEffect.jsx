import React from 'react';
import {
  useHandleEffectChange,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
import { defaultBitcrusherSettings } from '../../../utils/data';

const BitcrusherEffect = ({ id }) => {
  const handleEffectChange = useHandleEffectChange();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();
  let bitcrusher = newEffectSettings.find(setting => setting.id === id);
  if(!bitcrusher) bitcrusher = { settings: defaultBitcrusherSettings };

  return (
    <section className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={bitcrusher?.settings.bypass}
            onChange={(e) => handleEffectChange(e, id)}
            name="bypass"
            id="bitcrusherBypass"
          ></input>
          <h2>bitcrusher</h2>
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>x</button>
        </header>
        <section>
          <input
            type="range"
            min="1"
            max="16"
            value={bitcrusher?.settings.bits}
            step="1"
            id="bitcrusherBitsRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="bits"
          ></input>
          <label>
          bits: <p>{bitcrusher?.settings.bits}</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={bitcrusher?.settings.normfreq}
            step="0.1"
            id="bitcrusherNormFreqRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="normfreq"
          ></input>
          <label>
          norm freq: <p>{Math.floor(bitcrusher?.settings.normfreq * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="256"
            max="16384"
            value={bitcrusher?.settings.bufferSize}
            step="1"
            id="BitcrusherBufferSizeRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="bufferSize"
          ></input>
          <label>
          buffer size: <p>{bitcrusher?.settings.bufferSize}</p>
          </label>
        </section>

        <input
          type="checkbox"
          value={bitcrusherSettings.bypass}
          onChange={handleBitcrusher}
          name="bypass"
          id="bypass"
        ></input>
        <label htmlFor="bypass" className={styles.bypass}>
          bypass
        </label>
      </main>
    </section>
  );
};

export default BitcrusherEffect;

BitcrusherEffect.propTypes = {
  id: PropTypes.string,
};
