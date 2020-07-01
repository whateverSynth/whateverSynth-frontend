import React from 'react';
import {
  useMoogSettings,
  useHandleMoogFilter,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';

const MoogFilterEffect = ({ id }) => {
  const moogFilterSettings = useMoogSettings();
  const handleMoogFilter = useHandleMoogFilter();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();

  return (
    <div className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={moogFilterSettings.bypass}
            onChange={handleMoogFilter}
            name="bypass"
            id="moogFilterBypass"
          ></input>
          <h2>moog filter</h2>
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>&#10060;</button>
        </header>
        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={moogFilterSettings.cutoff}
            step="0.05"
            id="MoogFilterCutoffRange"
            onChange={handleMoogFilter}
            name="cutoff"
          ></input>
          <label>
          cutoff: <p>{Math.floor(moogFilterSettings.cutoff * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="4"
            value={moogFilterSettings.resonance}
            step="0.5"
            id="MoogFilterResonanceRange"
            onChange={handleMoogFilter}
            name="resonance"
          ></input>
          <label>
          resonance: <p>{moogFilterSettings.resonance}</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="256"
            max="16384"
            value={moogFilterSettings.wetLevel}
            step="4"
            id="MoogFilterWetLevelRange"
            onChange={handleMoogFilter}
            name="bufferSize"
          ></input>
          <label>
          buffer size: <p>{moogFilterSettings.bufferSize}</p>
          </label>
        </section>

      </main>
    </div>
  );
};

export default MoogFilterEffect;

MoogFilterEffect.propTypes = {
  id: PropTypes.string,
};
