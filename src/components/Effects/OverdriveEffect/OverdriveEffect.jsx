import React from 'react';
import {
  useHandleEffectChange,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
import { defaultOverdriveSettings } from '../../../utils/data';

const OverdriveEffect = ({ id }) => {
  const handleEffectChange = useHandleEffectChange();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();
  let overdrive = newEffectSettings.find(setting => setting.id === id);
  if(!overdrive) overdrive = { settings: defaultOverdriveSettings };

  return (
    <section className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={overdrive?.settings.bypass}
            onChange={(e) => handleEffectChange(e, id)}
            name="bypass"
            id="overdriveBypass"
          ></input>
          <h2>overdrive</h2>
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>x</button>
        </header>

        <section>
          <input
            type="range"
            min="-42"
            max="0"
            value={overdrive?.settings.outputGain}
            step="1"
            id="overdriveOutputGain"
            onChange={(e) => handleEffectChange(e, id)}
            name="outputGain"
          ></input>
          <label>
          output gain: <p>{overdrive?.settings.outputGain} db</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={overdrive?.settings.drive}
            step="0.01"
            id="overdriveDriveRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="drive"
          ></input>
          <label>
          drive: <p>{Math.floor(overdrive?.settings.drive * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={overdrive?.settings.curveAmount}
            step="0.1"
            id="OverdriveCurveAmountRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="curveAmount"
          ></input>
          <label>
          curve amount:{' '}
            <p>{Math.floor(overdrive?.settings.curveAmount * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="5"
            value={overdrive?.settings.algorithmIndex}
            step="1"
            id="overdriveAlgorithmIndexRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="algorithmIndex"
          ></input>
          <label>
          algorithm # <p>{overdrive?.settings.algorithmIndex}</p>
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
      </main>
    </section>
  );
};

export default OverdriveEffect;

OverdriveEffect.propTypes = {
  id: PropTypes.string,
};
