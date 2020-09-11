import React from 'react';
import {
  usePannerSetting,
  useHandlePannerSetting
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
import { Pan } from 'react-nexusui';

const PannerEffect = () => {
  const pannerSetting = usePannerSetting();
  const handlePannerSetting = useHandlePannerSetting();

  return (
    <div className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <h2>panner</h2>
        </header>

        <section>
          <label>L</label>
          <Pan step={0.05} onChange={handlePannerSetting}/>
          <input
            type="range"
            min="-1"
            max="1"
            value={pannerSetting.pan}
            step="0.05"
            id="pannerPanRange"
            onChange={handlePannerSetting}
            name="pan"></input>
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
