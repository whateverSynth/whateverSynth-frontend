import React from 'react';
import {
  useHandleEffectChange,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
import Editable from '../../global/Editable';
import { defaultDelaySettings } from '../../../utils/data';

const DelayEffect = ({ id }) => {
  const handleEffectChange = useHandleEffectChange();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();
  let delay = newEffectSettings.find(setting => setting.id === id);
  if(!delay) delay = { settings: defaultDelaySettings };

  return (
    <section className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={delay?.settings.bypass}
            onChange={(e) => handleEffectChange(e, id)}
            name="bypass"
            id="delayBypass"
          ></input>
          <h2>delay</h2>
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>x</button>
        </header>
        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={delay?.settings.feedback}
            step="0.05"
            id="delayFeedbackRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="feedback"
          ></input>
          <label>
            feedback:
            <Editable
              text={(Math.floor(delay?.settings.feedback * 100) + '%')}
              placeholder="0"
              type="input"
            >
              <input
                name="feedback"
                type="number"
                min="0"
                max="1"
                value={delay?.settings.feedback}
                step="0.05"
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
            min="1"
            max="1000"
            value={delay?.settings.delayTime}
            step="1"
            id="delayTimeRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="delayTime"
          ></input>
          <label>
            time: <Editable
              text={delay?.settings.delayTime}
              placeholder="0"
              type="input"
            >
              <input
                name="delayTime"
                type="number"
                min="1"
                max="1000"
                value={delay?.settings.delayTime}
                step="1"
                placeholder="0"
                onChange={e => handleEffectChange(e, id)}
                autoFocus
              />
            </Editable>
            <p> ms</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={delay?.settings.wetLevel}
            step="0.1"
            id="delayWetLevelRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="wetLevel"
          ></input>
          <label>
            wet level:
            <Editable
              text={(Math.floor(delay?.settings.wetLevel * 100) + '%')}
              placeholder="0"
              type="input"
            >
              <input
                name="delayTime"
                type="number"
                min="0"
                max="1"
                value={delay?.settings.wetLevel}
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
            value={delay?.settings.dryLevel}
            step="0.1"
            id="delayDryLevelRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="dryLevel"
          ></input>
          <label>
            dry level:
            <Editable
              text={(Math.floor(delay?.settings.dryLevel * 100) + '%')}
              placeholder="0"
              type="input"
            >
              <input
                name="dryLevel"
                type="number"
                min="0"
                max="1"
                value={delay?.settings.dryLevel}
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
            min="20"
            max="22050"
            value={delay?.settings.cutoff}
            step="10"
            id="delayCutoffRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="cutoff"
          ></input>
          <label>
            cutoff:
            <Editable
              text={delay?.settings.cutoff}
              placeholder="0"
              type="input"
            >
              <input
                name="cutoff"
                type="number"
                min="20"
                max="22050"
                value={delay?.settings.cutoff}
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

export default DelayEffect;

DelayEffect.propTypes = {
  id: PropTypes.string,
};
