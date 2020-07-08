import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import {
  defaultDelaySettings,
  defaultBitcrusherSettings,
  defaultCompressorSettings,
  defaultChorusSettings,
  defaultFilterSettings,
  defaultMoogSettings,
  defaultOverdriveSettings,
  defaultPannerSettings,
  defaultPhaserSettings,
  defaultPingPongDelaySettings,
  defaultReverbSettings,
  defaultTremoloSettings,
  defaultWahWahSettings,
} from '../utils/data';

const EffectsContext = createContext();

export const EffectsProvider = ({ children }) => {
  const [waveshape, setWaveshape] = useState('sine');
  const [envelopeSettings, setEnvelopeSettings] = useState({
    attackTime: 0.1,
    decayTime: 2,
    sustainLevel: 0.4,
    releaseTime: 0.1,
    startLevel: 0,
  });
  const [gainSetting, setGainSetting] = useState(0.15);

  const [newEffects, setNewEffects] = useState([]);

  const [newEffectSettings, setNewEffectSettings] = useState([]);

  const handleWaveshape = ({ target }) => {
    setWaveshape(target.value);
  };

  const handleEnvelopeSettings = ({ target }) => {
    setEnvelopeSettings({ ...envelopeSettings, [target.name]: Number(target.value) });
  };

  const handleGainSetting = ({ target }) => {
    setGainSetting(target.value);
  };

  const handleAddEffect = (newEffect) => {
    const id = shortId.generate();
    setNewEffects([
      ...newEffects,
      { type: newEffect, id: id, name: `${newEffect}${id}` },
    ]);
    if (newEffect === 'Bitcrusher')
      setNewEffectSettings([
        ...newEffectSettings,
        { id: id, settings: defaultBitcrusherSettings },
      ]);
    if (newEffect === 'Compressor')
      setNewEffectSettings([
        ...newEffectSettings,
        { id: id, settings: defaultCompressorSettings },
      ]);
    if (newEffect === 'Chorus')
      setNewEffectSettings([
        ...newEffectSettings,
        { id: id, settings: defaultChorusSettings },
      ]);
    if (newEffect === 'Delay')
      setNewEffectSettings([
        ...newEffectSettings,
        { id: id, settings: defaultDelaySettings },
      ]);
    if (newEffect === 'Filter')
      setNewEffectSettings([
        ...newEffectSettings,
        { id: id, settings: defaultFilterSettings },
      ]);
    if (newEffect === 'MoogFilter')
      setNewEffectSettings([
        ...newEffectSettings,
        { id: id, settings: defaultMoogSettings },
      ]);
    if (newEffect === 'Overdrive')
      setNewEffectSettings([
        ...newEffectSettings,
        { id: id, settings: defaultOverdriveSettings },
      ]);
    if (newEffect === 'Panner')
      setNewEffectSettings([
        ...newEffectSettings,
        { id: id, settings: defaultPannerSettings },
      ]);
    if (newEffect === 'Phaser')
      setNewEffectSettings([
        ...newEffectSettings,
        { id: id, settings: defaultPhaserSettings },
      ]);
    if (newEffect === 'PingPongDelay')
      setNewEffectSettings([
        ...newEffectSettings,
        { id: id, settings: defaultPingPongDelaySettings },
      ]);
    if (newEffect === 'Convolver')
      setNewEffectSettings([
        ...newEffectSettings,
        { id: id, settings: defaultReverbSettings },
      ]);
    if (newEffect === 'Tremolo')
      setNewEffectSettings([
        ...newEffectSettings,
        { id: id, settings: defaultTremoloSettings },
      ]);
    if (newEffect === 'WahWah')
      setNewEffectSettings([
        ...newEffectSettings,
        { id: id, settings: defaultWahWahSettings },
      ]);
  };

  const handleRemoveEffect = (effectToRemove) => {
    const updatedEffects = newEffects.filter(
      (effect) => effect.id !== effectToRemove
    );
    const updatedEffectSettings = newEffectSettings.filter(
      (setting) => setting.id !== effectToRemove
    );
    setNewEffects(updatedEffects);
    setNewEffectSettings(updatedEffectSettings);
  };

  //effects handlers
  const handleEffectChange = ({ target }, id) => {
    const oldEffects = newEffectSettings.filter(
      (effectSetting) => effectSetting.id !== id
    );
    let effectToUpdate = newEffectSettings.find(
      (effectSetting) => effectSetting.id === id
    );
    const prop = target.name;
    if (prop === 'bypass') {
      effectToUpdate.settings = {
        ...effectToUpdate.settings,
        [prop]: !effectToUpdate.settings.bypass,
      };
      setNewEffectSettings([...oldEffects, effectToUpdate]);
    } else {
      effectToUpdate.settings = {
        ...effectToUpdate.settings,
        [prop]: target.value,
      };
      setNewEffectSettings([...oldEffects, effectToUpdate]);
    }
  };

  const handleFilterSlider = (target, id) => {
    const oldEffects = newEffectSettings.filter(
      (effectSetting) => effectSetting.id !== id
    );
    let effectToUpdate = newEffectSettings.find(
      (effectSetting) => effectSetting.id === id
    );
    effectToUpdate.settings = {
      ...effectToUpdate.settings,
      frequency: target.x,
      gain: target.y,
    };
    setNewEffectSettings([...oldEffects, effectToUpdate]);
  };

  const handleCompressor = ({ target }, id) => {
    const oldEffects = newEffectSettings.filter(
      (effectSetting) => effectSetting.id !== id
    );
    let effectToUpdate = newEffectSettings.find(
      (effectSetting) => effectSetting.id === id
    );
    const prop = target.name;
    if (prop === 'bypass') {
      effectToUpdate.settings = {
        ...effectToUpdate.settings,
        [prop]: !effectToUpdate.settings.bypass,
      };
      setNewEffectSettings([...oldEffects, effectToUpdate]);
    } else if (prop === 'automakeup') {
      effectToUpdate.settings = {
        ...effectToUpdate.settings,
        [prop]: !effectToUpdate.settings.automakeup,
      };
      setNewEffectSettings([...oldEffects, effectToUpdate]);
    } else {
      effectToUpdate.settings = {
        ...effectToUpdate.settings,
        [prop]: target.value,
      };
      setNewEffectSettings([...oldEffects, effectToUpdate]);
    }
  };

  const handleWahWah = ({ target }, id) => {
    const oldEffects = newEffectSettings.filter(
      (effectSetting) => effectSetting.id !== id
    );
    let effectToUpdate = newEffectSettings.find(
      (effectSetting) => effectSetting.id === id
    );
    const prop = target.name;
    if (prop === 'bypass') {
      effectToUpdate.settings = {
        ...effectToUpdate.settings,
        [prop]: !effectToUpdate.settings.bypass,
      };
      setNewEffectSettings([...oldEffects, effectToUpdate]);
    } else if (prop === 'automode') {
      effectToUpdate.settings = {
        ...effectToUpdate.settings,
        [prop]: !effectToUpdate.settings.automode,
      };
      setNewEffectSettings([...oldEffects, effectToUpdate]);
    } else {
      effectToUpdate.settings = {
        ...effectToUpdate.settings,
        [prop]: target.value,
      };
      setNewEffectSettings([...oldEffects, effectToUpdate]);
    }
  };

  return (
    <EffectsContext.Provider
      value={{
        waveshape,
        envelopeSettings,
        gainSetting,
        handleWaveshape,
        handleEnvelopeSettings,
        handleGainSetting,
        handleAddEffect,
        handleRemoveEffect,
        handleEffectChange,
        handleFilterSlider,
        handleCompressor,
        handleWahWah,
        newEffects,
        newEffectSettings,
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

export const useEnvelopeSettings = () => {
  const { envelopeSettings } = useContext(EffectsContext);
  return envelopeSettings;
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

export const useHandleEnvelopeSettings = () => {
  const { handleEnvelopeSettings } = useContext(EffectsContext);
  return handleEnvelopeSettings;
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
export const useHandleEffectChange = () => {
  const { handleEffectChange } = useContext(EffectsContext);
  return handleEffectChange;
};

export const useHandleFilterSlider = () => {
  const { handleFilterSlider } = useContext(EffectsContext);
  return handleFilterSlider;
};

export const useHandleCompressor = () => {
  const { handleCompressor } = useContext(EffectsContext);
  return handleCompressor;
};

export const useHandleWahWah = () => {
  const { handleWahWah } = useContext(EffectsContext);
  return handleWahWah;
};

// new effects
export const useNewEffects = () => {
  const { newEffects } = useContext(EffectsContext);
  return newEffects;
};

export const useNewEffectSettings = () => {
  const { newEffectSettings } = useContext(EffectsContext);
  return newEffectSettings;
};
