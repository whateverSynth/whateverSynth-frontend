import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const EffectsContext = createContext();

export const EffectsProvider = ({ children }) => {
  const [waveshape, setWaveshape] = useState('sine');
  const [gainSetting, setGainSetting] = useState(0.8);

  const [effects, setEffects] = useState([
    'Chorus',
    'Phaser',
    'Delay',
    'Tremolo',
    'WahWah',
    'Bitcrusher'
  ]);

  const [chorusSettings, setChorusSettings] = useState({    
    rate: 1.5,         //0.01 to 8+
    feedback: 0.2,     //0 to 1+
    delay: 0.0045,     //0 to 1
    bypass: 0          //the value 1 starts the effect as bypassed, 0 or 1
  });

  const [phaserSettings, setPhaserSettings] = useState({    
    rate: 1.2,                     //0.01 to 8 is a decent range, but higher values are possible
    depth: 0.3,                    //0 to 1
    feedback: 0.2,                 //0 to 1+
    stereoPhase: 30,               //0 to 180
    baseModulationFrequency: 700,  //500 to 1500
    bypass: 0
  });

  const [delaySettings, setDelaySettings] = useState({    
    feedback: 0.45, //0 to 1+
    delayTime: 150, //1 to 10000 milliseconds
    wetLevel: 0.25, //0 to 1+
    dryLevel: 1, //0 to 1+
    cutoff: 2000, //cutoff frequency of the built in lowpass-filter. 20 to 22050
    bypass: false  
  });

  const [tremoloSettings, setTremoloSettings] = useState({    
    intensity: 0.3,    //0 to 1
    rate: 4,         //0.001 to 8
    stereoPhase: 0,    //0 to 180
    bypass: 0
  });

  const [wahWahSettings, setWahWahSettings] = useState({    
    automode: false,                //true/false
    baseFrequency: 0.5,            //0 to 1
    excursionOctaves: 2,           //1 to 6
    sweep: 0.2,                    //0 to 1
    resonance: 10,                 //1 to 100
    sensitivity: 0.5,              //-1 to 1
    bypass: 0
  });

  const [bitcrusherSettings, setBitcrusherSettings] = useState({    
    bits: 4,          //1 to 16
    normfreq: 0.1,    //0 to 1
    bufferSize: 4096  //256 to 16384
  });

  const handleWaveshape = ({ target }) => {
    setWaveshape(target.value);
  };

  const handleGainSetting = ({ target }) => {
    setGainSetting(target.value);
  };

  const handleDelayBypass = () => {
    setDelaySettings({ ...delaySettings, bypass: !delaySettings.bypass });
  };

  const handleDelayFeedback = ({ target }) => {
    setDelaySettings({ ...delaySettings, feedback: target.value });
  };

  const handleDelayTime = ({ target }) => {
    setDelaySettings({ ...delaySettings, delayTime: target.value });
  };

  const handleDelayWetLevel = ({ target }) => {
    setDelaySettings({ ...delaySettings, wetLevel: target.value });
  };

  const handleDelayDryLevel = ({ target }) => {
    setDelaySettings({ ...delaySettings, dryLevel: target.value });
  };

  const handleDelayCutoff = ({ target }) => {
    setDelaySettings({ ...delaySettings, cutoff: target.value });
  };

  return (
    <EffectsContext.Provider
      value={{
        waveshape,
        gainSetting,
        handleWaveshape,
        handleGainSetting,
        handleDelayBypass,
        handleDelayFeedback,
        handleDelayTime,
        handleDelayWetLevel,
        handleDelayDryLevel,
        handleDelayCutoff,
        effects,
        chorusSettings,
        phaserSettings,
        delaySettings,
        tremoloSettings,
        wahWahSettings,
        bitcrusherSettings
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

export const useGainSetting = () => {
  const { gainSetting } = useContext(EffectsContext);
  return gainSetting;
};

//handlers
export const useHandleWaveshape = () => {
  const { handleWaveshape } = useContext(EffectsContext);
  return handleWaveshape;
};

export const useHandleGainSetting = () => {
  const { handleGainSetting } = useContext(EffectsContext);
  return handleGainSetting;
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

// NEW EFFECTS

export const useEffects = () => {
  const { effects } = useContext(EffectsContext);
  return effects;
};

export const useChorusSettings = () => {
  const { chorusSettings } = useContext(EffectsContext);
  return chorusSettings;
};

export const usePhaserSettings = () => {
  const { phaserSettings } = useContext(EffectsContext);
  return phaserSettings;
};

export const useDelaySettings = () => {
  const { delaySettings } = useContext(EffectsContext);
  return delaySettings;
};

export const useTremoloSettings = () => {
  const { tremoloSettings } = useContext(EffectsContext);
  return tremoloSettings;
};

export const useWahWahSettings = () => {
  const { wahWahSettings } = useContext(EffectsContext);
  return wahWahSettings;
};

export const useBitcrusherSettings = () => {
  const { bitcrusherSettings } = useContext(EffectsContext);
  return bitcrusherSettings;
};



