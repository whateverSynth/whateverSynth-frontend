export const defaultBitcrusherSettings = {
  bits: 4, //1 to 16
  normfreq: 0.1, //0 to 1
  bufferSize: 4096, //256 to 16384
  bypass: false,
};

export const defaultChorusSettings = {
  rate: 1.5, //0.01 to 8+
  feedback: 0.2, //0 to 1+
  delay: 0.0045, //0 to 1
  bypass: false, //the value 1 starts the effect as bypassed, 0 or 1
};

export const defaultCompressorSettings = {
  threshold: -1, //-100 to 0
  makeupGain: 1, //0 and up (in decibels)
  attack: 1, //0 to 1000
  release: 0, //0 to 3000
  ratio: 4, //1 to 20
  knee: 5, //0 to 40
  automakeup: false, //true/false
  bypass: false,
};

export const defaultDelaySettings = {
  feedback: 0.45, //0 to 1+
  delayTime: 150, //1 to 10000 milliseconds
  wetLevel: 0.25, //0 to 1+
  dryLevel: 1, //0 to 1+
  cutoff: 2000, //cutoff frequency of the built in lowpass-filter. 20 to 22050
  bypass: false,
};

export const defaultFilterSettings = {
  frequency: 2000, //20 to 22050
  Q: 1, //0.001 to 100
  gain: 0, //-40 to 40 (in decibels)
  filterType: 'highpass', //lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass
  bypass: false,
};

export const defaultMoogSettings = {
  cutoff: 0.45, //0 to 1
  resonance: 2.5, //0 to 4
  bufferSize: 4096, //256 to 16384,
  bypass: false,
};

export const defaultOverdriveSettings = {
  outputGain: -10, //-42 to 0 in dB
  drive: 1, //0 to 1
  curveAmount: 1, //0 to 1
  algorithmIndex: 5, //0 to 5, selects one of our drive algorithms
  bypass: false,
};

export const defaultPannerSettings = {
  pan: 0, // -1 (left) to 1 (right)
  bypass: false,
};

export const defaultPhaserSettings = {
  rate: 1.2, //0.01 to 8 is a decent range, but higher values are possible
  depth: 0.3, //0 to 1
  feedback: 0.2, //0 to 1+
  stereoPhase: 0, //0 to 180
  baseModulationFrequency: 700, //500 to 1500
  bypass: false,
};

export const defaultPingPongDelaySettings = {
  wetLevel: 0.5, //0 to 1
  feedback: 0.3, //0 to 1
  delayTimeLeft: 150, //1 to 10000 (milliseconds)
  delayTimeRight: 200, //1 to 10000 (milliseconds)
  bypass: false,
};

export const defaultReverbSettings = {
  highCut: 22050, //20 to 22050
  lowCut: 20, //20 to 22050
  dryLevel: 1, //0 to 1+
  wetLevel: 1, //0 to 1+
  level: 1, //0 to 1+, adjusts total output of both wet and dry
  impulse: 'reverb/garage.wav', //the path to your impulse response
  bypass: false,
};

export const defaultTremoloSettings = {
  intensity: 0.3, //0 to 1
  rate: 4, //0.001 to 8
  stereoPhase: 0, //0 to 180
  bypass: false,
};

export const defaultWahWahSettings = {
  automode: false, //true/false
  baseFrequency: 0.5, //0 to 1
  excursionOctaves: 2, //1 to 6
  sweep: 0.2, //0 to 1
  resonance: 10, //1 to 100
  sensitivity: 0.5, //-1 to 1
  bypass: false,
};
