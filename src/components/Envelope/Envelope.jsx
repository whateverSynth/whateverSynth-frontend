import React from 'react';
import {
  useEnvelopeSetting,
  useHandleEnvelopeSetting,
} from '../../hooks/EffectsProvider';

import {
  Dial,
  Envelope as NexusEnvelope,
  Multislider,
  Pan
} from 'react-nexusui';

const Envelope = () => {
  const envelopeSettings = useEnvelopeSetting();
  const handleEnvelopeSettings = useHandleEnvelopeSetting();

  return (
    <>

      <section>
        <h1>Envelope</h1>
        <section>
          
          <NexusEnvelope noNewPoints= {true} size={[320, 75]} points={[
            {
              x: 0,
              y: 0
            },
            {
              x: 0.25,
              y: 1
            },
            {
              x: 0.55,
              y: 0.5
            },
            {
              x: 0.75,
              y: 0.5
            },
            {
              x: 1,
              y: 0
            },
          ]} /><h1>ADSR</h1>
          <Multislider size={[400, 200]} numberOfSliders={4} min={0} max={1} step={0} candycane={3} values={[(envelopeSettings.attack / 10), (envelopeSettings.decay / 5), envelopeSettings.sustain, (envelopeSettings.release / 10)]} smoothing={0} mode="bar"/>
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
