import React from 'react';
import {
  usePingPongDelaySettings,
  useHandlePingPongDelay,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';

const PingPongDelayEffect = ({ id }) => {
  const pingPongDelaySettings = usePingPongDelaySettings();
  const handlePingPongDelay = useHandlePingPongDelay();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();

  return (
    <div className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={pingPongDelaySettings.bypass}
            onChange={handlePingPongDelay}
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
            value={pingPongDelaySettings.wetLevel}
            step="0.1"
            id="pingPongDelayWetLevelRange"
            onChange={handlePingPongDelay}
            name="wetLevel"
          ></input>
          <label>
          wet level: <p>{Math.floor(pingPongDelaySettings.wetLevel * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={pingPongDelaySettings.feedback}
            step="0.05"
            id="pingPongDelayFeedbackRange"
            onChange={handlePingPongDelay}
            name="feedback"
          ></input>
          <label>
          feedback: <p>{Math.floor(pingPongDelaySettings.feedback * 100)} %</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="1"
            max="10000"
            value={pingPongDelaySettings.delayTimeLeft}
            step="1"
            id="pingPongDelayTimeRange"
            onChange={handlePingPongDelay}
            name="delayTimeLeft"
          ></input>
          <label>
          delay time left: <p>{pingPongDelaySettings.delayTimeLeft} ms</p>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="1"
            max="10000"
            value={pingPongDelaySettings.delayTimeRight}
            step="1"
            id="pingPongDelayTimeRange"
            onChange={handlePingPongDelay}
            name="delayTimeRight"
          ></input>
          <label>
          delay time right: <p>{pingPongDelaySettings.delayTimeRight} ms</p>
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
