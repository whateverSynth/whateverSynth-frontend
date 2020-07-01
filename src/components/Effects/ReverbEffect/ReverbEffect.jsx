import React from 'react';
import {
  useHandleEffectChange,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
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
            step="1"
            id="reverbHighCutRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="highCut"
          ></input>
          <label>
          high cut: <p>{reverb?.settings.highCut} Hz</p>
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
          low cut: <p>{reverb?.settings.lowCut} Hz</p>
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
          dry level: <p>{Math.floor(reverb?.settings.dryLevel * 100)} %</p>
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
          wet level: <p>{Math.floor(reverb?.settings.wetLevel * 100)} %</p>
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
          level: <p>{Math.floor(reverb?.settings.level * 100)} %</p>
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

        <input
          type="checkbox"
          value={reverbSettings.bypass}
          onChange={handleReverb}
          name="bypass"
          id="reverbBypass"
        ></input>
        <label htmlFor="reverbBypass" className={styles.bypass}>
          bypass
        </label>
      </main>
    </section>
  );
};

export default ReverbEffect;

ReverbEffect.propTypes = {
  id: PropTypes.string,
};
