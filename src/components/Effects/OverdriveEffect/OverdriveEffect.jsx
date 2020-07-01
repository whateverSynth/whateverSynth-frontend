import React from 'react';
import {
  useOverdriveSettings,
  useHandleOverdrive,
  useHandleRemoveEffect,
} from '../../../hooks/EffectsProvider';
import styles from '../Effects.css';

const OverdriveEffect = () => {
  const overdriveSettings = useOverdriveSettings();
  const handleOverdrive = useHandleOverdrive();
  const handleRemoveEffect = useHandleRemoveEffect();

  return (
    <div className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={overdriveSettings.bypass}
            onChange={handleOverdrive}
            name="bypass"
            id="overdriveBypass"
          ></input>
          <h2>overdrive</h2>
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect('Overdrive')}>&#10060;</button>
        </header>

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


      </main>
    </div>
  );
};

export default OverdriveEffect;
