import React from 'react';
import {
  useDelaySettings,
  useHandleDelay,
} from '../../../hooks/EffectsProvider';

const DelayEffect = () => {
  const delaySettings = useDelaySettings();
  const handleDelay = useHandleDelay();

  return (
    <div>
      <fieldset><legend>DELAY</legend>
        <div>
          <input
            type="checkbox"
            value={delaySettings.bypass}
            onChange={handleDelay}
            name="bypass"></input>
          <label>Bypass</label>
        </div>
        <div>
          <input
            type="range"
            min="0"
            max="1"
            value={delaySettings.feedback}
            step="0.05"
            id="delayFeedbackRange"
            onChange={handleDelay}
            name="feedback"
          ></input>
          <label>
          Feedback: <p>{Math.floor(delaySettings.feedback * 100)} %</p>
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
            onChange={handleDelay}
            name="delayTime"
          ></input>
          <label>
          Time: <p>{delaySettings.delayTime} ms</p>
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
            onChange={handleDelay}
            name="wetLevel"
          ></input>
          <label>
          Wet: <p>{Math.floor(delaySettings.wetLevel * 100)} %</p>
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
            onChange={handleDelay}
            name="dryLevel"
          ></input>
          <label>
          Dry: <p>{Math.floor(delaySettings.dryLevel * 100)} %</p>
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
            onChange={handleDelay}
            name="cutoff"
          ></input>
          <label>
          Cutoff: <p>{delaySettings.cutoff} Hz</p>
          </label>
        </div>
      </fieldset>
    </div>

  );
};

export default DelayEffect;
