import React from 'react';
import {
  useHandleDelay,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';

const DelayEffect = ({ id }) => {
  const handleDelay = useHandleDelay();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();
  const delay = newEffectSettings.find(setting => setting.id === id);
  
  return (
    <div className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={delay?.settings.bypass}
            onChange={(e) => handleDelay(e, id)}
            name="bypass"
            id="delayBypass"
          ></input>
          <h2>delay</h2>
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>&#10060;</button>
        </header>
        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={delay?.settings.feedback}
            step="0.05"
            id="delayFeedbackRange"
            onChange={(e) => handleDelay(e, id)}
            name="feedback"
          ></input>
          <label>
            feedback: <p>{Math.floor(delay?.settings.feedback * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="1"
            max="1000"
            value={delay?.settings.delayTime}
            step="1"
            id="delayTimeRange"
            onChange={(e) => handleDelay(e, id)}
            name="delayTime"
          ></input>
          <label>
            time: <p>{delay?.settings.delayTime} ms</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={delay?.settings.wetLevel}
            step="0.1"
            id="delayWetLevelRange"
            onChange={(e) => handleDelay(e, id)}
            name="wetLevel"
          ></input>
          <label>
            wet level: <p>{Math.floor(delay?.settings.wetLevel * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={delay?.settings.dryLevel}
            step="0.1"
            id="delayDryLevelRange"
            onChange={(e) => handleDelay(e, id)}
            name="dryLevel"
          ></input>
          <label>
            dry level: <p>{Math.floor(delay?.settings.dryLevel * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="20"
            max="22050"
            value={delay?.settings.cutoff}
            step="10"
            id="delayCutoffRange"
            onChange={(e) => handleDelay(e, id)}
            name="cutoff"
          ></input>
          <label>
            cutoff: <p>{delay?.settings.cutoff} Hz</p>
          </label>
        </section>
      </main>
    </div>
  );
};

export default DelayEffect;

DelayEffect.propTypes = {
  id: PropTypes.string,
};
