import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const EffectsContext = createContext();

export const EffectsProvider = ({ children }) => {
  const [waveshape, setWaveshape] = useState('sine');

  const [effects, setEffects] = useState({
    Chorus: ({
      rate: 1.5,         //0.01 to 8+
      feedback: 0.2,     //0 to 1+
      delay: 0.0045,     //0 to 1
      bypass: 0          //the value 1 starts the effect as bypassed, 0 or 1
    }),
    Phaser : ({
      rate: 1.2,                     //0.01 to 8 is a decent range, but higher values are possible
      depth: 0.3,                    //0 to 1
      feedback: 0.2,                 //0 to 1+
      stereoPhase: 30,               //0 to 180
      baseModulationFrequency: 700,  //500 to 1500
      bypass: 0
    }),
    Delay: ({}),
    Tremolo: ({
      intensity: 0.3,    //0 to 1
      rate: 4,         //0.001 to 8
      stereoPhase: 0,    //0 to 180
      bypass: 0
    }),
    WahWah: ({
      automode: false,                //true/false
      baseFrequency: 0.5,            //0 to 1
      excursionOctaves: 2,           //1 to 6
      sweep: 0.2,                    //0 to 1
      resonance: 10,                 //1 to 100
      sensitivity: 0.5,              //-1 to 1
      bypass: 0
    }),
    Bitcrusher: ({
      bits: 4,          //1 to 16
      normfreq: 0.1,    //0 to 1
      bufferSize: 4096  //256 to 16384
    })
  });

  //delay
  const [delayBypass, setDelayBypass] = useState(false); //0 or 1
  const [delayFeedback, setDelayFeedback] = useState(0.45); //0 to 1+
  const [delayTime, setDelayTime] = useState(150); //1 to 10000 ms
  const [delayWetLevel, setDelayWetLevel] = useState(0.25); //0 to 1+
  const [delayDryLevel, setDelayDryLevel] = useState(1); //0 to 1+
  const [delayCutoff, setDelayCutoff] = useState(2000); //20 to 22050 hz

  const [delaySettings, setDelaySettings] = useState({    
    feedback: delayFeedback, //0 to 1+
    delayTime: delayTime, //1 to 10000 milliseconds
    wetLevel: delayWetLevel, //0 to 1+
    dryLevel: delayDryLevel, //0 to 1+
    cutoff: delayCutoff, //cutoff frequency of the built in lowpass-filter. 20 to 22050
    bypass: delayBypass  
  });

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

  //overdrive
  const [overdriveBypass, setOverdriveBypass] = useState(1); //0 or 1
  const [overdriveOutputGain, setOverdriveOutputGain] = useState(0); //-42 to 0 in dB
  const [overdriveDrive, setOverdriveDrive] = useState(0.7); //0 to 1
  const [overdriveCurveAmount, setOverdriveCurveAmount] = useState(1); //0 to 1
  const [overdriveAlgorithm, setOverdriveAlgorithm] = useState(0); //0 to 5, selects one of the drive algorithms

  const handleWaveshape = ({ target }) => {
    setWaveshape(target.value);
  };

  const handleDelayBypass = () => {
    setDelayBypass(!delayBypass);
    setDelaySettings({ ...delaySettings, bypass: !delayBypass });
  };

  const handleDelayFeedback = ({ target }) => {
    setDelayFeedback(target.value);
    setDelaySettings({ ...delaySettings, feedback: target.value });
  };

  const handleDelayTime = ({ target }) => {
    setDelayTime(target.value);
    setDelaySettings({ ...delaySettings, delayTime: target.value });
  };

  const handleDelayWetLevel = ({ target }) => {
    setDelayWetLevel(target.value);
    setDelaySettings({ ...delaySettings, wetLevel: target.value });
  };

  const handleDelayDryLevel = ({ target }) => {
    setDelayDryLevel(target.value);
    setDelaySettings({ ...delaySettings, dryLevel: target.value });
  };

  const handleDelayCutoff = ({ target }) => {
    setDelayCutoff(target.value);
    setDelaySettings({ ...delaySettings, cutoff: target.value });
  };

  return (
    <EffectsContext.Provider
      value={{
        waveshape,
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
        overdriveBypass,
        setOverdriveBypass,
        overdriveOutputGain,
        setOverdriveOutputGain,
        overdriveDrive,
        setOverdriveDrive,
        overdriveCurveAmount,
        setOverdriveCurveAmount,
        overdriveAlgorithm,
        setOverdriveAlgorithm,
        handleWaveshape,
        handleDelayBypass,
        handleDelayFeedback,
        handleDelayTime,
        handleDelayWetLevel,
        handleDelayDryLevel,
        handleDelayCutoff,
        effects,
        delaySettings
      }}
    >
      {children}
    </EffectsContext.Provider>
  );
};

