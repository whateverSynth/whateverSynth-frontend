import React from 'react';
import {
  useHandleEffectChange,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
import { defaultMoogSettings } from '../../../utils/data';

const MoogFilterEffect = ({ id }) => {
  const handleEffectChange = useHandleEffectChange();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();
  let moog = newEffectSettings.find(setting => setting.id === id);
  if(!moog) moog = { settings: defaultMoogSettings };

  return (
    <section className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={moog?.settings.bypass}
            onChange={(e) => handleEffectChange(e, id)}
            name="bypass"
            id="moogFilterBypass"
          ></input>
          <h2>moog filter</h2>
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>x</button>
        </header>
        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={moog?.settings.cutoff}
            step="0.05"
            id="MoogFilterCutoffRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="cutoff"
          ></input>
          <label>
          cutoff: <p>{Math.floor(moog?.settings.cutoff * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="4"
            value={moog?.settings.resonance}
            step="0.5"
            id="MoogFilterResonanceRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="resonance"
          ></input>
          <label>
          resonance: <p>{moog?.settings.resonance}</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="256"
            max="16384"
            value={moog?.settings.wetLevel}
            step="4"
            id="MoogFilterWetLevelRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="bufferSize"
          ></input>
          <label>
          buffer size: <p>{moog?.settings.bufferSize}</p>
          </label>
        </section>
      </main>
    </section>
  );
};

export default MoogFilterEffect;

MoogFilterEffect.propTypes = {
  id: PropTypes.string,
};
