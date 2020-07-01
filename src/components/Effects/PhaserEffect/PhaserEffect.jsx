import React from 'react';
import {
  useHandleEffectChange,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
import { defaultPhaserSettings } from '../../../utils/data';

const PhaserEffect = ({ id }) => {
  const handleEffectChange = useHandleEffectChange();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();
  let phaser = newEffectSettings.find(setting => setting.id === id);
  if(!phaser) phaser = { settings: defaultPhaserSettings };

  return (
    <div className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={phaser?.settings.bypass}
            onChange={(e) => handleEffectChange(e, id)}
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
            value={phaser?.settings.rate}
            step="0.01"
            id="phaserRateRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="rate"
          ></input>
          <label>
          rate: <p>{phaser?.settings.rate} Hz</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={phaser?.settings.depth}
            step="0.01"
            id="phaserDepthRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="depth"
          ></input>
          <label>
          depth: <p>{Math.floor(phaser?.settings.depth * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={phaser?.settings.feedback}
            step="0.05"
            id="phaserFeedbackRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="feedback"
          ></input>
          <label>
          feedback: <p>{Math.floor(phaser?.settings.feedback * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="180"
            value={phaser?.settings.stereoPhase}
            step="1"
            id="phaserStereoPhaseRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="stereoPhase"
          ></input>
          <label>
          stereo phase: <p>{phaser?.settings.stereoPhase}°</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="500"
            max="1500"
            value={phaser?.settings.baseModulationFrequency}
            step="10"
            id="phaserBaseModulationFrequencyRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="baseModulationFrequency"
          ></input>
          <label>
          base mod freq: <p>{phaser?.settings.baseModulationFrequency} Hz</p>
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
