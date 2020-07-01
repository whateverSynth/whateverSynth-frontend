import React from 'react';
import {
  usePannerSettings,
  useHandlePanner,
  useHandleRemoveEffect,
} from '../../../hooks/EffectsProvider';
import styles from '../Effects.css';

const PannerEffect = () => {
  const pannerSettings = usePannerSettings();
  const handlePanner = useHandlePanner();
  const handleRemoveEffect = useHandleRemoveEffect();

  return (
    <div className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <h2>panner</h2>
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect('Panner')}>&#10060;</button>
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
