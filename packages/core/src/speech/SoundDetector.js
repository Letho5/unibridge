/**
 * SoundDetector - Detects ambient sounds like doorbells, alarms, etc.
 */
export class SoundDetector {
  constructor(options = {}) {
    this.options = {
      fftSize: options.fftSize || 2048,
      volumeThreshold: options.volumeThreshold || 30,
      ...options,
    };

    this.audioContext = null;
    this.analyser = null;
    this.microphone = null;
    this.dataArray = null;
    this.isListening = false;
    this.animationFrame = null;

    this.onSoundDetected = null;
    this.onVolumeChange = null;
    this.onError = null;

    this.soundPatterns = {
      doorbell: { name: 'Doorbell', icon: '🔔', frequencyRange: [800, 1200] },
      alarm: { name: 'Alarm', icon: '🚨', frequencyRange: [1000, 4000] },
      phone: { name: 'Phone', icon: '📱', frequencyRange: [400, 2000] },
      knock: { name: 'Knock', icon: '🚪', frequencyRange: [100, 500] },
    };

    this.lastAlertTime = {};
    this.alertCooldown = 3000;
  }

  async start() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false },
      });

      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = this.options.fftSize;

      this.microphone = this.audioContext.createMediaStreamSource(stream);
      this.microphone.connect(this.analyser);

      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

      this.isListening = true;
      this.analyze();

      return true;
    } catch (error) {
      if (this.onError) {
        this.onError({ code: 'MIC_ERROR', message: 'Failed to access microphone' });
      }
      return false;
    }
  }

  analyze() {
    if (!this.isListening) return;

    this.analyser.getByteFrequencyData(this.dataArray);

    const volume = this.calculateVolume();

    if (this.onVolumeChange) {
      this.onVolumeChange(volume);
    }

    if (volume > this.options.volumeThreshold) {
      this.detectSounds();
    }

    this.animationFrame = requestAnimationFrame(() => this.analyze());
  }

  calculateVolume() {
    let sum = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      sum += this.dataArray[i];
    }
    return (sum / this.dataArray.length / 255) * 100;
  }

  detectSounds() {
    const now = Date.now();
    const dominantFreq = this.getDominantFrequency();

    for (const [type, pattern] of Object.entries(this.soundPatterns)) {
      const [minFreq, maxFreq] = pattern.frequencyRange;

      if (dominantFreq >= minFreq && dominantFreq <= maxFreq) {
        if (!this.lastAlertTime[type] || now - this.lastAlertTime[type] > this.alertCooldown) {
          this.lastAlertTime[type] = now;

          if (this.onSoundDetected) {
            this.onSoundDetected({
              type,
              name: pattern.name,
              icon: pattern.icon,
              timestamp: now,
            });
          }
        }
      }
    }
  }

  getDominantFrequency() {
    let maxIndex = 0;
    let maxValue = 0;

    for (let i = 0; i < this.dataArray.length; i++) {
      if (this.dataArray[i] > maxValue) {
        maxValue = this.dataArray[i];
        maxIndex = i;
      }
    }

    const sampleRate = this.audioContext.sampleRate;
    return (maxIndex * sampleRate) / (2 * this.dataArray.length);
  }

  stop() {
    this.isListening = false;

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    if (this.microphone) {
      this.microphone.disconnect();
    }

    if (this.audioContext) {
      this.audioContext.close();
    }
  }

  destroy() {
    this.stop();
    this.onSoundDetected = null;
    this.onVolumeChange = null;
    this.onError = null;
  }
}