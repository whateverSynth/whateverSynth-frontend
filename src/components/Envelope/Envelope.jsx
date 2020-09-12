import React from 'react';
import {
  useEnvelopeSetting,
  useHandleEnvelopeSetting,
} from '../../hooks/EffectsProvider';
import styles from './Envelope.css';
import {
  Dial
} from 'react-nexusui';

const Envelope = () => {
  const envelopeSettings = useEnvelopeSetting();
  const handleEnvelopeSettings = useHandleEnvelopeSetting();

  return (
    <>
      <h1>Envelope</h1>
      <section className={styles.Envelope}>
        <label>A<Dial value={envelopeSettings.attack} min="0" max="10" step="0.05" id="attackTimeRange" name="attack" size={[60, 60]}/></label>
        <label>D<Dial value={envelopeSettings.decay} min="0" max="5" step="0.05"
          id="decayTimeRange" size={[60, 60]}/></label>
        <label>S<Dial value={envelopeSettings.sustain} size={[60, 60]} min="0"
          max="1"
          step="0.05"
          id="sustainLevelRange"/></label>
        <label>R<Dial value={envelopeSettings.release}
          min="0"
          max="10"
          step="0.05"
          id="releaseTimeRange" size={[60, 60]}/>
        </label>
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

    </>
  );
};

export default Envelope;
