import React from 'react';
import {
  useHandleEffectChange,
  useHandleRemoveEffect,
  useNewEffectSettings
} from '../../../hooks/EffectsProvider';
import PropTypes from 'prop-types';
import styles from '../Effects.css';
import Slider from 'react-input-slider';
import Editable from '../../global/Editable';
import { defaultFilterSettings } from '../../../utils/data';

const FilterEffect = ({ id }) => {
  const handleEffectChange = useHandleEffectChange();
  const handleRemoveEffect = useHandleRemoveEffect();
  const newEffectSettings = useNewEffectSettings();
  let filter = newEffectSettings.find(setting => setting.id === id);
  if(!filter) filter = { settings: defaultFilterSettings };

  return (
    <section className={styles.effectContainer}>
      <main className={styles.Effects}>
        <header>
          <input
            type="checkbox"
            value={filter?.settings.bypass}
            onChange={(e) => handleEffectChange(e, id)}
            name="bypass"
            id="filterBypass"
          ></input>
          <h2>filter</h2>
          <button className={styles.buttonClose} onClick={() => handleRemoveEffect(id)}>x</button>

        </header>
        <section>
          <input
            type="range"
            min="20"
            max="22050"
            value={filter?.settings.frequency}
            step="10"
            id="filterFrequencyRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="frequency"
          ></input>
          <label>frequency:
            <Editable
              text={filter?.settings.frequency}
              placeholder=""
              type="input"
            >
              <input
                name="frequency"
                type="number"
                min="20"
                max="22050"
                placeholder=""
                value={filter?.settings.frequency}
                onChange={e => handleEffectChange(e, id)}
                autoFocus
              />
            </Editable>
          </label>
        </section>

        <section>
          <input
            type="range"
            min="0.001"
            max="100"
            value={filter?.settings.Q}
            step="0.001"
            id="filterQ"
            onChange={(e) => handleEffectChange(e, id)}
            name="Q"
          ></input>
          <label>q:
            <Editable
              text={filter?.settings.Q}
              placeholder=""
              type="input"
            >
              <input
                name="Q"
                type="number"
                min="0.001"
                max="100"
                placeholder=""
                value={filter?.settings.Q}
                onChange={e => handleEffectChange(e, id)}
                autoFocus
              />
            </Editable>
          </label>
        </section>
        <section>
          <Slider name="freqQ" axis="xy" x={filter?.settings.frequency} y={filter?.settings.Q} xmin="20"
            xmax="22050" ymin="0.001"
            ymax="100" yreverse="true" styles={{

              track: {
                backgroundColor: 'black',
                width: '6rem',
                height: '6rem',
              },
              thumb: {
                width: 12,
                height: 12,
              },
            }}
          />
        </section>
        <section>
          <input
            type="range"
            min="-40"
            max="40"
            value={filter?.settings.wetLevel}
            step="1"
            id="filterGainRange"
            onChange={(e) => handleEffectChange(e, id)}
            name="gain"
          ></input>
          <label>gain:
            <Editable
              text={filter?.settings.gain}
              placeholder="0"
              type="input"
            >
              <input
                name="gain"
                type="number"
                min="-40"
                max="40"
                placeholder="0"
                value={filter?.settings.gain}
                onChange={e => handleEffectChange(e, id)}
                autoFocus
              />
            </Editable>
            &nbsp;db
          </label>
        </section>

        <section>
          <label htmlFor="filterType">type </label>
          <select name="filterType" id="filterFilterType" onChange={(e) => handleEffectChange(e, id)}>
            <option value="highpass">highpass</option>
            <option value="lowpass">lowpass</option>
            <option value="bandpass">bandpass</option>
            <option value="lowshelf">lowshelf</option>
            <option value="highshelf">highshelf</option>
            <option value="peaking">peaking</option>
            <option value="notch">notch</option>
            <option value="allpass">allpass</option>
          </select>
        </section>
      </main>
    </section>
  );
};

export default FilterEffect;

FilterEffect.propTypes = {
  id: PropTypes.string,
};
