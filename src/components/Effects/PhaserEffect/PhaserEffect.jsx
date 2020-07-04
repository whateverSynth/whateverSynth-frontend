import React from 'react';
import {
  useHandleEffectChange,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
import Editable from '../../global/Editable';
import { defaultPhaserSettings } from '../../../utils/data';

const PhaserEffect = ({ id }) => {
  const handleEffectChange = useHandleEffectChange();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();
  let phaser = newEffectSettings.find(setting => setting.id === id);
  if(!phaser) phaser = { settings: defaultPhaserSettings };

  return (
    <section className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={phaser?.settings.bypass}
            onChange={(e) => handleEffectChange(e, id)}
            name="bypass"
            id="phaserBypass"
          ></input>
          <h2>phaser</h2>
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>x</button>
        </header>
        <section>
          <input
            type="range"
            min="0.01"
            max="8"
            value={phaser?.settings.rate}
            step="0.01"
            id="phaserRateRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="rate"
          ></input>
          <label>
          rate:
            <Editable
              text={(Math.floor(phaser?.settings.rate * 100) + ' Hz')}
              placeholder=""
              type="input"
            >
              <input
                name="rate"
                type="number"
                min="0.05"
                max="8"
                value={phaser?.settings.rate}
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
            min="0"
            max="1"
            value={phaser?.settings.depth}
            step="0.01"
            id="phaserDepthRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="depth"
          ></input>
          <label>
          depth:
            <Editable
              text={(Math.floor(phaser?.settings.depth * 100) + '%')}
              placeholder=""
              type="input"
            >
              <input
                name="depth"
                type="number"
                min="0"
                max="1"
                value={phaser?.settings.depth}
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
            min="0"
            max="1"
            value={phaser?.settings.feedback}
            step="0.05"
            id="phaserFeedbackRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="feedback"
          ></input>
          <label>
          feedback:
            <Editable
              text={(Math.floor(phaser?.settings.feedback * 100) + '%')}
              placeholder=""
              type="input"
            >
              <input
                name="feedback"
                type="number"
                min="0"
                max="1"
                value={phaser?.settings.feedback}
                step="0.05"
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
            min="0"
            max="180"
            value={phaser?.settings.stereoPhase}
            step="1"
            id="phaserStereoPhaseRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="stereoPhase"
          ></input>
          <label>
          stereo phase:
            <Editable
              text={phaser?.settings.stereoPhase}
              placeholder="0"
              type="input"
            >
              <input
                name="stereoPhase"
                type="number"
                min="0"
                max="180"
                value={phaser?.settings.stereoPhase}
                step="1"
                placeholder="0"
                onChange={e => handleEffectChange(e, id)}
                autoFocus
              />
            </Editable>
            <p>°</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="500"
            max="1500"
            value={phaser?.settings.baseModulationFrequency}
            step="10"
            id="phaserBaseModulationFrequencyRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="baseModulationFrequency"
          ></input>
          <label>
          base mod freq:
            <Editable
              text={phaser?.settings.baseModulationFrequency}
              placeholder="0"
              type="input"
            >
              <input
                name="baseModulationFrequency"
                type="number"
                min="500"
                max="1500"
                value={phaser?.settings.baseModulationFrequency}
                step="10"
                placeholder="0"
                onChange={e => handleEffectChange(e, id)}
                autoFocus
              />
            </Editable>
            <p> Hz</p>
          </label>
        </section>
      </main>
    </section>
  );
};

export default PhaserEffect;

PhaserEffect.propTypes = {
  id: PropTypes.string,
};
