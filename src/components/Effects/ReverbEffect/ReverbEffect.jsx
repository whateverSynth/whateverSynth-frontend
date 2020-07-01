import React from 'react';
import {
  useReverbSettings,
  useHandleReverb,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';

const ReverbEffect = ({ id }) => {
  const reverbSettings = useReverbSettings();
  const handleReverb = useHandleReverb();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();

  return (
    <div className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={reverbSettings.bypass}
            onChange={handleReverb}
            name="bypass"
            id="reverbBypass"
          ></input>
          <h2>reverb</h2>
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>&#10060;</button>
        </header>
        <section>
          <input
            type="range"
            min="20"
            max="22050"
            value={reverbSettings.highCut}
            step="1"
            id="reverbHighCutRange"
            onChange={handleReverb}
            name="highCut"
          ></input>
          <label>
          high cut: <p>{reverbSettings.highCut} Hz</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="20"
            max="22050"
            value={reverbSettings.lowCut}
            step="1"
            id="reverbLowCutRange"
            onChange={handleReverb}
            name="lowCut"
          ></input>
          <label>
          low cut: <p>{reverbSettings.lowCut} Hz</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={reverbSettings.dryLevel}
            step="0.1"
            id="reverbDryLevelRange"
            onChange={handleReverb}
            name="dryLevel"
          ></input>
          <label>
          dry level: <p>{Math.floor(reverbSettings.dryLevel * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={reverbSettings.wetLevel}
            step="0.1"
            id="reverbWetLevelRange"
            onChange={handleReverb}
            name="wetLevel"
          ></input>
          <label>
          wet level: <p>{Math.floor(reverbSettings.wetLevel * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={reverbSettings.level}
            step="0.1"
            id="reverbLevelRange"
            onChange={handleReverb}
            name="level"
          ></input>
          <label>
          level: <p>{Math.floor(reverbSettings.level * 100)} %</p>
          </label>
        </section>

        <section>
          <label htmlFor="impulse">impulse </label>
          <select name="impulse" id="reverbImpulse" onChange={handleReverb}>
            <option value="reverb/garage.wav">garage</option>
            <option value="reverb/room.wav">room</option>
            <option value="reverb/silo.wav">silo</option>
          </select>
 
        </section>
      </main>
    </div>
  );
};

export default ReverbEffect;

ReverbEffect.propTypes = {
  id: PropTypes.string,
};
