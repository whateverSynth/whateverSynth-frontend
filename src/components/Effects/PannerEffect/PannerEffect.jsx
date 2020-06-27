import React from 'react';
import {
  usePannerSettings,
  useHandlePanner,
} from '../../../hooks/EffectsProvider';
import styles from '../Effects.css';

const PannerEffect = () => {
  const pannerSettings = usePannerSettings();
  const handlePanner = useHandlePanner();

  return (
    <section className={styles.Effects}>
      <section>
        <h2>panner &nbsp;</h2>
        <button>x</button>
      </section>

      <section>
        <label>L&nbsp;</label>
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
      ></input>
      <label className={styles.bypass}>bypass</label>
    </section>
  );
};

export default PannerEffect;
