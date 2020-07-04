import React from 'react';
import {
  useHandleEffectChange,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
import Editable from '../../global/Editable';
import { defaultPingPongDelaySettings } from '../../../utils/data';

const PingPongDelayEffect = ({ id }) => {
  const handleEffectChange = useHandleEffectChange();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();
  let pingpong = newEffectSettings.find(setting => setting.id === id);
  if(!pingpong) pingpong = { settings: defaultPingPongDelaySettings };

  return (
    <section className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={pingpong?.settings.bypass}
            onChange={(e) => handleEffectChange(e, id)}
            name="bypass"
            id="pingPongDelayBypass"
          ></input>
          <h2>ping pong delay</h2>
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>x</button>
        </header>
        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={pingpong?.settings.wetLevel}
            step="0.1"
            id="pingPongDelayWetLevelRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="wetLevel"
          ></input>
          <label>
          wet level:
            <Editable
              text={(Math.floor(pingpong?.settings.wetLevel * 100) + '%')}
              placeholder="0"
              type="input"
            >
              <input
                name="wetLevel"
                type="number"
                min="0"
                max="1"
                value={pingpong?.settings.wetLevel}
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
            value={pingpong?.settings.feedback}
            step="0.05"
            id="pingPongDelayFeedbackRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="feedback"
          ></input>
          <label>
          feedback:
            <Editable
              text={(Math.floor(pingpong?.settings.feedback * 100) + '%')}
              placeholder="0"
              type="input"
            >
              <input
                name="feedback"
                type="number"
                min="0"
                max="1"
                value={pingpong?.settings.feedback}
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
            max="10000"
            value={pingpong?.settings.delayTimeLeft}
            step="1"
            id="pingPongDelayTimeRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="delayTimeLeft"
          ></input>
          <label>
          delay left:
            <Editable
              text={pingpong?.settings.delayTimeLeft}
              placeholder="0"
              type="input"
            >
              <input
                name="delayTimeLeft"
                type="number"
                min="1"
                max="10000"
                value={pingpong?.settings.delayTimeLeft}
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
            min="1"
            max="10000"
            value={pingpong?.settings.delayTimeRight}
            step="1"
            id="pingPongDelayTimeRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="delayTimeRight"
          ></input>
          <label>
          delay right:
            <Editable
              text={pingpong?.settings.delayTimeRight}
              placeholder="0"
              type="input"
            >
              <input
                name="delayTimeRight"
                type="number"
                min="1"
                max="10000"
                value={pingpong?.settings.delayTimeRight}
                step="1"
                placeholder="0"
                onChange={e => handleEffectChange(e, id)}
                autoFocus
              />
            </Editable>
            <p> ms</p>
          </label>
        </section>
      </main>
    </section>
  );
};

export default PingPongDelayEffect;

PingPongDelayEffect.propTypes = {
  id: PropTypes.string,
};
