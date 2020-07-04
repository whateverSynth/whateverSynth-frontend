import React from 'react';
import {
  useHandleWahWah,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
import Editable from '../../global/Editable';
import { defaultWahWahSettings } from '../../../utils/data';

const WahWahEffect = ({ id }) => {
  const handleWahWah = useHandleWahWah();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();
  let wahwah = newEffectSettings.find(setting => setting.id === id);
  if(!wahwah) wahwah = { settings: defaultWahWahSettings };

  return (
    <section className={styles.effectContainer}>
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

          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>x</button>
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
          base freq:
            <Editable
              text={wahwah?.settings.baseFrequency}
              placeholder="0"
              type="input"
            >
              <input
                name="baseFrequency"
                type="number"
                min="0"
                max="1"
                value={wahwah?.settings.baseFrequency}
                step="0.01"
                placeholder="0"
                onChange={e => handleWahWah(e, id)}
                autoFocus
              />
            </Editable>
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
          excursion octaves:
            <Editable
              text={wahwah?.settings.excursionOctaves}
              placeholder="0"
              type="input"
            >
              <input
                name="excursionOctaves"
                type="number"
                min="1"
                max="6"
                value={wahwah?.settings.excursionOctaves}
                step="1"
                placeholder="0"
                onChange={e => handleWahWah(e, id)}
                autoFocus
              />
            </Editable>
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
          sweep:
            <Editable
              text={(Math.floor(wahwah?.settings.sweep * 100) + '%')}
              placeholder="0"
              type="input"
            >
              <input
                name="sweep"
                type="number"
                min="0"
                max="1"
                value={wahwah?.settings.sweep}
                step="0.05"
                placeholder="0"
                onChange={e => handleWahWah(e, id)}
                autoFocus
              />
            </Editable>
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
          resonance:
            <Editable
              text={wahwah?.settings.resonance}
              placeholder="0"
              type="input"
            >
              <input
                name="resonance"
                type="number"
                min="1"
                max="100"
                value={wahwah?.settings.resonance}
                step="0.1"
                placeholder="0"
                onChange={e => handleWahWah(e, id)}
                autoFocus
              />
            </Editable>
            <p>%</p>
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
          sensitivity:
            <Editable
              text={(Math.floor(wahwah?.settings.sensitivity * 100) + '%')}
              placeholder="0"
              type="input"
            >
              <input
                name="sensitivity"
                type="number"
                min="-1"
                max="1"
                value={wahwah?.settings.sensitivity}
                step="0.1"
                placeholder="0"
                onChange={e => handleWahWah(e, id)}
                autoFocus
              />
            </Editable>
          </label>
        </section>
      </main>
    </section>
  );
};

export default WahWahEffect;

WahWahEffect.propTypes = {
  id: PropTypes.string,
};
