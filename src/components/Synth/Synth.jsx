import React, { useEffect, useState } from 'react';
import styles from './Synth.css';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { keyboardFrequencyMap } from '../../utils/data';
import DelayEffect from '../Effects/DelayEffect/DelayEffect';
import Tuna from 'tunajs';
import {
  useWaveshape,
  useNewEffects,
  useNewEffectSettings,
  useGainSetting,
} from '../../hooks/EffectsProvider';
import Waveshapes from '../Waveshapes/Waveshapes';
import Keyboard from '../Keyboard/Keyboard';
import ChorusEffect from '../Effects/ChorusEffect/ChorusEffect';
import Effects from '../Effects/Effects';
import BitcrusherEffect from '../Effects/BitcrusherEffect/BitcrusherEffect';
import FilterEffect from '../Effects/FilterEffect/FilterEffect';
import MoogFilterEffect from '../Effects/MoogFilterEffect/MoogFilterEffect';
import OverdriveEffect from '../Effects/OverdriveEffect/OverdriveEffect';
import PannerEffect from '../Effects/PannerEffect/PannerEffect';
import PhaserEffect from '../Effects/PhaserEffect/PhaserEffect';
import ReverbEffect from '../Effects/ReverbEffect/ReverbEffect';
import TremoloEffect from '../Effects/TremoloEffect/TremoloEffect';
import WahWahEffect from '../Effects/WahWahEffect/WahWahEffect';
import CompressorEffect from '../Effects/CompressorEffect/CompressorEffect';
import PingPongDelayEffect from '../Effects/PingPongDelayEffect/PingPongDelayEffect';

let audioCtx;
let tuna;
let gain;
let tunaEffects = [];

export default function Synth() {
  const [localEffects, setLocalEffects] = useState([]);

  const waveshape = useWaveshape();
  const gainSetting = useGainSetting();
  const activeOscillators = {};

  // NEW EFFECT STATE
  const newEffects = useNewEffects();
  const newEffectSettings = useNewEffectSettings();

  useEffect(() => {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    tuna = new Tuna(audioCtx);
    gain = audioCtx.createGain();
    gain.connect(audioCtx.destination);
  }, []);

  useEffect(() => {
    tunaEffects = newEffects.map((effect) => {
      const name = effect.type;
      const setting = newEffectSettings.find(setting => setting.id === effect.id);
      return { id: effect.id, effect: new tuna[name](setting.settings) };
    });

    gain.disconnect();

    // MAKE CHAIN BY ITERATING OVER EFFECTS
    if (tunaEffects.length === 0) gain.connect(audioCtx.destination);
    else {
      tunaEffects.forEach((effect, i) => {
        const realEffect = effect.effect;
        if (tunaEffects.length === 1) {
          gain.connect(realEffect);
          realEffect.connect(audioCtx.destination);
          return;
        } else if (i === 0) {
          gain.connect(realEffect);
        } else if (i > 0 && i < tunaEffects.length - 1) {
          (tunaEffects[i - 1]).effect.connect(realEffect);
        } else if (i === tunaEffects.length - 1) {
          (tunaEffects[i - 1]).effect.connect(realEffect);
          realEffect.connect(audioCtx.destination);
        }
      });
    }
    setLocalEffects(tunaEffects);
  }, [newEffects]);

  //useEffect Effects
  useEffect(() => {
    newEffectSettings.forEach(effectSetting => {
      const chainIndex = tunaEffects.findIndex(effect => effect.id === effectSetting.id);
      Object.entries(effectSetting.settings).forEach((setting) => {
        tunaEffects[chainIndex].effect[setting[0]] = setting[1];
      });
    });
  }, [newEffectSettings]);

  useEffect(() => {
    gain.gain.value = gainSetting; //defaults to 0.8
  }, [gainSetting]);

  //HANDLES CREATION & STORING OF OSCILLATORS
  function playNote(key) {
    const osc = audioCtx.createOscillator();
    osc.frequency.setValueAtTime(
      keyboardFrequencyMap[key],
      audioCtx.currentTime
    );
    osc.type = waveshape;
    activeOscillators[key] = osc;
    activeOscillators[key].connect(gain);
    activeOscillators[key].start();
  }

  function keyDown(event) {
    const key = (event.detail || event.which).toString();
    if (keyboardFrequencyMap[key] && !activeOscillators[key]) {
      playNote(key);
    }
  }

  function keyUp(event) {
    const key = (event.detail || event.which).toString();
    if (keyboardFrequencyMap[key] && activeOscillators[key]) {
      activeOscillators[key].stop();
      delete activeOscillators[key];
    }
  }

  function removeFocus(event) {
    if (event.target.type === 'select-one') return;
    else {
      event.target.blur();
      Object.values(activeOscillators).forEach((oscillator) => {
        oscillator.stop();
      });
    }
  }

  window.addEventListener('mouseup', removeFocus);

  const effectNodes = localEffects.map((effect) => {
    if (effect.effect.name === 'Bitcrusher') return <BitcrusherEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'Compressor') return <CompressorEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'Chorus') return <ChorusEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'Delay') return <DelayEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'Filter') return <FilterEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'MoogFilter') return <MoogFilterEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'Overdrive') return <OverdriveEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'Panner') return <PannerEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'Phaser') return <PhaserEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'PingPongDelay') return <PingPongDelayEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'Convolver') return <ReverbEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'Tremolo') return <TremoloEffect key={effect.id} id={effect.id} />;
    if (effect.effect.name === 'WahWah') return <WahWahEffect key={effect.id} id={effect.id} />;
  });

  return (
    <section className={styles.Container}>
      <KeyboardEventHandler
        handleKeys={['all']}
        onKeyEvent={(key, e) => keyDown(e)}
      />

      <KeyboardEventHandler
        handleKeys={['all']}
        handleEventType="keyup"
        onKeyEvent={(key, e) => keyUp(e)}
      />

      <h1>synthinator</h1>
      <Keyboard />
      <Waveshapes />
      <Effects />
      <div className={styles.effectsDrawer}>{effectNodes}</div>
    </section>
  );
}
