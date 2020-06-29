import React from 'react';
import {
  useChorusSettings,
  useHandleChorus,
} from '../../../hooks/EffectsProvider';
import styles from '../Effects.css';

const ChorusEffect = () => {
  const chorusSettings = useChorusSettings();
  const handleChorus = useHandleChorus();

  return (
    <div className={styles.effectContainer}>
      <main className={styles.Effects}><h2>filter</h2><button className={styles.buttonClose}>&#10060;</button>
        <section>
          <input
            type="range"
            min="0.01"
            max="8"
            value={chorusSettings.rate}
            step="0.01"
            id="chorusRate"
            onChange={handleChorus}
            name="rate"
          ></input>
          <label>
          rate: <p>{chorusSettings.rate} Hz</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={chorusSettings.feedback}
            step="0.05"
            id="chorusFeedbackRange"
            onChange={handleChorus}
            name="feedback"
          ></input>
          <label>
          feedback: <p>{Math.floor(chorusSettings.feedback * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={chorusSettings.delay}
            step="0.1"
            id="chorusWetLevelRange"
            onChange={handleChorus}
            name="delay"
          ></input>
          <label>
          delay: <p>{Math.floor(chorusSettings.delay * 100)} %</p>
          </label>
        </section>
        <input
          type="checkbox"
          value={chorusSettings.bypass}
          onChange={handleChorus}
          name="bypass"
          id="chorusBypass"
        ></input>
        <label htmlFor="chorusBypass" className={styles.bypass}>
          bypass
        </label>
      </main>
    </div>
  );
};

export default ChorusEffect;
