import React from 'react';
import {
  useHandleCompressor,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
import Editable from '../../global/Editable';
import { defaultCompressorSettings } from '../../../utils/data';

const CompressorEffect = ({ id }) => {
  const handleCompressor = useHandleCompressor();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();
  let compressor = newEffectSettings.find(setting => setting.id === id);
  if(!compressor) compressor = { settings: defaultCompressorSettings };

  return (
    <section className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={compressor?.settings.bypass}
            onChange={(e) => handleCompressor(e, id)}
            name="bypass"
            id="compressorBypass"
          ></input>
          <h2>compressor</h2>
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>x</button>
        </header>
        <section>
          <input
            type="range"
            min="-100"
            max="0"
            value={compressor?.settings.threshold}
            step="1"
            id="compressorThresholdRange"
            onChange={(e) => handleCompressor(e, id)}
            name="threshold"
          ></input>
          <label>
          threshold:
            <Editable
              text={compressor?.settings.threshold}
              placeholder="0"
              type="input"
            >
              <input
                name="threshold"
                type="number"
                min="-100"
                max="0"
                value={compressor?.settings.threshold}
                step="1"
                placeholder="0"
                onChange={(e) => handleCompressor(e, id)}
                autoFocus
              />
            </Editable>
            <p> db</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="20"
            value={compressor?.settings.makeupGain}
            step="1"
            id="makeupGainRange"
            onChange={(e) => handleCompressor(e, id)}
            name="makeupGain"
          ></input>
          <label>
          makeup gain:
            <Editable
              text={compressor?.settings.makeupGain}
              placeholder="0"
              type="input"
            >
              <input
                name="makeupGain"
                type="number"
                min="0"
                max="20"
                value={compressor?.settings.makeupGain}
                step="1"
                placeholder="0"
                onChange={(e) => handleCompressor(e, id)}
                autoFocus
              />
            </Editable>
            <p> db</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1000"
            value={compressor?.settings.attack}
            step="1"
            id="compressorAttackRange"
            onChange={(e) => handleCompressor(e, id)}
            name="attack"
          ></input>
          <label>
          attack:
            <Editable
              text={compressor?.settings.attack}
              placeholder="0"
              type="input"
            >
              <input
                name="attack"
                type="number"
                min="0"
                max="1000"
                value={compressor?.settings.attack}
                step="1"
                placeholder="0"
                onChange={(e) => handleCompressor(e, id)}
                autoFocus
              />
            </Editable>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1000"
            value={compressor?.settings.release}
            step="1"
            id="compressorReleaseRange"
            onChange={(e) => handleCompressor(e, id)}
            name="release"
          ></input>
          <label>
          release:
            <Editable
              text={compressor?.settings.release}
              placeholder="0"
              type="input"
            >
              <input
                name="release"
                type="number"
                min="0"
                max="1000"
                value={compressor?.settings.release}
                step="1"
                placeholder="0"
                onChange={(e) => handleCompressor(e, id)}
                autoFocus
              />
            </Editable>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="1"
            max="20"
            value={compressor?.settings.ratio}
            step="1"
            id="compressorRatioRange"
            onChange={(e) => handleCompressor(e, id)}
            name="ratio"
          ></input>
          <label>
          ratio:
            <Editable
              text={compressor?.settings.ratio}
              placeholder="0"
              type="input"
            >
              <input
                name="ratio"
                type="number"
                min="1"
                max="20"
                value={compressor?.settings.ratio}
                step="1"
                placeholder="0"
                onChange={(e) => handleCompressor(e, id)}
                autoFocus
              />
            </Editable>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="40"
            value={compressor?.settings.knee}
            step="1"
            id="compressorKneeRange"
            onChange={(e) => handleCompressor(e, id)}
            name="knee"
          ></input>
          <label>
          knee:
            <Editable
              text={compressor?.settings.knee}
              placeholder="0"
              type="input"
            >
              <input
                name="knee"
                type="number"
                min="0"
                max="40"
                value={compressor?.settings.knee}
                step="1"
                placeholder="0"
                onChange={(e) => handleCompressor(e, id)}
                autoFocus
              />
            </Editable>
          </label>
        </section>

        <section>
          <input
            type="checkbox"
            value={compressor?.settings.automakeup}
            onChange={(e) => handleCompressor(e, id)}
            name="automakeup"
            id="compressorAutomakeup"
          ></input>
          <label htmlFor="compressorAutomakeup" className={styles.checkbox}>
            automakeup
          </label>
        </section>
      </main>
    </section>
  );
};

export default CompressorEffect;

CompressorEffect.propTypes = {
  id: PropTypes.string,
};
