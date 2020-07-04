import React from 'react';
import {
  useHandleEffectChange,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
import Editable from '../../global/Editable';
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
          intensity:
            <Editable
              text={(Math.floor(tremolo?.settings.intensity * 100) + '%')}
              placeholder=""
              type="input"
            >
              <input
                name="intensity"
                type="number"
                min="0"
                max="1"
                value={tremolo?.settings.intensity}
                step="0.01"
                placeholder=""
                onChange={e => handleEffectChange(e, id)}
                autoFocus
              />
            </Editable>
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
          rate:
            <Editable
              text={tremolo?.settings.rate}
              placeholder=""
              type="input"
            >
              <input
                name="rate"
                type="number"
                min="0.01"
                max="8"
                value={tremolo?.settings.rate}
                step="0.01"
                placeholder=""
                onChange={e => handleEffectChange(e, id)}
                autoFocus
              />
            </Editable>
            <p> Hz</p>
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
          stereo phase:
            <Editable
              text={tremolo?.settings.stereoPhase}
              placeholder="0"
              type="input"
            >
              <input
                name="stereoPhase"
                type="number"
                min="0"
                max="180"
                value={tremolo?.settings.stereoPhase}
                step="1"
                placeholder="0"
                onChange={e => handleEffectChange(e, id)}
                autoFocus
              />
            </Editable>
            <p>°</p>
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
