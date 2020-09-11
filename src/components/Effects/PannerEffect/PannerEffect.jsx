import React from 'react';
import {
  usePannerSetting,
  useHandlePannerSetting,
  useADSRSetting,
  useHandleADSRSetting
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
import { Pan as PanFader } from 'react-nexusui';

const PannerEffect = () => {
  const pannerSetting = usePannerSetting();
  const handlePannerSetting = useHandlePannerSetting();

  const handleADSRSetting = useHandleADSRSetting();

  return (
    <div className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <h2>panner</h2>
        </header>
        <PanFader step={0.05} onChange={handleADSRSetting} />
        <section>
          <label>L</label>

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
