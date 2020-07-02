import React from 'react';
import {
  useHandleCompressor,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
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
          threshold: <p>{compressor?.settings.threshold} db</p>
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
          makeup gain: <p>{compressor?.settings.makeupGain} db</p>
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
          attack: <p>{compressor?.settings.attack}</p>
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
          release: <p>{compressor?.settings.release}</p>
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
          ratio: <p>{compressor?.settings.ratio}</p>
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
          knee: <p>{compressor?.settings.knee}</p>
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
