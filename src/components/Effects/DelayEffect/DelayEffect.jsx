import React from 'react';
import {
  useHandleDelayBypass,
  useHandleDelayFeedback,
  useHandleDelayTime,
  useHandleDelayWetLevel,
  useHandleDelayDryLevel,
  useHandleDelayCutoff,
  // useDelayBypass,
  // useDelayFeedback,
  // useDelayTime,
  // useDelayWetLevel,
  // useDelayDryLevel,
  // useDelayCutoff,
  useDelaySettings,
} from '../../../hooks/EffectsProvider';

const DelayEffect = () => {
  const delaySettings = useDelaySettings();

  // const delayBypass = useDelayBypass();
  // const delayFeedback = useDelayFeedback();
  // const delayTime = useDelayTime();
  // const delayWetLevel = useDelayWetLevel();
  // const delayDryLevel = useDelayDryLevel();
  // const delayCutoff = useDelayCutoff();

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
          value={delaySettings.bypass}
          onChange={handleDelayBypass}
        ></input>
        <label>Delay Bypass</label>
      </div>
      <div>
        <input
          type="range"
          min="0"
          max="1"
          value={delaySettings.feedback}
          step="0.05"
          id="delayFeedbackRange"
          onChange={handleDelayFeedback}
        ></input>
        <label>
          Delay Feedback: <p>{Math.floor(delaySettings.feedback * 100)} %</p>
        </label>
      </div>
      <div>
        <input
          type="range"
          min="1"
          max="1000"
          value={delaySettings.delayTime}
          step="1"
          id="delayTimeRange"
          onChange={handleDelayTime}
        ></input>
        <label>
          Delay Time: <p>{delaySettings.delayTime} ms</p>
        </label>
      </div>
      <div>
        <input
          type="range"
          min="0"
          max="1"
          value={delaySettings.wetLevel}
          step="0.1"
          id="delayWetLevelRange"
          onChange={handleDelayWetLevel}
        ></input>
        <label>
          Delay Wet Level: <p>{Math.floor(delaySettings.wetLevel * 100)} %</p>
        </label>
      </div>
      <div>
        <input
          type="range"
          min="0"
          max="1"
          value={delaySettings.dryLevel}
          step="0.1"
          id="delayDryLevelRange"
          onChange={handleDelayDryLevel}
        ></input>
        <label>
          Delay Dry Level: <p>{Math.floor(delaySettings.dryLevel * 100)} %</p>
        </label>
      </div>
      <div>
        <input
          type="range"
          min="20"
          max="22050"
          value={delaySettings.cutoff}
          step="10"
          id="delayCutoffRange"
          onChange={handleDelayCutoff}
        ></input>
        <label>
          Delay Cutoff: <p>{delaySettings.cutoff} Hz</p>
        </label>
      </div>
    </>
  );
};

export default DelayEffect;
