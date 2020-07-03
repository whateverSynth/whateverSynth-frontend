import React from 'react';
import {
  useHandleEffectChange,
  useHandleRemoveEffect,
  useNewEffectSettings,
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
import { defaultBitcrusherSettings } from '../../../utils/data';
import Editable from '../../global/Editable';
import { Knob } from 'react-rotary-knob';

const BitcrusherEffect = ({ id }) => {
  const handleEffectChange = useHandleEffectChange();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();
  let bitcrusher = newEffectSettings.find((setting) => setting.id === id);
  if (!bitcrusher) bitcrusher = { settings: defaultBitcrusherSettings };

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
          <button
            className={styles.buttonClose}
            onClick={() => handleRemoveEffect(id)}
          >
            x
          </button>
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

          <Knob
            value={bitcrusher?.settings.bits}
            step="1"
            min={0}
            max={16}
            onChange={(e) => handleEffectChange(e, id)}
            name="bits"
            unlockDistance={0}
            preciseMode={false}
            width={180}
            height={180}
            rotateDegrees={185}
            clampMax={330}
          />

          <label>
            bits:
            <Editable
              text={bitcrusher?.settings.bits}
              placeholder=""
              type="input"
            >
              <input
                name="bits"
                type="number"
                min="1"
                max="16"
                value={bitcrusher?.settings.bits}
                step="1"
                placeholder=""
                onChange={(e) => handleEffectChange(e, id)}
                autoFocus
              />
            </Editable>
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
            norm freq:
            <Editable
              text={Math.floor(bitcrusher?.settings.normfreq * 100) + '%'}
              placeholder=""
              type="input"
            >
              <input
                name="normfreq"
                type="number"
                placeholder=""
                min="0"
                max="1"
                value={bitcrusher?.settings.normfreq}
                step="0.1"
                onChange={(e) => handleEffectChange(e, id)}
                autoFocus
              />
            </Editable>
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
            buffer size:
            <Editable
              text={bitcrusher?.settings.bufferSize}
              placeholder=""
              type="input"
            >
              <input
                name="bufferSize"
                type="number"
                min="256"
                max="16384"
                step="10"
                placeholder=""
                value={bitcrusher?.settings.bufferSize}
                onChange={(e) => handleEffectChange(e, id)}
                autoFocus
              />
            </Editable>
          </label>
        </section>
      </main>
    </section>
  );
};

export default BitcrusherEffect;

BitcrusherEffect.propTypes = {
  id: PropTypes.string,
};
