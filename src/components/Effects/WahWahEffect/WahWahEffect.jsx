import React from 'react';
import {
  useWahWahSettings,
  useHandleWahWah,
} from '../../../hooks/EffectsProvider';
import styles from '../Effects.css';

const WahWahEffect = () => {
  const wahWahSettings = useWahWahSettings();
  const handleWahWah = useHandleWahWah();

  return (
    <section className={styles.Effects}>
      <section>
        <h2>wahwah &nbsp;</h2>
        <button>x</button>
      </section>

      <input
        type="checkbox"
        value={wahWahSettings.automode}
        onChange={handleWahWah}
        name="automode"
      ></input>
      <label className={styles.automode}>automode</label>

      <section>
        <input
          type="range"
          min="0"
          max="1"
          value={wahWahSettings.baseFrequency}
          step="0.05"
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

      <input
        type="checkbox"
        value={wahWahSettings.bypass}
        onChange={handleWahWah}
        name="bypass"
      ></input>
      <label className={styles.bypass}>bypass</label>
    </section>
  );
};

export default WahWahEffect;
