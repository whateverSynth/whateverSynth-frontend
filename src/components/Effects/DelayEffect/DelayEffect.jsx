import React from 'react';
import {
  useHandleDelayBypass,
  useHandleDelayFeedback,
  useHandleDelayTime,
  useHandleDelayWetLevel,
  useHandleDelayDryLevel,
  useHandleDelayCutoff,
  useDelayBypass,
  useDelayFeedback,
  useDelayTime,
  useDelayWetLevel,
  useDelayDryLevel,
  useDelayCutoff,
} from '../../../hooks/EffectsProvider';
// import Tuna from 'tunajs';

const DelayEffect = () => {
  const delayBypass = useDelayBypass();
  const delayFeedback = useDelayFeedback();
  const delayTime = useDelayTime();
  const delayWetLevel = useDelayWetLevel();
  const delayDryLevel = useDelayDryLevel();
  const delayCutoff = useDelayCutoff();
  const handleDelayBypass = useHandleDelayBypass();
  const handleDelayFeedback = useHandleDelayFeedback();
  const handleDelayTime = useHandleDelayTime();
  const handleDelayWetLevel = useHandleDelayWetLevel();
  const handleDelayDryLevel = useHandleDelayDryLevel();
  const handleDelayCutoff = useHandleDelayCutoff();

  // const delayThing = new Tuna.Delay({
  //   feedback: delayFeedback, //0 to 1+
  //   delayTime: delayTime, //1 to 10000 milliseconds
  //   wetLevel: delayWetLevel, //0 to 1+
  //   dryLevel: delayDryLevel, //0 to 1+
  //   cutoff: delayCutoff, //cutoff frequency of the built in lowpass-filter. 20 to 22050
  //   bypass: delayBypass,
  // });

  return (
    <>
      <div>
        <input
          type="checkbox"
          value={delayBypass}
          onChange={handleDelayBypass}
        ></input>
        <label>Delay Bypass</label>
      </div>

      <div>
        <input
          type="range"
          min="0"
          max="1"
          value={delayFeedback}
          step="0.05"
          id="delayFeedbackRange"
          onChange={handleDelayFeedback}
        ></input>
        <label>Delay Feedback</label>
      </div>

      <div>
        <input
          type="range"
          min="1"
          max="1000"
          value={delayTime}
          step="1"
          id="delayTimeRange"
          onChange={handleDelayTime}
        ></input>
        <label>Delay Time</label>
      </div>

      <div>
        <input
          type="range"
          min="0"
          max="1"
          value={delayWetLevel}
          step="0.1"
          id="delayWetLevelRange"
          onChange={handleDelayWetLevel}
        ></input>
        <label>Delay Wet Level</label>
      </div>

      <div>
        <input
          type="range"
          min="0"
          max="1"
          value={delayDryLevel}
          step="0.1"
          id="delayDryLevelRange"
          onChange={handleDelayDryLevel}
        ></input>
        <label>Delay Dry Level</label>
      </div>

      <div>
        <input
          type="range"
          min="20"
          max="22050"
          value={delayCutoff}
          step="10"
          id="delayCutoffRange"
          onChange={handleDelayCutoff}
        ></input>
        <label>Delay Cutoff</label>
      </div>
    </>
  );
};

export default DelayEffect;
