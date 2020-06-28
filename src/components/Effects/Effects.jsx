import React, { useState } from 'react';
import { useHandleAddEffect } from '../../hooks/EffectsProvider';

export default function Effects() {
  const [selectedEffect, setSelectedEffect] = useState('Bitcrusher');
  const handleAddEffect = useHandleAddEffect();

  return (
    <section>
      <label htmlFor="effects">add effect </label>
      <select
        name="effects"
        id="effects"
        onChange={(event) => setSelectedEffect(event.target.value)}
      >
        <option value="Bitcrusher">bitcrusher</option>
        <option value="Chorus">chorus</option>
        <option value="Compressor">compressor</option>
        <option value="Delay">delay</option>
        <option value="Filter">filter</option>
        <option value="MoogFilter">moog filter</option>
        <option value="Overdrive">overdrive</option>
        <option value="Panner">panner</option>
        <option value="Phaser">phaser</option>
        <option value="Convolver">reverb</option>
        <option value="Tremolo">tremolo</option>
        <option value="WahWah">wahwah</option>
      </select>
      <button onClick={() => handleAddEffect(selectedEffect)}>+</button>
    </section>
  );
}
