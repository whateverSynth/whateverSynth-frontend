import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const EffectsContext = createContext();

export const EffectsProvider = ({ children }) => {
  const [waveshape, setWaveshape] = useState('sine');
  const [gainSetting, setGainSetting] = useState(0.8);

  const [effects, setEffects] = useState([
    // 'Chorus',
    // 'Phaser',
    // 'Delay',
    // 'Tremolo',
    // 'WahWah',
    // 'Bitcrusher',
    // 'Reverb'
  ]);

  const [chorusSettings, setChorusSettings] = useState({
    rate: 1.5, //0.01 to 8+
    feedback: 0.2, //0 to 1+
    delay: 0.0045, //0 to 1
    bypass: false, //the value 1 starts the effect as bypassed, 0 or 1
  });

  const [phaserSettings, setPhaserSettings] = useState({
    rate: 1.2, //0.01 to 8 is a decent range, but higher values are possible
    depth: 0.3, //0 to 1
    feedback: 0.2, //0 to 1+
    stereoPhase: 0, //0 to 180
    baseModulationFrequency: 700, //500 to 1500
    bypass: false,
  });

  const [delaySettings, setDelaySettings] = useState({
    feedback: 0.45, //0 to 1+
    delayTime: 150, //1 to 10000 milliseconds
    wetLevel: 0.25, //0 to 1+
    dryLevel: 1, //0 to 1+
    cutoff: 2000, //cutoff frequency of the built in lowpass-filter. 20 to 22050
    bypass: false,
  });

  const [tremoloSettings, setTremoloSettings] = useState({
    intensity: 0.3, //0 to 1
    rate: 4, //0.001 to 8
    stereoPhase: 0, //0 to 180
    bypass: false,
  });

  const [wahWahSettings, setWahWahSettings] = useState({
    automode: false, //true/false
    baseFrequency: 0.5, //0 to 1
    excursionOctaves: 2, //1 to 6
    sweep: 0.2, //0 to 1
    resonance: 10, //1 to 100
    sensitivity: 0.5, //-1 to 1
    bypass: false,
  });

  const [bitcrusherSettings, setBitcrusherSettings] = useState({
    bits: 4, //1 to 16
    normfreq: 0.1, //0 to 1
    bufferSize: 4096, //256 to 16384
  });

  const [reverbSettings, setReverbSettings] = useState({
    highCut: 22050, //20 to 22050
    lowCut: 20, //20 to 22050
    dryLevel: 1, //0 to 1+
    wetLevel: 1, //0 to 1+
    level: 1, //0 to 1+, adjusts total output of both wet and dry
    impulse: 'reverb/silo.wav', //the path to your impulse response
    bypass: 0,
  });

  const [overdriveSettings, setOverdriveSettings] = useState({
    outputGain: -10, //-42 to 0 in dB
    drive: 1, //0 to 1
    curveAmount: 1, //0 to 1
    algorithmIndex: 5, //0 to 5, selects one of our drive algorithms
    bypass: 0,
  });

  const [moogSettings, setMoogSettings] = useState({
    cutoff: 0.45, //0 to 1
    resonance: 2.5, //0 to 4
    bufferSize: 4096, //256 to 16384
  });

  const [filterSettings, setFilterSettings] = useState({
    frequency: 2000, //20 to 22050
    Q: 1, //0.001 to 100
    gain: 0, //-40 to 40 (in decibels)
    filterType: 'highpass', //lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass
    bypass: 0,
  });

  const [pannerSettings, setPannerSettings] = useState({
    pan: -1, // -1 (left) to 1 (right)
  });

  const handleWaveshape = ({ target }) => {
    setWaveshape(target.value);
  };

  const handleGainSetting = ({ target }) => {
    setGainSetting(target.value);
  };

  const handleAddEffect = (newEffect) => {
    setEffects([...effects, newEffect]);
  };

  //effects handlers
  const handleBitcrusher = ({ target }) => {
    const prop = target.name;
    if (prop === 'bypass')
      setBitcrusherSettings({
        ...bitcrusherSettings,
        [prop]: !bitcrusherSettings.bypass,
      });
    else setBitcrusherSettings({ ...bitcrusherSettings, [prop]: target.value });
  };

  const handleDelay = ({ target }) => {
    const prop = target.name;
    if (prop === 'bypass')
      setDelaySettings({ ...delaySettings, [prop]: !delaySettings.bypass });
    else setDelaySettings({ ...delaySettings, [prop]: target.value });
  };

  const handleChorus = ({ target }) => {
    const prop = target.name;
    if (prop === 'bypass')
      setChorusSettings({ ...chorusSettings, [prop]: !chorusSettings.bypass });
    else setChorusSettings({ ...chorusSettings, [prop]: target.value });
  };

  return (
    <EffectsContext.Provider
      value={{
        waveshape,
        gainSetting,
        handleWaveshape,
        handleGainSetting,
        handleAddEffect,
        handleBitcrusher,
        handleDelay,
        handleChorus,
        effects,
        chorusSettings,
        phaserSettings,
        delaySettings,
        tremoloSettings,
        wahWahSettings,
        bitcrusherSettings,
        reverbSettings,
        overdriveSettings,
        moogSettings,
        filterSettings,
        pannerSettings,
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

export const useHandleAddEffect = () => {
  const { handleAddEffect } = useContext(EffectsContext);
  return handleAddEffect;
};

// effect handlers

export const useHandleBitcrusher = () => {
  const { handleBitcrusher } = useContext(EffectsContext);
  return handleBitcrusher;
};

export const useHandleDelay = () => {
  const { handleDelay } = useContext(EffectsContext);
  return handleDelay;
};

export const useHandleChorus = () => {
  const { handleChorus } = useContext(EffectsContext);
  return handleChorus;
};

// new effects
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

export const useReverbSettings = () => {
  const { reverbSettings } = useContext(EffectsContext);
  return reverbSettings;
};

export const useOverdriveSettings = () => {
  const { overdriveSettings } = useContext(EffectsContext);
  return overdriveSettings;
};

export const useMoogSettings = () => {
  const { moogSettings } = useContext(EffectsContext);
  return moogSettings;
};

export const useFilterSettings = () => {
  const { filterSettings } = useContext(EffectsContext);
  return filterSettings;
};

export const usePannerSettings = () => {
  const { pannerSettings } = useContext(EffectsContext);
  return pannerSettings;
};
