import React from 'react';
import {
  useHandleEffectChange,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
import Editable from '../../global/Editable';
import { defaultReverbSettings } from '../../../utils/data';

const ReverbEffect = ({ id }) => {
  const handleEffectChange = useHandleEffectChange();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();
  let reverb = newEffectSettings.find(setting => setting.id === id);
  if(!reverb) reverb = { settings: defaultReverbSettings };

  return (
    <section className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={reverb?.settings.bypass}
            onChange={(e) => handleEffectChange(e, id)}
            name="bypass"
            id="reverbBypass"
          ></input>
          <h2>reverb</h2>
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>x</button>
        </header>
        <section>
          <input
            type="range"
            min="20"
            max="22050"
            value={reverb?.settings.highCut}
            step="100"
            id="reverbHighCutRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="highCut"
          ></input>
          <label>
          high cut:
            <Editable
              text={reverb?.settings.highCut}
              placeholder=""
              type="input"
            >
              <input
                name="highCut"
                type="number"
                min="20"
                max="22050"
                value={reverb?.settings.highCut}
                step="100"
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
            min="20"
            max="22050"
            value={reverb?.settings.lowCut}
            step="1"
            id="reverbLowCutRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="lowCut"
          ></input>
          <label>
          low cut:
            <Editable
              text={reverb?.settings.lowCut}
              placeholder=""
              type="input"
            >
              <input
                name="lowCut"
                type="number"
                min="20"
                max="22050"
                value={reverb?.settings.lowCut}
                step="100"
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
            max="1"
            value={reverb?.settings.dryLevel}
            step="0.1"
            id="reverbDryLevelRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="dryLevel"
          ></input>
          <label>
          dry:
            <Editable
              text={(Math.floor(reverb?.settings.dryLevel * 100) + '%')}
              placeholder="0"
              type="input"
            >
              <input
                name="dryLevel"
                type="number"
                min="0"
                max="1"
                value={reverb?.settings.dryLevel}
                step="0.1"
                placeholder="0"
                onChange={e => handleEffectChange(e, id)}
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
            value={reverb?.settings.wetLevel}
            step="0.1"
            id="reverbWetLevelRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="wetLevel"
          ></input>
          <label>
          wet:
            <Editable
              text={(Math.floor(reverb?.settings.wetLevel * 100) + '%')}
              placeholder="0"
              type="input"
            >
              <input
                name="wetLevel"
                type="number"
                min="0"
                max="1"
                value={reverb?.settings.wetLevel}
                step="0.1"
                placeholder="0"
                onChange={e => handleEffectChange(e, id)}
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
            value={reverb?.settings.level}
            step="0.1"
            id="reverbLevelRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="level"
          ></input>
          <label>
          level:
            <Editable
              text={(Math.floor(reverb?.settings.level * 100) + '%')}
              placeholder="0"
              type="input"
            >
              <input
                name="level"
                type="number"
                min="0"
                max="1"
                value={reverb?.settings.level}
                step="0.1"
                placeholder="0"
                onChange={e => handleEffectChange(e, id)}
                autoFocus
              />
            </Editable>
          </label>
        </section>

        <section>
          <label htmlFor="impulse">impulse </label>
          <select name="impulse" id="reverbImpulse" onChange={(e) => handleEffectChange(e, id)}>
            <option value="reverb/garage.wav">garage</option>
            <option value="reverb/room.wav">room</option>
            <option value="reverb/silo.wav">silo</option>
          </select>
        </section>
      </main>
    </section>
  );
};

export default ReverbEffect;

ReverbEffect.propTypes = {
  id: PropTypes.string,
};
