import React from 'react';
import {
  useTremoloSettings,
  useHandleTremolo,
} from '../../../hooks/EffectsProvider';
import styles from '../Effects.css';

const TremoloEffect = () => {
  const tremoloSettings = useTremoloSettings();
  const handleTremolo = useHandleTremolo();

  return (
    <section className={styles.Effects}>
      <section>
        <h2>tremolo &nbsp;</h2>
        <button>x</button>
      </section>

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
    </section>
  );
};

export default TremoloEffect;