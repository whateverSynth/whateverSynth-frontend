import React from 'react';
import {
  useDelaySettings,
  useHandleDelay,
} from '../../../hooks/EffectsProvider';
import styles from '../Effects.css';

const DelayEffect = () => {
  const delaySettings = useDelaySettings();
  const handleDelay = useHandleDelay();

  return (
    <div className={styles.effectContainer}>
      <main className={styles.Effects}><h2>delay</h2><button className={styles.buttonClose}>&#10060;</button>
        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={delaySettings.feedback}
            step="0.05"
            id="delayFeedbackRange"
            onChange={handleDelay}
            name="feedback"
          ></input>
          <label>
            feedback: <p>{Math.floor(delaySettings.feedback * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="1"
            max="1000"
            value={delaySettings.delayTime}
            step="1"
            id="delayTimeRange"
            onChange={handleDelay}
            name="delayTime"
          ></input>
          <label>
            time: <p>{delaySettings.delayTime} ms</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={delaySettings.wetLevel}
            step="0.1"
            id="delayWetLevelRange"
            onChange={handleDelay}
            name="wetLevel"
          ></input>
          <label>
            wet level: <p>{Math.floor(delaySettings.wetLevel * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={delaySettings.dryLevel}
            step="0.1"
            id="delayDryLevelRange"
            onChange={handleDelay}
            name="dryLevel"
          ></input>
          <label>
            dry level: <p>{Math.floor(delaySettings.dryLevel * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="20"
            max="22050"
            value={delaySettings.cutoff}
            step="10"
            id="delayCutoffRange"
            onChange={handleDelay}
            name="cutoff"
          ></input>
          <label>
            cutoff: <p>{delaySettings.cutoff} Hz</p>
          </label>
        </section>

        <input
          type="checkbox"
          value={delaySettings.bypass}
          onChange={handleDelay}
          name="bypass"
          id="delayBypass"
        ></input>
        <label htmlFor="delayBypass" className={styles.bypass}>
          bypass
        </label>
      </main>
    </div>
  );
};

export default DelayEffect;
