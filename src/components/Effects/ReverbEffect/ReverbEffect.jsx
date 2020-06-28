import React from 'react';
import {
  useReverbSettings,
  useHandleReverb,
} from '../../../hooks/EffectsProvider';
import styles from '../Effects.css';

const ReverbEffect = () => {
  const reverbSettings = useReverbSettings();
  const handleReverb = useHandleReverb();

  return (
    <section className={styles.Effects}>
      <section>
        <h2>reverb &nbsp;</h2>
        <button>x</button>
      </section>

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
        <label htmlFor="impulse">{reverbSettings.impulse} </label>
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
    </section>
  );
};

export default ReverbEffect;
