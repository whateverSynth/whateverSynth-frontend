import React from 'react';
import {
  useTremoloSettings,
  useHandleTremolo,
  useHandleRemoveEffect,
} from '../../../hooks/EffectsProvider';
import styles from '../Effects.css';

const TremoloEffect = () => {
  const tremoloSettings = useTremoloSettings();
  const handleTremolo = useHandleTremolo();
  const handleRemoveEffect = useHandleRemoveEffect();

  return (
    <section className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={tremoloSettings.bypass}
            onChange={handleTremolo}
            name="bypass"
            id="tremoloBypass"
          ></input>
          <h2>tremolo</h2>
          <button
            className={styles.buttonClose}
            onClick={() => handleRemoveEffect('Tremolo')}
          >
            x
          </button>
        </header>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={tremoloSettings.intensity}
            step="0.01"
            id="tremoloIntensityRange"
            onChange={handleTremolo}
            name="intensity"
          ></input>
          <label>
            intensity: <p>{Math.floor(tremoloSettings.intensity * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0.01"
            max="8"
            value={tremoloSettings.rate}
            step="0.01"
            id="tremoloRateRange"
            onChange={handleTremolo}
            name="rate"
          ></input>
          <label>
            rate: <p>{tremoloSettings.rate} Hz</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="180"
            value={tremoloSettings.stereoPhase}
            step="1"
            id="tremoloStereoPhaseTremoloRange"
            onChange={handleTremolo}
            name="stereoPhase"
          ></input>
          <label>
            stereo phase: <p>{tremoloSettings.stereoPhase}°</p>
          </label>
        </section>

        <input
          type="checkbox"
          value={tremoloSettings.bypass}
          onChange={handleTremolo}
          name="bypass"
          id="tremoloBypass"
        ></input>
        <label htmlFor="tremoloBypass" className={styles.bypass}>
          bypass
        </label>
      </main>
    </section>
  );
};

export default TremoloEffect;
