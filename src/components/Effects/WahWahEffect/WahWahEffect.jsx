import React from 'react';
import {
  useWahWahSettings,
  useHandleWahWah,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';

const WahWahEffect = ({ id }) => {
  const wahWahSettings = useWahWahSettings();
  const handleWahWah = useHandleWahWah();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();

  return (
    <div className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={wahWahSettings.bypass}
            onChange={handleWahWah}
            name="bypass"
            id="wahWahBypass"
          ></input>

          <h2>wah wah</h2>

          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>&#10060;</button>
        </header>

        <input
          type="checkbox"
          value={wahWahSettings.automode}
          onChange={handleWahWah}
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
            value={wahWahSettings.baseFrequency}
            step="0.01"
            id="wahWahBaseFrequencyRange"
            onChange={handleWahWah}
            name="baseFrequency"
          ></input>
          <label>
          base freq: <p>{wahWahSettings.baseFrequency}</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="1"
            max="6"
            value={wahWahSettings.excursionOctaves}
            step="1"
            id="excursionOctavesRange"
            onChange={handleWahWah}
            name="excursionOctaves"
          ></input>
          <label>
          excursion octaves: <p>{wahWahSettings.excursionOctaves}</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={wahWahSettings.sweep}
            step="0.05"
            id="wahWahSweepRange"
            onChange={handleWahWah}
            name="sweep"
          ></input>
          <label>
          sweep: <p>{Math.floor(wahWahSettings.sweep * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="1"
            max="100"
            value={wahWahSettings.resonance}
            step="0.1"
            id="wahWahResonanceRange"
            onChange={handleWahWah}
            name="resonance"
          ></input>
          <label>
          resonance: <p>{wahWahSettings.resonance} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="-1"
            max="1"
            value={wahWahSettings.sensitivity}
            step="0.1"
            id="wahWahSensitivityRange"
            onChange={handleWahWah}
            name="sensitivity"
          ></input>
          <label>
          sensitivity: <p>{wahWahSettings.sensitivity}</p>
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