EffectsProvider.propTypes = {
  children: PropTypes.node,
};

export const useWaveshape = () => {
  const { waveshape } = useContext(EffectsContext);
  return waveshape;
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
  const { phaserBypass } = useContext(EffectsContext);
  return phaserBypass;
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

//overdrive exports
export const useOverdriveBypass = () => {
  const { overdriveBypass } = useContext(EffectsContext);
  return overdriveBypass;
};

export const useSetOverdriveBypass = () => {
  const { setOverdriveBypass } = useContext(EffectsContext);
  return setOverdriveBypass;
};

export const useOverdriveOutputGain = () => {
  const { overdriveOutputGain } = useContext(EffectsContext);
  return overdriveOutputGain;
};

export const useSetOverdriveOutputGain = () => {
  const { setOverdriveOutputGain } = useContext(EffectsContext);
  return setOverdriveOutputGain;
};

export const useOverdrive = () => {
  const { overdriveDrive } = useContext(EffectsContext);
  return overdriveDrive;
};

export const useSetOverdriveDrive = () => {
  const { setOverdriveDrive } = useContext(EffectsContext);
  return setOverdriveDrive;
};

export const useOverdriveCurveAmount = () => {
  const { overdriveCurveAmount } = useContext(EffectsContext);
  return overdriveCurveAmount;
};

export const useSetOverdriveCurveAmount = () => {
  const { setOverdriveCurveAmount } = useContext(EffectsContext);
  return setOverdriveCurveAmount;
};

export const useOverdriveAlgorithm = () => {
  const { overdriveAlgorithm } = useContext(EffectsContext);
  return overdriveAlgorithm;
};

export const useSetOverdriveAlgorithm = () => {
  const { setOverdriveAlgorithm } = useContext(EffectsContext);
  return setOverdriveAlgorithm;
};

export const useHandleWaveshape = () => {
  const { handleWaveshape } = useContext(EffectsContext);
  return handleWaveshape;
};

//delay handlers export
export const useHandleDelayBypass = () => {
  const { handleDelayBypass } = useContext(EffectsContext);
  return handleDelayBypass;
};

export const useHandleDelayFeedback = () => {
  const { handleDelayFeedback } = useContext(EffectsContext);
  return handleDelayFeedback;
};

export const useHandleDelayTime = () => {
  const { handleDelayTime } = useContext(EffectsContext);
  return handleDelayTime;
};

export const useHandleDelayWetLevel = () => {
  const { handleDelayWetLevel } = useContext(EffectsContext);
  return handleDelayWetLevel;
};

export const useHandleDelayDryLevel = () => {
  const { handleDelayDryLevel } = useContext(EffectsContext);
  return handleDelayDryLevel;
};

export const useHandleDelayCutoff = () => {
  const { handleDelayCutoff } = useContext(EffectsContext);
  return handleDelayCutoff;
};

export const useEffects = () => {
  const { effects } = useContext(EffectsContext);
  return effects;
};

export const useDelaySettings = () => {
  const { delaySettings } = useContext(EffectsContext);
  return delaySettings;
};
