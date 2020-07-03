import React from 'react';
import {
  useHandleEffectChange,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
import Editable from '../../global/Editable';
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
          cutoff:
            <Editable
              text={(Math.floor(moog?.settings.cutoff * 100) + '%')}
              placeholder=""
              type="input"
            >
              <input
                name="cutoff"
                type="number"
                min="0"
                max="1"
                value={moog?.settings.cutoff}
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
            max="4"
            value={moog?.settings.resonance}
            step="0.5"
            id="MoogFilterResonanceRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="resonance"
          ></input>
          <label>
          resonance:
            <Editable
              text={moog?.settings.resonance}
              placeholder=""
              type="input"
            >
              <input
                name="resonance"
                type="number"
                min="0"
                max="4"
                value={moog?.settings.resonance}
                step="0.5"
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
            min="256"
            max="16384"
            value={moog?.settings.bufferSize}
            step="4"
            id="MoogFilterWetLevelRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="bufferSize"
          ></input>
          <label>
          buffer size:
            <Editable
              text={moog?.settings.bufferSize}
              placeholder=""
              type="input"
            >
              <input
                name="bufferSize"
                type="number"
                min="256"
                max="16384"
                value={moog?.settings.bufferSize}
                step="4"
                placeholder=""
                onChange={e => handleEffectChange(e, id)}
                autoFocus
              />
            </Editable>

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
