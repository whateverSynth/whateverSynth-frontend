import React from 'react';
import {
  useHandleEffectChange,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
import { defaultPannerSettings } from '../../../utils/data';

const PannerEffect = ({ id }) => {
  const handleEffectChange = useHandleEffectChange();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();
  let panner = newEffectSettings.find(setting => setting.id === id);
  if(!panner) panner = { settings: defaultPannerSettings };

  return (
    <div className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={panner?.settings.bypass}
            onChange={(e) => handleEffectChange(e, id)}
            name="bypass"
            id="pannerBypass"
          ></input>
          <h2>panner</h2>
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>x</button>
        </header>

        <section>
          <label>L</label>
          <input
            type="range"
            min="-1"
            max="1"
            value={panner?.settings.pan}
            step="0.05"
            id="pannerPanRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="pan"
          ></input>
          <label>R</label>
        </section>

        <input
          type="checkbox"
          value={pannerSettings.bypass}
          onChange={handlePanner}
          name="bypass"
          id="pannerBypass"
        ></input>
        <label htmlFor="pannerBypass" className={styles.bypass}>
          bypass
        </label>
      </main>
    </div>
  );
};

export default PannerEffect;

PannerEffect.propTypes = {
  id: PropTypes.string,
};
