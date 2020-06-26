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
    // 'Bitcrusher'
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

  const handleWaveshape = ({ target }) => {
    setWaveshape(target.value);
  };

  const handleGainSetting = ({ target }) => {
    setGainSetting(target.value);
  };

  const handleAddEffect = (newEffect) => {
    setEffects([...effects, newEffect]);
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
        handleDelay,
        handleChorus,
        effects,
        chorusSettings,
        phaserSettings,
        delaySettings,
        tremoloSettings,
        wahWahSettings,
        bitcrusherSettings,
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
