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
    <section className={styles.Effects}>
      <section>
        <section>
          <h2>chorus &nbsp;</h2>
          <button>x</button>
        </section>
        <input
          type="checkbox"
          value={chorusSettings.bypass}
          onChange={handleChorus}
          name="bypass"
        ></input>
        <label>bypass</label>
      </section>

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
    </section>
  );
};

export default ChorusEffect;
