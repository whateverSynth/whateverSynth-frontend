import React from 'react';
import {
  usePhaserSettings,
  useHandlePhaser,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';

const PhaserEffect = ({ id }) => {
  const phaserSettings = usePhaserSettings();
  const handlePhaser = useHandlePhaser();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();

  return (
    <div className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={phaserSettings.bypass}
            onChange={handlePhaser}
            name="bypass"
            id="phaserBypass"
          ></input>
          <h2>phaser</h2>
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>&#10060;</button>
        </header>
        <section>
          <input
            type="range"
            min="0.01"
            max="8"
            value={phaserSettings.rate}
            step="0.01"
            id="phaserRateRange"
            onChange={handlePhaser}
            name="rate"
          ></input>
          <label>
          rate: <p>{phaserSettings.rate} Hz</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={phaserSettings.depth}
            step="0.01"
            id="phaserDepthRange"
            onChange={handlePhaser}
            name="depth"
          ></input>
          <label>
          depth: <p>{Math.floor(phaserSettings.depth * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={phaserSettings.feedback}
            step="0.05"
            id="phaserFeedbackRange"
            onChange={handlePhaser}
            name="feedback"
          ></input>
          <label>
          feedback: <p>{Math.floor(phaserSettings.feedback * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="180"
            value={phaserSettings.stereoPhase}
            step="1"
            id="phaserStereoPhaseRange"
            onChange={handlePhaser}
            name="stereoPhase"
          ></input>
          <label>
          stereo phase: <p>{phaserSettings.stereoPhase}°</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="500"
            max="1500"
            value={phaserSettings.baseModulationFrequency}
            step="10"
            id="phaserBaseModulationFrequencyRange"
            onChange={handlePhaser}
            name="baseModulationFrequency"
          ></input>
          <label>
          base mod freq: <p>{phaserSettings.baseModulationFrequency} Hz</p>
          </label>
        </section>



      </main>
    </div>
  );
};

export default PhaserEffect;

PhaserEffect.propTypes = {
  id: PropTypes.string,
};
