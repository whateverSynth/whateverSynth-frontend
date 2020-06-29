import React from 'react';
import {
  useMoogSettings,
  useHandleMoogFilter,
} from '../../../hooks/EffectsProvider';
import styles from '../Effects.css';

const MoogFilterEffect = () => {
  const moogFilterSettings = useMoogSettings();
  const handleMoogFilter = useHandleMoogFilter();

  return (
    <div className={styles.effectContainer}>
      <main className={styles.Effects}><h2>moog filter</h2><button className={styles.buttonClose}>&#10060;</button>
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

        <input
          type="checkbox"
          value={moogFilterSettings.bypass}
          onChange={handleMoogFilter}
          name="bypass"
          id="moogFilterBypass"
        ></input>
        <label htmlFor="moogFilterBypass" className={styles.bypass}>
        bypass
        </label>
      </main>
    </div>
  );
};

export default MoogFilterEffect;
