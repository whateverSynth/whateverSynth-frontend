import React from 'react';
import {
  useHandleEffectChange,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';

const ChorusEffect = ({ id }) => {
  const handleEffectChange = useHandleEffectChange();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();
  const chorus = newEffectSettings.find(setting => setting.id === id);

  return (
    <div className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={chorus?.settings.bypass}
            onChange={(e) => handleEffectChange(e, id)}
            name="bypass"
            id="chorusBypass"
          ></input>
          <h2>chorus</h2>
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>&#10060;</button>
        </header>
        <section>
          <input
            type="range"
            min="0.01"
            max="8"
            value={chorus?.settings.rate}
            step="0.01"
            id="chorusRate"
            onChange={(e) => handleEffectChange(e, id)}
            name="rate"
          ></input>
          <label>
          rate: <p>{chorus?.settings.rate} Hz</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={chorus?.settings.feedback}
            step="0.05"
            id="chorusFeedbackRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="feedback"
          ></input>
          <label>
          feedback: <p>{Math.floor(chorus?.settings.feedback * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={chorus?.settings.delay}
            step="0.1"
            id="chorusWetLevelRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="delay"
          ></input>
          <label>
          delay: <p>{Math.floor(chorus?.settings.delay * 100)} %</p>
          </label>
        </section>
      </main>
    </div>
  );
};

export default ChorusEffect;

ChorusEffect.propTypes = {
  id: PropTypes.string,
};
