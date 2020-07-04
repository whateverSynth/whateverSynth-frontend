import React from 'react';
import {
  useHandleEffectChange,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
import Editable from '../../global/Editable';
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
          output gain:
            <Editable
              text={overdrive?.settings.outputGain}
              placeholder=""
              type="input"
            >
              <input
                name="outputGain"
                type="number"
                min="1"
                max="1000"
                value={overdrive?.settings.outputGain}
                step="1"
                placeholder=""
                onChange={e => handleEffectChange(e, id)}
                autoFocus
              />
            </Editable>
            <p> db</p>
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
          drive:
            <Editable
              text={(Math.floor(overdrive?.settings.drive * 100) + '%')}
              placeholder=""
              type="input"
            >
              <input
                name="overdrive"
                type="number"
                min="0"
                max="1"
                value={overdrive?.settings.drive}
                step="0.01"
                placeholder=""
                onChange={e => handleEffectChange(e, id)}
                autoFocus
              />
            </Editable>
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
          curve amount:
            <Editable
              text={(Math.floor(overdrive?.settings.curveAmount * 100) + '%')}
              placeholder=""
              type="input"
            >
              <input
                name="curveAmount"
                type="number"
                min="0"
                max="1"
                value={overdrive?.settings.curveAmount}
                step="0.1"
                placeholder=""
                onChange={e => handleEffectChange(e, id)}
                autoFocus
              />
            </Editable>
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
          algorithm # 
            <Editable
              text={overdrive?.settings.algorithmIndex}
              placeholder=""
              type="input"
            >
              <input
                name="algorithmIndex"
                type="number"
                min="0"
                max="5"
                value={overdrive?.settings.algorithmIndex}
                step="1"
                placeholder=""
                onChange={e => handleEffectChange(e, id)}
                autoFocus
              />
            </Editable>
          </label>
        </section>
      </main>
    </section>
  );
};

export default OverdriveEffect;

OverdriveEffect.propTypes = {
  id: PropTypes.string,
};
