import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const EffectsContext = createContext();

export const EffectsProvider = ({ children }) => {
  //delay
  const [delayBypass, setDelayBypass] = useState(1); //0 or 1
  const [delayFeedback, setDelayFeedback] = useState(0.45); //0 to 1+
  const [delayTime, setDelayTime] = useState(150); //1 to 10000 ms
  const [delayWetLevel, setDelayWetLevel] = useState(0.25); //0 to 1+
  const [delayDryLevel, setDelayDryLevel] = useState(1); //0 to 1+
  const [delayCutoff, setDelayCutoff] = useState(2000); //20 to 22050 hz

  //chorus
  const [chorusBypass, setChorusBypass] = useState(1); //0 or 1
  const [chorusRate, setChorusRate] = useState(1.5); //0.01 to 8+
  const [chorusFeedback, setChorusFeedback] = useState(0.2); //0 to 1+
  const [chorusDelay, setChorusDelay] = useState(0.0045); //0 to 1

  //phaser
  const [phaserBypass, setPhaserBypass] = useState(1); //0 or 1
  const [phaserRate, setPhaserRate] = useState(1.2); //0.01 to 8+
  const [phaserDepth, setPhaserDepth] = useState(0.3); //0 to 1
  const [phaserFeedback, setPhaserFeedback] = useState(0.2); //0 to 1+
  const [phaserStereoPhase, setPhaserStereoPhase] = useState(30); //0 to 180
  const [phaserBaseModFreq, setPhaserBaseModFreq] = useState(700); //500 to 1500

  return (
    <EffectsContext.Provider
      value={{
        delayBypass,
        setDelayBypass,
        delayFeedback,
        setDelayFeedback,
        delayTime,
        setDelayTime,
        delayWetLevel,
        setDelayWetLevel,
        delayDryLevel,
        setDelayDryLevel,
        delayCutoff,
        setDelayCutoff,
        chorusBypass,
        setChorusBypass,
        chorusRate,
        setChorusRate,
        chorusFeedback,
        setChorusFeedback,
        chorusDelay,
        setChorusDelay,
        phaserBypass,
        setPhaserBypass,
        phaserRate,
        setPhaserRate,
        phaserDepth,
        setPhaserDepth,
        phaserFeedback,
        setPhaserFeedback,
        phaserStereoPhase,
        setPhaserStereoPhase,
        phaserBaseModFreq,
        setPhaserBaseModFreq,
      }}
    >
      {children}
    </EffectsContext.Provider>
  );
};

EffectsProvider.propTypes = {
  children: PropTypes.node,
};

//delay exports
export const useDelayBypass = () => {
  const { delayBypass } = useContext(EffectsContext);
  return delayBypass;
};

export const useSetDelayBypass = () => {
  const { setDelayBypass } = useContext(EffectsContext);
  return setDelayBypass;
};

export const useDelayFeedback = () => {
  const { delayFeedback } = useContext(EffectsContext);
  return delayFeedback;
};

export const useSetDelayFeedback = () => {
  const { setDelayFeedback } = useContext(EffectsContext);
  return setDelayFeedback;
};

export const useDelayTime = () => {
  const { delayTime } = useContext(EffectsContext);
  return delayTime;
};

export const useSetDelayTime = () => {
  const { setDelayTime } = useContext(EffectsContext);
  return setDelayTime;
};

export const useDelayWetLevel = () => {
  const { delayWetLevel } = useContext(EffectsContext);
  return delayWetLevel;
};

export const useSetDelayWetLevel = () => {
  const { setDelayWetLevel } = useContext(EffectsContext);
  return setDelayWetLevel;
};

export const useDelayDryLevel = () => {
  const { delayDryLevel } = useContext(EffectsContext);
  return delayDryLevel;
};

export const useSetDelayDryLevel = () => {
  const { setDelayDryLevel } = useContext(EffectsContext);
  return setDelayDryLevel;
};

export const useDelayCutoff = () => {
  const { delayCutoff } = useContext(EffectsContext);
  return delayCutoff;
};

export const useSetDelayCutoff = () => {
  const { setDelayCutoff } = useContext(EffectsContext);
  return setDelayCutoff;
};

//chorus exports
export const useChorusBypass = () => {
  const { chorusBypass } = useContext(EffectsContext);
  return chorusBypass;
};

export const useSetChorusBypass = () => {
  const { setChorusBypass } = useContext(EffectsContext);
  return setChorusBypass;
};

export const useChorusRate = () => {
  const { chorusRate } = useContext(EffectsContext);
  return chorusRate;
};

export const useSetChorusRate = () => {
  const { setChorusRate } = useContext(EffectsContext);
  return setChorusRate;
};

export const useChorusFeedback = () => {
  const { chorusFeedback } = useContext(EffectsContext);
  return chorusFeedback;
};

export const useSetChorusFeedback = () => {
  const { setChorusFeedback } = useContext(EffectsContext);
  return setChorusFeedback;
};

export const useChorusDelay = () => {
  const { chorusDelay } = useContext(EffectsContext);
  return chorusDelay;
};

export const useSetChorusDelay = () => {
  const { setChorusDelay } = useContext(EffectsContext);
  return setChorusDelay;
};

//phaser exports
export const usePhaserBypass = () => {
  const { chorusBypass } = useContext(EffectsContext);
  return chorusBypass;
};

export const useSetPhaserBypass = () => {
  const { setPhaserBypass } = useContext(EffectsContext);
  return setPhaserBypass;
};

export const usePhaserRate = () => {
  const { phaserRate } = useContext(EffectsContext);
  return phaserRate;
};

export const useSetPhaserRate = () => {
  const { setPhaserRate } = useContext(EffectsContext);
  return setPhaserRate;
};

export const usePhaserFeedback = () => {
  const { phaserFeedback } = useContext(EffectsContext);
  return phaserFeedback;
};

export const useSetPhaserFeedback = () => {
  const { setPhaserFeedback } = useContext(EffectsContext);
  return setPhaserFeedback;
};

export const usePhaserStereoPhase = () => {
  const { phaserStereoPhase } = useContext(EffectsContext);
  return phaserStereoPhase;
};

export const useSetPhaserStereoPhase = () => {
  const { setPhaserStereoPhase } = useContext(EffectsContext);
  return setPhaserStereoPhase;
};

export const usePhaserBaseModeFreq = () => {
  const { phaserBaseModeFreq } = useContext(EffectsContext);
  return phaserBaseModeFreq;
};

export const useSetPhaserBaseModeFreq = () => {
  const { setPhaserBaseModeFreq } = useContext(EffectsContext);
  return setPhaserBaseModeFreq;
};
