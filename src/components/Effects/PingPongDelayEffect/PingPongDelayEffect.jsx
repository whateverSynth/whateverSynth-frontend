import React from 'react';
import {
  useHandleEffectChange,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
import { defaultPingPongDelaySettings } from '../../../utils/data';

const PingPongDelayEffect = ({ id }) => {
  const handleEffectChange = useHandleEffectChange();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();
  let pingpong = newEffectSettings.find(setting => setting.id === id);
  if(!pingpong) pingpong = { settings: defaultPingPongDelaySettings };

  return (
    <div className={styles.effectContainer}>
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
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>&#10060;</button>
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
          wet level: <p>{Math.floor(pingpong?.settings.wetLevel * 100)} %</p>
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
          feedback: <p>{Math.floor(pingpong?.settings.feedback * 100)} %</p>
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
          delay time left: <p>{pingpong?.settings.delayTimeLeft} ms</p>
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
          delay time right: <p>{pingpong?.settings.delayTimeRight} ms</p>
          </label>
        </section>

      </main>
    </div>
  );
};

export default PingPongDelayEffect;

PingPongDelayEffect.propTypes = {
  id: PropTypes.string,
};
