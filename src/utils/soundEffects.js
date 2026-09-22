// Web Audio API generator for authentic Kerala Temple Bell and sacred soundscapes
let audioCtx = null;
let droneOscillators = [];
let droneGain = null;
let isDroneActive = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Rings an authentic Kerala bronze temple bell (മണിനാദം)
 * Uses physical partial harmonics of heavy cast bronze bell:
 * Hum tone, fundamental, minor third, fifth, octave, and higher overtone shimmer.
 */
export function playTempleBell(pitch = 1.0) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);
  masterGain.gain.setValueAtTime(0.5, now);

  // Bell partial ratios typical of bronze temple bells
  const partials = [
    { freqMult: 0.5, gain: 0.35, decay: 4.0 },   // Hum tone
    { freqMult: 1.0, gain: 0.70, decay: 3.5 },   // Prime / Fundamental
    { freqMult: 1.19, gain: 0.50, decay: 2.8 },  // Tierce (minor 3rd)
    { freqMult: 1.5, gain: 0.35, decay: 2.5 },   // Quint (fifth)
    { freqMult: 2.0, gain: 0.40, decay: 2.0 },   // Nominal (octave)
    { freqMult: 2.76, gain: 0.25, decay: 1.4 },  // Decime
    { freqMult: 3.5, gain: 0.15, decay: 1.0 }    // Shimmer overtone
  ];

  const baseFreq = 540 * pitch; // Resonant bronze bell pitch (~C#5 / D5)

  // Metallic strike click (hammer impact)
  const strikeOsc = ctx.createOscillator();
  const strikeGain = ctx.createGain();
  strikeOsc.type = 'triangle';
  strikeOsc.frequency.setValueAtTime(1400, now);
  strikeGain.gain.setValueAtTime(0.4, now);
  strikeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  strikeOsc.connect(strikeGain);
  strikeGain.connect(masterGain);
  strikeOsc.start(now);
  strikeOsc.stop(now + 0.1);

  // Partial harmonic generators
  partials.forEach((p) => {
    const osc = ctx.createOscillator();
    const pGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq * p.freqMult, now);

    // Initial strike attack and smooth exponential decay
    pGain.gain.setValueAtTime(0.001, now);
    pGain.gain.linearRampToValueAtTime(p.gain, now + 0.015);
    pGain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

    osc.connect(pGain);
    pGain.connect(masterGain);

    osc.start(now);
    osc.stop(now + p.decay + 0.1);
  });
}

/**
 * Sacred Conch (ശംഖ്) resonance simulation
 */
export function playConch() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(330, now + 1.2);
  osc.frequency.exponentialRampToValueAtTime(293, now + 3.0);

  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(450, now);
  filter.Q.setValueAtTime(3.5, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.25, now + 0.8);
  gain.gain.setValueAtTime(0.25, now + 2.4);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 3.6);
}

/**
 * Toggles background meditative Tanpura / Temple Drone soundscape
 */
export function toggleTempleDrone(onStateChange) {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (isDroneActive) {
    // Stop drone
    if (droneGain) {
      droneGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      setTimeout(() => {
        droneOscillators.forEach(osc => {
          try { osc.stop(); } catch(e) {}
        });
        droneOscillators = [];
        droneGain = null;
        isDroneActive = false;
        if (onStateChange) onStateChange(false);
      }, 1300);
    }
    return false;
  } else {
    // Start drone
    const now = ctx.currentTime;
    droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.001, now);
    droneGain.gain.linearRampToValueAtTime(0.12, now + 2.0); // Gentle background volume
    droneGain.connect(ctx.destination);

    // Sacred Tanpura fundamental frequencies: Sa (136.1 Hz - Cosmic Om frequency), Pa (204.1 Hz)
    const freqs = [136.1, 136.5, 204.1, 272.2];
    droneOscillators = freqs.map((f) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);
      osc.connect(droneGain);
      osc.start(now);
      return osc;
    });

    isDroneActive = true;
    if (onStateChange) onStateChange(true);
    return true;
  }
}
