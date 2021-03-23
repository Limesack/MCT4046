const synth = new Tone.MonoSynth({
	oscillator: {
		type: "sawtooth",
	},
	envelope: {
    attack: 0.005,
    decay: 0.1,
    release: 1,
    sustain: 0.9,
	},
	filter: {
    Q: 1,
    rolloff: -12,
    type: "lowpass",
	},
  filterEnvelope: {
    attack: 0.6,
    baseFrequency: 200,
    decay: 0.2,
    exponent: 2,
    octaves: 3,
    release: 2,
    sustain: 0.5,
  }
}).connect(autoFilter1);
