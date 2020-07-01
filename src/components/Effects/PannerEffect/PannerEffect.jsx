import React from 'react';
import {
  usePannerSettings,
  useHandlePanner,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';

const PannerEffect = ({ id }) => {
  const pannerSettings = usePannerSettings();
  const handlePanner = useHandlePanner();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();

  return (
    <div className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={pannerSettings.bypass}
            onChange={handlePanner}
            name="bypass"
            id="pannerBypass"
          ></input>
          <h2>panner</h2>
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>&#10060;</button>
        </header>

        <section>
          <input
            type="range"
            min="-1"
            max="1"
            value={pannerSettings.pan}
            step="0.05"
            id="pannerPanRange"
            onChange={handlePanner}
            name="pan"
          ></input>
          <label>R</label>
        </section>



      </main>
    </div>
  );
};

export default PannerEffect;

PannerEffect.propTypes = {
  id: PropTypes.string,
};
