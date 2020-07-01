import React from 'react';
import {
  useHandleEffectChange,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
import { defaultTremoloSettings } from '../../../utils/data';

const TremoloEffect = ({ id }) => {
  const handleEffectChange = useHandleEffectChange();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();
  let tremolo = newEffectSettings.find(setting => setting.id === id);
  if(!tremolo) tremolo = { settings: defaultTremoloSettings };

  return (
    <section className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={tremolo?.settings.bypass}
            onChange={(e) => handleEffectChange(e, id)}
            name="bypass"
            id="tremoloBypass"
          ></input>
          <h2>tremolo</h2>
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>x</button>
        </header>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={tremolo?.settings.intensity}
            step="0.01"
            id="tremoloIntensityRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="intensity"
          ></input>
          <label>
          intensity: <p>{Math.floor(tremolo?.settings.intensity * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0.01"
            max="8"
            value={tremolo?.settings.rate}
            step="0.01"
            id="tremoloRateRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="rate"
          ></input>
          <label>
          rate: <p>{tremolo?.settings.rate} Hz</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="180"
            value={tremolo?.settings.stereoPhase}
            step="1"
            id="tremoloStereoPhaseTremoloRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="stereoPhase"
          ></input>
          <label>
          stereo phase: <p>{tremolo?.settings.stereoPhase}°</p>
          </label>
        </section>
      </main>
    </section>
  );
};

export default TremoloEffect;

TremoloEffect.propTypes = {
  id: PropTypes.string,
};
