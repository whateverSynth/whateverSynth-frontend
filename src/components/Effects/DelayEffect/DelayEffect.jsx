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
        <label>Delay Feedback: {Math.floor(delayFeedback * 100)} %</label>
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
        <label>Delay Time: {delayTime} ms</label>
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
        <label>Delay Wet Level: {Math.floor(delayWetLevel * 100)} %</label>
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
        <label>Delay Dry Level: {Math.floor(delayDryLevel * 100)} %</label>
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
        <label>Delay Cutoff: {delayCutoff} Hz</label>
      </div>
    </>
  );
};

export default DelayEffect;
