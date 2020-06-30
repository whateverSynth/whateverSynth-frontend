import React from 'react';
import {
  useCompressorSettings,
  useHandleCompressor,
} from '../../../hooks/EffectsProvider';
import styles from '../Effects.css';

const CompressorEffect = () => {
  const compressorSettings = useCompressorSettings();
  const handleCompressor = useHandleCompressor();

  return (
    <div className={styles.effectContainer}>
      <header>
        <h2>compressor</h2>
        <button className={styles.buttonClose}>&#10060;</button>
      </header>
      <main className={styles.Effects}>

        <section>
          <input
            type="range"
            min="-100"
            max="0"
            value={compressorSettings.threshold}
            step="1"
            id="compressorThresholdRange"
            onChange={handleCompressor}
            name="threshold"
          ></input>
          <label>
          threshold: <p>{compressorSettings.threshold} db</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="20"
            value={compressorSettings.makeupGain}
            step="1"
            id="makeupGainRange"
            onChange={handleCompressor}
            name="makeupGain"
          ></input>
          <label>
          makeup gain: <p>{compressorSettings.makeupGain} db</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1000"
            value={compressorSettings.attack}
            step="1"
            id="compressorAttackRange"
            onChange={handleCompressor}
            name="attack"
          ></input>
          <label>
          attack: <p>{compressorSettings.attack}</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1000"
            value={compressorSettings.release}
            step="1"
            id="compressorReleaseRange"
            onChange={handleCompressor}
            name="release"
          ></input>
          <label>
          release: <p>{compressorSettings.release}</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="1"
            max="20"
            value={compressorSettings.ratio}
            step="1"
            id="compressorRatioRange"
            onChange={handleCompressor}
            name="ratio"
          ></input>
          <label>
          ratio: <p>{compressorSettings.ratio}</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="40"
            value={compressorSettings.knee}
            step="1"
            id="compressorKneeRange"
            onChange={handleCompressor}
            name="knee"
          ></input>
          <label>
          knee: <p>{compressorSettings.knee}</p>
          </label>
        </section>

        <section>
          <input
            type="checkbox"
            value={compressorSettings.automakeup}
            onChange={handleCompressor}
            name="automakeup"
            id="compressorAutomakeup"
          ></input>
          <label htmlFor="compressorAutomakeup" className={styles.checkbox}>
          automakeup
          </label>
        </section>

        <section>
          <input
            type="checkbox"
            value={compressorSettings.bypass}
            onChange={handleCompressor}
            name="bypass"
            id="compressorBypass"
          ></input>
          <label htmlFor="compressorBypass" className={styles.checkbox}>
          bypass
          </label>
        </section>
      </main>
    </div>
  );
};

export default CompressorEffect;
