import React from 'react';
import PropTypes from 'prop-types';

export default function Effects({ tuna, delayWet, handleDelayWetness }) {

  // const chorus = new tuna.Chorus({
  //   rate: 1.5,         //0.01 to 8+
  //   feedback: 0.2,     //0 to 1+
  //   delay: 0.0045,     //0 to 1
  //   bypass: 0          //the value 1 starts the effect as bypassed, 0 or 1
  // });
  // const delay = new tuna.Delay({
  //   feedback: delayWet,    //0 to 1+
  //   delayTime: 150,    //1 to 10000 milliseconds
  //   wetLevel: 0.25,    //0 to 1+
  //   dryLevel: 1,       //0 to 1+
  //   cutoff: 2000,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
  //   bypass: 0
  // });
  // const phaser = new tuna.Phaser({
  //   rate: 1.2,                     //0.01 to 8 is a decent range, but higher values are possible
  //   depth: 0.3,                    //0 to 1
  //   feedback: 0.2,                 //0 to 1+
  //   stereoPhase: 30,               //0 to 180
  //   baseModulationFrequency: 700,  //500 to 1500
  //   bypass: 0
  // });

  return (
    <div>
      <label htmlFor="effects">Choose an Effect:</label>
      <select name="effects" id="effects">
        <option value="chorus">Chorus</option>
        <option value="delay">Delay</option>
        <option value="phaser">Phaser</option>
      </select>
      <div>
        <input type="range" min="0" max="1" value={delayWet} step="0.1" id="myRange" onChange={handleDelayWetness}></input>
        <label>Delay Wet/Dry</label>
      </div>
    </div>
  );
}

Effects.propTypes = {
  tuna: PropTypes.object,
  delayWet: PropTypes.number,
  handleDelayWetness: PropTypes.func
};

