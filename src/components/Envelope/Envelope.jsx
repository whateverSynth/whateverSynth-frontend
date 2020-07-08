import React from 'react';
import {
  useEnvelopeSettings,
  useHandleEnvelopeSettings,
} from '../../hooks/EffectsProvider';

const Envelope = () => {
  const envelopeSettings = useEnvelopeSettings();
  const handleEnvelopeSettings = useHandleEnvelopeSettings();

  return (
    <>
      <section>
        <h1>Envelope</h1>
        <section>
          <input
            type="range"
            min="0"
            max="5"
            value={envelopeSettings.attackTime}
            step="0.05"
            id="attackTimeRange"
            onChange={(e) => handleEnvelopeSettings(e)}
            name="attackTime"
          ></input>
          <label>attack: {envelopeSettings.attackTime}</label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="5"
            value={envelopeSettings.decayTime}
            step="0.05"
            id="decayTimeRange"
            onChange={(e) => handleEnvelopeSettings(e)}
            name="decayTime"
          ></input>
          <label>decay: {envelopeSettings.decayTime}</label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="5"
            value={envelopeSettings.sustainLevel}
            step="0.05"
            id="sustainLevelRange"
            onChange={(e) => handleEnvelopeSettings(e)}
            name="sustainLevel"
          ></input>
          <label>sustain: {envelopeSettings.sustainLevel}</label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="5"
            value={envelopeSettings.releaseTime}
            step="0.05"
            id="releaseTimeRange"
            onChange={(e) => handleEnvelopeSettings(e)}
            name="releaseTime"
          ></input>
          <label>release: {envelopeSettings.releaseTime}</label>
        </section>
      </section>
    </>
  );
};

export default Envelope;
