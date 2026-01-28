/**
 * TextToSpeech - Text to speech using Web Speech API
 */
export class TextToSpeech {
  constructor(options = {}) {
    this.options = {
      rate: options.rate || 1.0,
      pitch: options.pitch || 1.0,
      volume: options.volume || 1.0,
      language: options.language || 'en-US',
      ...options,
    };

    this.synth = window.speechSynthesis;
    this.voices = [];
    this.currentUtterance = null;

    this.onStart = null;
    this.onEnd = null;
    this.onError = null;

    this.loadVoices();
  }

  static isSupported() {
    return 'speechSynthesis' in window;
  }

  loadVoices() {
    return new Promise((resolve) => {
      const load = () => {
        this.voices = this.synth.getVoices();
        resolve(this.voices);
      };

      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = load;
      }
      load();
    });
  }

  getVoices() {
    return this.voices;
  }

  getVoicesByLanguage(language) {
    return this.voices.filter((v) => v.lang.startsWith(language.split('-')[0]));
  }

  speak(text, options = {}) {
    if (!TextToSpeech.isSupported()) {
      if (this.onError) {
        this.onError({ code: 'NOT_SUPPORTED', message: 'Text-to-speech not supported' });
      }
      return false;
    }

    if (!text || text.trim() === '') {
      return false;
    }

    const mergedOptions = { ...this.options, ...options };
    const utterance = new SpeechSynthesisUtterance(text);

    if (mergedOptions.voice) {
      utterance.voice = mergedOptions.voice;
    } else {
      const langVoice = this.getVoicesByLanguage(mergedOptions.language)[0];
      if (langVoice) utterance.voice = langVoice;
    }

    utterance.rate = Math.max(0.1, Math.min(10, mergedOptions.rate));
    utterance.pitch = Math.max(0, Math.min(2, mergedOptions.pitch));
    utterance.volume = Math.max(0, Math.min(1, mergedOptions.volume));
    utterance.lang = mergedOptions.language;

    utterance.onstart = () => {
      this.currentUtterance = utterance;
      if (this.onStart) this.onStart({ text });
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      if (this.onEnd) this.onEnd({ text });
    };

    utterance.onerror = (event) => {
      this.currentUtterance = null;
      if (this.onError) {
        this.onError({ code: event.error, message: `Speech error: ${event.error}` });
      }
    };

    this.synth.cancel();
    this.synth.speak(utterance);
    return true;
  }

  pause() {
    this.synth.pause();
  }

  resume() {
    this.synth.resume();
  }

  cancel() {
    this.synth.cancel();
    this.currentUtterance = null;
  }

  get speaking() {
    return this.synth.speaking;
  }

  setRate(rate) {
    this.options.rate = Math.max(0.1, Math.min(10, rate));
  }

  setPitch(pitch) {
    this.options.pitch = Math.max(0, Math.min(2, pitch));
  }

  setVolume(volume) {
    this.options.volume = Math.max(0, Math.min(1, volume));
  }

  destroy() {
    this.cancel();
  }
}