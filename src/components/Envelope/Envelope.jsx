import React from 'react';
import {
  useEnvelopeSetting,
  useHandleEnvelopeSetting,
} from '../../hooks/EffectsProvider';

const Envelope = () => {
  const envelopeSettings = useEnvelopeSetting();
  const handleEnvelopeSettings = useHandleEnvelopeSetting();

  return (
    <>
      <section>
        <h1>Envelope</h1>
        <section>
          <input
            type="range"
            min="0"
            max="10"
            value={envelopeSettings.attack}
            step="0.05"
            id="attackTimeRange"
            onChange={(e) => handleEnvelopeSettings(e)}
            name="attack"
          ></input>
          <label>attack: {envelopeSettings.attack}</label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="5"
            value={envelopeSettings.decay}
            step="0.05"
            id="decayTimeRange"
            onChange={(e) => handleEnvelopeSettings(e)}
            name="decay"
          ></input>
          <label>decay: {envelopeSettings.decay}</label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="1"
            value={envelopeSettings.sustain}
            step="0.05"
            id="sustainLevelRange"
            onChange={(e) => handleEnvelopeSettings(e)}
            name="sustain"
          ></input>
          <label>sustain: {envelopeSettings.sustain}</label>
        </section>

        <section>
          <input
            type="range"
            min="0"
            max="10"
            value={envelopeSettings.release}
            step="0.05"
            id="releaseTimeRange"
            onChange={(e) => handleEnvelopeSettings(e)}
            name="release"
          ></input>
          <label>release: {envelopeSettings.release}</label>
        </section>
      </section>
    </>
  );
};

export default Envelope;
