import React from 'react';
import {
  useOverdriveSettings,
  useHandleOverdrive,
} from '../../../hooks/EffectsProvider';
import styles from '../Effects.css';

const OverdriveEffect = () => {
  const overdriveSettings = useOverdriveSettings();
  const handleOverdrive = useHandleOverdrive();

  return (
    <section className={styles.Effects}>
      <section>
        <h2>overdrive &nbsp;</h2>
        <button>x</button>
      </section>

      <section>
        <input
          type="range"
          min="-42"
          max="0"
          value={overdriveSettings.outputGain}
          step="1"
          id="overdriveFeedbackRange"
          onChange={handleOverdrive}
          name="outputGain"
        ></input>
        <label>
          output gain: <p>{overdriveSettings.outputGain}</p>
        </label>
      </section>

      <section>
        <input
          type="range"
          min="1"
          max="1000"
          value={OverdriveSettings.time}
          step="1"
          id="OverdriveTimeRange"
          onChange={handleOverdrive}
          name="OverdriveTime"
        ></input>
        <label>
          time: <p>{OverdriveSettings.time} ms</p>
        </label>
      </section>

      <section>
        <input
          type="range"
          min="0"
          max="1"
          value={OverdriveSettings.wetLevel}
          step="0.1"
          id="OverdriveWetLevelRange"
          onChange={handleOverdrive}
          name="wetLevel"
        ></input>
        <label>
          wet level: <p>{Math.floor(OverdriveSettings.wetLevel * 100)} %</p>
        </label>
      </section>

      <section>
        <input
          type="range"
          min="0"
          max="1"
          value={OverdriveSettings.dryLevel}
          step="0.1"
          id="OverdriveDryLevelRange"
          onChange={handleOverdrive}
          name="dryLevel"
        ></input>
        <label>
          dry level: <p>{Math.floor(OverdriveSettings.dryLevel * 100)} %</p>
        </label>
      </section>

      <section>
        <input
          type="range"
          min="20"
          max="22050"
          value={OverdriveSettings.cutoff}
          step="10"
          id="OverdriveCutoffRange"
          onChange={handleOverdrive}
          name="cutoff"
        ></input>
        <label>
          cutoff: <p>{OverdriveSettings.cutoff} Hz</p>
        </label>
      </section>

      <input
        type="checkbox"
        value={OverdriveSettings.bypass}
        onChange={handleOverdrive}
        name="bypass"
      ></input>
      <label className={styles.bypass}>bypass</label>
    </section>
  );
};

export default OverdriveEffect;
