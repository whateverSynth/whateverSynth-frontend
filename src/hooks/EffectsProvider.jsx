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

  const [bitcrusherSettings, setBitcrusherSettings] = useState({
    bits: 4, //1 to 16
    normfreq: 0.1, //0 to 1
    bufferSize: 4096, //256 to 16384
    bypass: false,
  });

  const [chorusSettings, setChorusSettings] = useState({
    rate: 1.5, //0.01 to 8+
    feedback: 0.2, //0 to 1+
    delay: 0.0045, //0 to 1
    bypass: false, //the value 1 starts the effect as bypassed, 0 or 1
  });

  const [compressorSettings, setCompressorSettings] = useState({
    threshold: -1, //-100 to 0
    makeupGain: 1, //0 and up (in decibels)
    attack: 1, //0 to 1000
    release: 0, //0 to 3000
    ratio: 4, //1 to 20
    knee: 5, //0 to 40
    automakeup: false, //true/false
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

  const [filterSettings, setFilterSettings] = useState({
    frequency: 2000, //20 to 22050
    Q: 1, //0.001 to 100
    gain: 0, //-40 to 40 (in decibels)
    filterType: 'highpass', //lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass
    bypass: false,
  });

  const [moogSettings, setMoogSettings] = useState({
    cutoff: 0.45, //0 to 1
    resonance: 2.5, //0 to 4
    bufferSize: 4096, //256 to 16384,
    bypass: false,
  });

  const [overdriveSettings, setOverdriveSettings] = useState({
    outputGain: -10, //-42 to 0 in dB
    drive: 1, //0 to 1
    curveAmount: 1, //0 to 1
    algorithmIndex: 5, //0 to 5, selects one of our drive algorithms
    bypass: false,
  });

  const [pannerSettings, setPannerSettings] = useState({
    pan: 0, // -1 (left) to 1 (right)
    bypass: false,
  });

  const [phaserSettings, setPhaserSettings] = useState({
    rate: 1.2, //0.01 to 8 is a decent range, but higher values are possible
    depth: 0.3, //0 to 1
    feedback: 0.2, //0 to 1+
    stereoPhase: 0, //0 to 180
    baseModulationFrequency: 700, //500 to 1500
    bypass: false,
  });

  const [pingPongDelaySettings, setPingPongDelaySettings] = useState({
    wetLevel: 0.5, //0 to 1
    feedback: 0.3, //0 to 1
    delayTimeLeft: 150, //1 to 10000 (milliseconds)
    delayTimeRight: 200, //1 to 10000 (milliseconds)
    bypass: false,
  });

  const [reverbSettings, setReverbSettings] = useState({
    highCut: 22050, //20 to 22050
    lowCut: 20, //20 to 22050
    dryLevel: 1, //0 to 1+
    wetLevel: 1, //0 to 1+
    level: 1, //0 to 1+, adjusts total output of both wet and dry
    impulse: 'reverb/garage.wav', //the path to your impulse response
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

  const handleWaveshape = ({ target }) => {
    setWaveshape(target.value);
  };

  const handleGainSetting = ({ target }) => {
    setGainSetting(target.value);
  };

  const handleAddEffect = (newEffect) => {
    setEffects([...effects, newEffect]);
  };

  const handleRemoveEffect = (effectToRemove) => {
    setEffects([...effects, effectToRemove.pop]);
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

  const handleCompressor = ({ target }) => {
    const prop = target.name;
    if (prop === 'bypass') {
      setCompressorSettings({
        ...compressorSettings,
        [prop]: !compressorSettings.bypass,
      });
    } else if (prop === 'automakeup')
      setCompressorSettings({
        ...compressorSettings,
        [prop]: !compressorSettings.automakeup,
      });
    else setCompressorSettings({ ...compressorSettings, [prop]: target.value });
  };

  const handleChorus = ({ target }) => {
    const prop = target.name;
    if (prop === 'bypass')
      setChorusSettings({ ...chorusSettings, [prop]: !chorusSettings.bypass });
    else setChorusSettings({ ...chorusSettings, [prop]: target.value });
  };

  const handleDelay = ({ target }) => {
    const prop = target.name;
    if (prop === 'bypass')
      setDelaySettings({ ...delaySettings, [prop]: !delaySettings.bypass });
    else setDelaySettings({ ...delaySettings, [prop]: target.value });
  };

  const handleFilter = ({ target }) => {
    const prop = target.name;
    if (prop === 'bypass')
      setFilterSettings({ ...filterSettings, [prop]: !filterSettings.bypass });
    else setFilterSettings({ ...filterSettings, [prop]: target.value });
  };

  const handleMoogFilter = ({ target }) => {
    const prop = target.name;
    if (prop === 'bypass')
      setMoogSettings({ ...moogSettings, [prop]: !moogSettings.bypass });
    else setMoogSettings({ ...moogSettings, [prop]: target.value });
  };

  const handleOverdrive = ({ target }) => {
    const prop = target.name;
    if (prop === 'bypass')
      setOverdriveSettings({
        ...overdriveSettings,
        [prop]: !overdriveSettings.bypass,
      });
    else setOverdriveSettings({ ...overdriveSettings, [prop]: target.value });
  };

  const handlePanner = ({ target }) => {
    const prop = target.name;
    if (prop === 'bypass')
      setPannerSettings({ ...pannerSettings, [prop]: !pannerSettings.bypass });
    else setPannerSettings({ ...pannerSettings, [prop]: target.value });
  };

  const handlePhaser = ({ target }) => {
    const prop = target.name;
    if (prop === 'bypass')
      setPhaserSettings({ ...phaserSettings, [prop]: !phaserSettings.bypass });
    else setPhaserSettings({ ...phaserSettings, [prop]: target.value });
  };

  const handlePingPongDelay = ({ target }) => {
    const prop = target.name;
    if (prop === 'bypass')
      setPingPongDelaySettings({
        ...pingPongDelaySettings,
        [prop]: !pingPongDelaySettings.bypass,
      });
    else
      setPingPongDelaySettings({
        ...pingPongDelaySettings,
        [prop]: target.value,
      });
  };

  setPingPongDelaySettings;

  const handleReverb = ({ target }) => {
    const prop = target.name;
    if (prop === 'bypass')
      setReverbSettings({ ...reverbSettings, [prop]: !reverbSettings.bypass });
    else setReverbSettings({ ...reverbSettings, [prop]: target.value });
  };

  const handleTremolo = ({ target }) => {
    const prop = target.name;
    if (prop === 'bypass')
      setTremoloSettings({
        ...tremoloSettings,
        [prop]: !tremoloSettings.bypass,
      });
    else setTremoloSettings({ ...tremoloSettings, [prop]: target.value });
  };

  const handleWahWah = ({ target }) => {
    const prop = target.name;
    if (prop === 'bypass') {
      setWahWahSettings({ ...wahWahSettings, [prop]: !wahWahSettings.bypass });
    } else if (prop === 'automode')
      setWahWahSettings({
        ...wahWahSettings,
        [prop]: !wahWahSettings.automode,
      });
    else setWahWahSettings({ ...wahWahSettings, [prop]: target.value });
  };

  return (
    <EffectsContext.Provider
      value={{
        waveshape,
        gainSetting,
        handleWaveshape,
        handleGainSetting,
        handleAddEffect,
        handleRemoveEffect,
        handleBitcrusher,
        handleCompressor,
        handleChorus,
        handleDelay,
        handleFilter,
        handleMoogFilter,
        handleOverdrive,
        handlePanner,
        handlePhaser,
        handlePingPongDelay,
        handleReverb,
        handleTremolo,
        handleWahWah,
        effects,
        compressorSettings,
        chorusSettings,
        phaserSettings,
        pingPongDelaySettings,
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

export const useHandleRemoveEffect = () => {
  const { handleRemoveEffect } = useContext(EffectsContext);
  return handleRemoveEffect;
};

// effect handlers

export const useHandleBitcrusher = () => {
  const { handleBitcrusher } = useContext(EffectsContext);
  return handleBitcrusher;
};

export const useHandleChorus = () => {
  const { handleChorus } = useContext(EffectsContext);
  return handleChorus;
};

export const useHandleCompressor = () => {
  const { handleCompressor } = useContext(EffectsContext);
  return handleCompressor;
};

export const useHandleDelay = () => {
  const { handleDelay } = useContext(EffectsContext);
  return handleDelay;
};

export const useHandleFilter = () => {
  const { handleFilter } = useContext(EffectsContext);
  return handleFilter;
};

export const useHandleMoogFilter = () => {
  const { handleMoogFilter } = useContext(EffectsContext);
  return handleMoogFilter;
};

export const useHandleOverdrive = () => {
  const { handleOverdrive } = useContext(EffectsContext);
  return handleOverdrive;
};

export const useHandlePanner = () => {
  const { handlePanner } = useContext(EffectsContext);
  return handlePanner;
};

export const useHandlePhaser = () => {
  const { handlePhaser } = useContext(EffectsContext);
  return handlePhaser;
};

export const useHandlePingPongDelay = () => {
  const { handlePingPongDelay } = useContext(EffectsContext);
  return handlePingPongDelay;
};

export const useHandleReverb = () => {
  const { handleReverb } = useContext(EffectsContext);
  return handleReverb;
};

export const useHandleTremolo = () => {
  const { handleTremolo } = useContext(EffectsContext);
  return handleTremolo;
};

export const useHandleWahWah = () => {
  const { handleWahWah } = useContext(EffectsContext);
  return handleWahWah;
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

export const useCompressorSettings = () => {
  const { compressorSettings } = useContext(EffectsContext);
  return compressorSettings;
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

export const usePingPongDelaySettings = () => {
  const { pingPongDelaySettings } = useContext(EffectsContext);
  return pingPongDelaySettings;
};
