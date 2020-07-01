import React from 'react';
import {
  useHandleWahWah,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';

const WahWahEffect = ({ id }) => {
  const handleWahWah = useHandleWahWah();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();
  const wahwah = newEffectSettings.find(setting => setting.id === id);

  return (
    <div className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={wahwah?.settings.bypass}
            onChange={(e) => handleWahWah(e, id)}
            name="bypass"
            id="wahWahBypass"
          ></input>

          <h2>wah wah</h2>

          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>&#10060;</button>
        </header>

        <input
          type="checkbox"
          value={wahwah?.settings.automode}
          onChange={(e) => handleWahWah(e, id)}
          name="automode"
          id="automode"
        ></input>
        <label htmlFor="automode" className={styles.automode}>
        automode
        </label>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={wahwah?.settings.baseFrequency}
            step="0.01"
            id="wahWahBaseFrequencyRange"
            onChange={(e) => handleWahWah(e, id)}
            name="baseFrequency"
          ></input>
          <label>
          base freq: <p>{wahwah?.settings.baseFrequency}</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="1"
            max="6"
            value={wahwah?.settings.excursionOctaves}
            step="1"
            id="excursionOctavesRange"
            onChange={(e) => handleWahWah(e, id)}
            name="excursionOctaves"
          ></input>
          <label>
          excursion octaves: <p>{wahwah?.settings.excursionOctaves}</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={wahwah?.settings.sweep}
            step="0.05"
            id="wahWahSweepRange"
            onChange={(e) => handleWahWah(e, id)}
            name="sweep"
          ></input>
          <label>
          sweep: <p>{Math.floor(wahwah?.settings.sweep * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="1"
            max="100"
            value={wahwah?.settings.resonance}
            step="0.1"
            id="wahWahResonanceRange"
            onChange={(e) => handleWahWah(e, id)}
            name="resonance"
          ></input>
          <label>
          resonance: <p>{wahwah?.settings.resonance} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="-1"
            max="1"
            value={wahwah?.settings.sensitivity}
            step="0.1"
            id="wahWahSensitivityRange"
            onChange={(e) => handleWahWah(e, id)}
            name="sensitivity"
          ></input>
          <label>
          sensitivity: <p>{wahwah?.settings.sensitivity}</p>
          </label>
        </section>
      </main>
    </div>
  );
};

export default WahWahEffect;

WahWahEffect.propTypes = {
  id: PropTypes.string,
};
