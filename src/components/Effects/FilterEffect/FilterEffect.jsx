import React from 'react';
import {
  useFilterSettings,
  useHandleFilter,
} from '../../../hooks/EffectsProvider';
import styles from '../Effects.css';

const FilterEffect = () => {
  const filterSettings = useFilterSettings();
  const handleFilter = useHandleFilter();

  return (
    <section className={styles.Effects}>
      <section>
        <h2>filter &nbsp;</h2>
        <button>x</button>
      </section>

      <section>
        <input
          type="range"
          min="20"
          max="22050"
          value={filterSettings.frequency}
          step="10"
          id="filterFrequencyRange"
          onChange={handleFilter}
          name="frequency"
        ></input>
        <label>
          frequency: <p>{filterSettings.frequency}</p>
        </label>
      </section>

      <section>
        <input
          type="range"
          min="0.001"
          max="100"
          value={filterSettings.Q}
          step="0.001"
          id="filterQ"
          onChange={handleFilter}
          name="Q"
        ></input>
        <label>
          q: <p>{filterSettings.Q}</p>
        </label>
      </section>

      <section>
        <input
          type="range"
          min="-40"
          max="40"
          value={filterSettings.wetLevel}
          step="1"
          id="filterGainRange"
          onChange={handleFilter}
          name="gain"
        ></input>
        <label>
          gain: <p>{filterSettings.gain} db</p>
        </label>
      </section>

      <section>
        <label htmlFor="filterType">type </label>
        <select name="filterType" id="filterFilterType" onChange={handleFilter}>
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

      <input
        type="checkbox"
        value={filterSettings.bypass}
        onChange={handleFilter}
        name="bypass"
        id="filterBypass"
      ></input>
      <label htmlFor="filterBypass" className={styles.bypass}>
        bypass
      </label>
    </section>
  );
};

export default FilterEffect;
