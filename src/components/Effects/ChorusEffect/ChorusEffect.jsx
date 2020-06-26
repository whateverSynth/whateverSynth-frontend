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
        <section className={styles.label}>
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
          className={styles.slider}
          type="range"
          min="0"
          max="1"
          value={chorusSettings.feedback}
          step="0.05"
          id="delayFeedbackRange"
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
          min="1"
          max="1000"
          value={chorusSettings.delayTime}
          step="1"
          id="delayTimeRange"
          onChange={handleChorus}
          name="delayTime"
        ></input>
        <label>
          time: <p>{chorusSettings.delayTime} ms</p>
        </label>
      </section>

      <section>
        <input
          type="range"
          min="0"
          max="1"
          value={chorusSettings.wetLevel}
          step="0.1"
          id="delayWetLevelRange"
          onChange={handleChorus}
          name="wetLevel"
        ></input>
        <label>
          wet level: <p>{Math.floor(chorusSettings.wetLevel * 100)} %</p>
        </label>
      </section>

      <section>
        <input
          type="range"
          min="0"
          max="1"
          value={chorusSettings.dryLevel}
          step="0.1"
          id="delayDryLevelRange"
          onChange={handleChorus}
          name="dryLevel"
        ></input>
        <label>
          dry level: <p>{Math.floor(chorusSettings.dryLevel * 100)} %</p>
        </label>
      </section>

      <section>
        <input
          type="range"
          min="20"
          max="22050"
          value={chorusSettings.cutoff}
          step="10"
          id="delayCutoffRange"
          onChange={handleChorus}
          name="cutoff"
        ></input>
        <label>
          cutoff: <p>{chorusSettings.cutoff} Hz</p>
        </label>
      </section>
    </section>
  );
};

export default ChorusEffect;
