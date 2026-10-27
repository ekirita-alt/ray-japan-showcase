/**
 * Futuristic Audio Engine for RAY Medical Presentation
 * Theme: "Bright, Systematic & Innovative Future" (明るく革新的な未来のテクノロジー)
 * Key: E Major (Uplifting, Inspiring, High-Tech Clarity) / 112 BPM
 * Features:
 *   - Glassy crystal FM chimes / 16th-note systematic arpeggio
 *   - Bright uplifting horizon chord pads (Emaj9 -> Aadd9 -> C#m9 -> Badd9)
 *   - Forward-driving systematic 8th-note synth bass pulse
 *   - Modern crisp electronic tech rhythm
 */

export class FuturisticAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isRunning: boolean = false;
  private timerId: any = null;
  private currentStep: number = 0;
  private isMuted: boolean = true;

  // 112 BPM -> 16th note = (60 / 112 / 4) * 1000 = ~133.93 ms
  private tempo: number = 112;
  private stepIntervalMs: number = (60 / 112 / 4) * 1000;

  // Bright, uplifting, forward-looking Major chords (4 bars, 16 steps each = 64 steps total)
  // Progression: Emaj9 -> Aadd9 -> C#m9 -> Badd9
  private chords = [
    // Bar 1: Emaj9 (Bright, expansive, cutting-edge clarity)
    {
      bass: 82.41 /* E2 */,
      padNotes: [207.65 /* G#3 */, 246.94 /* B3 */, 329.63 /* E4 */, 415.30 /* G#4 */, 493.88 /* B4 */],
      arpNotes: [329.63 /* E4 */, 415.30 /* G#4 */, 493.88 /* B4 */, 622.25 /* D#5 */, 739.99 /* F#5 */, 830.61 /* G#5 */, 987.77 /* B5 */]
    },
    // Bar 2: Aadd9 (Uplifting horizon, emotional breakthrough)
    {
      bass: 110.00 /* A2 */,
      padNotes: [220.00 /* A3 */, 277.18 /* C#4 */, 329.63 /* E4 */, 440.00 /* A4 */, 493.88 /* B4 */],
      arpNotes: [277.18 /* C#4 */, 329.63 /* E4 */, 440.00 /* A4 */, 493.88 /* B4 */, 554.37 /* C#5 */, 659.25 /* E5 */, 880.00 /* A5 */]
    },
    // Bar 3: C#m9 (Systematic precision, dynamic momentum)
    {
      bass: 69.30 /* C#2 */,
      padNotes: [207.65 /* G#3 */, 246.94 /* B3 */, 277.18 /* C#4 */, 329.63 /* E4 */, 415.30 /* G#4 */],
      arpNotes: [277.18 /* C#4 */, 329.63 /* E4 */, 415.30 /* G#4 */, 493.88 /* B4 */, 622.25 /* D#5 */, 659.25 /* E5 */, 830.61 /* G#5 */]
    },
    // Bar 4: Badd9 / Bsus4 (Triumphant, optimistic future resolution)
    {
      bass: 123.47 /* B2 */,
      padNotes: [185.00 /* F#3 */, 246.94 /* B3 */, 311.13 /* D#4 */, 369.99 /* F#4 */, 493.88 /* B4 */],
      arpNotes: [311.13 /* D#4 */, 369.99 /* F#4 */, 493.88 /* B4 */, 554.37 /* C#5 */, 622.25 /* D#5 */, 739.99 /* F#5 */, 987.77 /* B5 */]
    }
  ];

  // Sparkling systematic 16th-note arpeggiator motif
  private arpSequence = [0, 2, 4, 3, 5, 4, 2, 6, 1, 3, 5, 4, 2, 4, 6, 5];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public start() {
    this.initContext();
    if (this.isRunning) return;
    this.isRunning = true;
    this.isMuted = false;

    // Smooth fade in
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.28, now + 1.0);
    }

    this.timerId = setInterval(() => {
      this.tick();
    }, this.stepIntervalMs);
  }

  public pause() {
    if (!this.isRunning) return;
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
    }
    setTimeout(() => {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
      this.isRunning = false;
    }, 550);
  }

  public mute() {
    this.isMuted = true;
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.35);
    }
  }

  public unmute() {
    this.isMuted = false;
    if (!this.isRunning) {
      this.start();
    } else if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.28, now + 0.6);
    }
  }

  public getIsPlaying(): boolean {
    return this.isRunning && !this.isMuted;
  }

  private tick() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const barIndex = Math.floor((this.currentStep % 64) / 16);
    const stepInBar = this.currentStep % 16;
    const chord = this.chords[barIndex];
    const stepDuration = this.stepIntervalMs / 1000;

    // 1. Bright Uplifting Pad (triggered at start of bar, sustained with slow gentle release)
    if (stepInBar === 0) {
      this.playBrightHorizonPad(chord.padNotes, now, 16 * stepDuration);
    }

    // 2. Systematic Driving 8th-note Bass Pulse (steps 0, 2, 4, 6, 8, 10, 12, 14)
    if (stepInBar % 2 === 0) {
      const isAccent = stepInBar === 0 || stepInBar === 8;
      this.playDrivingBass(chord.bass, now, stepDuration * 1.8, isAccent);
    }

    // 3. Sparkling Crystal Arpeggio (Every 16th note, glassy high-tech timbre)
    const arpIdx = this.arpSequence[stepInBar % this.arpSequence.length];
    const arpFreq = chord.arpNotes[arpIdx % chord.arpNotes.length];
    this.playCrystalChime(arpFreq, now, stepDuration * 2.2);

    // 4. Subtle Systematic Digital Rhythm
    // Crisp punchy electronic kick on steps 0, 6, 10
    if (stepInBar === 0 || stepInBar === 6 || stepInBar === 10) {
      this.playCleanKick(now);
    }

    // Modern digital snap / clap on steps 4, 12
    if (stepInBar === 4 || stepInBar === 12) {
      this.playDigitalSnare(now);
    }

    // Hi-tech quantized digital shaker/tick on every 16th note (varied velocity)
    const tickVol = stepInBar % 4 === 2 ? 0.06 : (stepInBar % 2 === 1 ? 0.04 : 0.02);
    this.playHighTechTick(now, tickVol);

    this.currentStep = (this.currentStep + 1) % 64;
  }

  // --- INSTRUMENT SYNTHESIS: BRIGHT & SYSTEMATIC ---

  /**
   * 1. Bright Horizon Pad (Lush, uplifting, airy Major harmonics)
   */
  private playBrightHorizonPad(notes: number[], time: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    const padGain = this.ctx.createGain();
    const padFilter = this.ctx.createBiquadFilter();

    // High, open cutoff for a bright, sunny future tone
    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(1400, time);
    padFilter.frequency.exponentialRampToValueAtTime(2800, time + duration * 0.4);
    padFilter.frequency.exponentialRampToValueAtTime(1600, time + duration);
    padFilter.Q.setValueAtTime(1.0, time);

    padGain.gain.setValueAtTime(0.001, time);
    padGain.gain.linearRampToValueAtTime(0.14, time + 0.8);
    padGain.gain.setValueAtTime(0.14, time + duration - 0.6);
    padGain.gain.linearRampToValueAtTime(0.001, time + duration);

    padFilter.connect(padGain);
    padGain.connect(this.masterGain);

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      // Pair of warm sine + detuned soft sawtooth
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(freq, time);
      osc2.frequency.setValueAtTime(freq * 1.004, time); // uplifting stereo detuning

      osc1.connect(padFilter);
      osc2.connect(padFilter);

      osc1.start(time);
      osc2.start(time);
      osc1.stop(time + duration + 0.1);
      osc2.stop(time + duration + 0.1);
    });
  }

  /**
   * 2. Driving Systematic 8th-note Bass
   * Punchy, round, forward-moving technological pulse
   */
  private playDrivingBass(freq: number, time: number, duration: number, isAccent: boolean) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    subOsc.type = 'sine';

    osc.frequency.setValueAtTime(freq, time);
    subOsc.frequency.setValueAtTime(freq * 0.5, time); // solid sub foundation

    // Snappy envelope filter for a systematic electronic pluck
    filter.type = 'lowpass';
    const baseFreq = isAccent ? 450 : 320;
    filter.frequency.setValueAtTime(baseFreq * 2.2, time);
    filter.frequency.exponentialRampToValueAtTime(baseFreq, time + 0.12);
    filter.Q.setValueAtTime(3.0, time);

    const peakGain = isAccent ? 0.32 : 0.22;
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(peakGain, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    subOsc.start(time);
    osc.stop(time + duration + 0.05);
    subOsc.stop(time + duration + 0.05);
  }

  /**
   * 3. Glassy Crystal FM Chime / Arpeggio
   * Pristine, bright, innovative bell/glass timbre like modern Apple/AI keynote tech
   */
  private playCrystalChime(freq: number, time: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    // Carrier oscillator (Sine)
    const carrier = this.ctx.createOscillator();
    const carrierGain = this.ctx.createGain();

    // Modulator oscillator (creates glassy bell harmonics)
    const modulator = this.ctx.createOscillator();
    const modGain = this.ctx.createGain();

    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(freq, time);

    modulator.type = 'sine';
    modulator.frequency.setValueAtTime(freq * 2.005, time); // 2:1 ratio for bright glass chime

    // FM index envelope
    modGain.gain.setValueAtTime(freq * 1.5, time);
    modGain.gain.exponentialRampToValueAtTime(0.1, time + duration * 0.7);

    modulator.connect(carrier.frequency);

    // Filter to emphasize bright high-mid sheen
    const chimeFilter = this.ctx.createBiquadFilter();
    chimeFilter.type = 'bandpass';
    chimeFilter.frequency.setValueAtTime(freq * 1.2, time);
    chimeFilter.Q.setValueAtTime(2.2, time);

    carrierGain.gain.setValueAtTime(0.001, time);
    carrierGain.gain.linearRampToValueAtTime(0.16, time + 0.008);
    carrierGain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    carrier.connect(chimeFilter);
    chimeFilter.connect(carrierGain);
    carrierGain.connect(this.masterGain);

    modulator.start(time);
    carrier.start(time);
    modulator.stop(time + duration + 0.05);
    carrier.stop(time + duration + 0.05);
  }

  /**
   * 4. Modern Clean Kick
   * Tight, energetic, non-muddy punch
   */
  private playCleanKick(time: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(52, time + 0.09);

    gain.gain.setValueAtTime(0.28, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.16);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.18);
  }

  /**
   * 5. Digital Snare / Crisp Snap
   */
  private playDigitalSnare(time: number) {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = Math.floor(this.ctx.sampleRate * 0.12);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.14, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.11);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
  }

  /**
   * 6. High-Tech Precision Tick / Shaker
   */
  private playHighTechTick(time: number, vol: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(7800, time);

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(6500, time);

    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.035);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.04);
  }
}

// Global singleton instance
export const bgmEngine = new FuturisticAudioEngine();
