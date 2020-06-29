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
        <button className={styles.buttonClose}>&#10060;</button>
      </section>

      <section>
        <input
          type="range"
          min="-42"
          max="0"
          value={overdriveSettings.outputGain}
          step="1"
          id="overdriveOutputGain"
          onChange={handleOverdrive}
          name="outputGain"
        ></input>
        <label>
          output gain: <p>{overdriveSettings.outputGain} db</p>
        </label>
      </section>

      <section>
        <input
          type="range"
          min="0"
          max="1"
          value={overdriveSettings.drive}
          step="0.01"
          id="overdriveDriveRange"
          onChange={handleOverdrive}
          name="drive"
        ></input>
        <label>
          drive: <p>{Math.floor(overdriveSettings.drive * 100)} %</p>
        </label>
      </section>

      <section>
        <input
          type="range"
          min="0"
          max="1"
          value={overdriveSettings.curveAmount}
          step="0.1"
          id="OverdriveCurveAmountRange"
          onChange={handleOverdrive}
          name="curveAmount"
        ></input>
        <label>
          curve amount:{' '}
          <p>{Math.floor(overdriveSettings.curveAmount * 100)} %</p>
        </label>
      </section>

      <section>
        <input
          type="range"
          min="0"
          max="5"
          value={overdriveSettings.algorithmIndex}
          step="1"
          id="overdriveAlgorithmIndexRange"
          onChange={handleOverdrive}
          name="algorithmIndex"
        ></input>
        <label>
          algorithm # <p>{overdriveSettings.algorithmIndex}</p>
        </label>
      </section>

      <input
        type="checkbox"
        value={overdriveSettings.bypass}
        onChange={handleOverdrive}
        name="bypass"
        id="overdriveBypass"
      ></input>
      <label htmlFor="overdriveBypass" className={styles.bypass}>
        bypass
      </label>
    </section>
  );
};

export default OverdriveEffect;
