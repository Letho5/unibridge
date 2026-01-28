/**
 * SpeechToText - Real-time speech recognition using Web Speech API
 */
export class SpeechToText {
  constructor(options = {}) {
    this.options = {
      language: options.language || 'en-US',
      continuous: options.continuous !== false,
      interimResults: options.interimResults !== false,
      ...options,
    };

    this.recognition = null;
    this.isListening = false;
    this.transcript = '';

    this.onResult = null;
    this.onInterim = null;
    this.onError = null;
    this.onStart = null;
    this.onEnd = null;

    this.initialize();
  }

  static isSupported() {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  }

  initialize() {
    if (!SpeechToText.isSupported()) {
      console.warn('Speech recognition not supported');
      return false;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    this.recognition.continuous = this.options.continuous;
    this.recognition.interimResults = this.options.interimResults;
    this.recognition.lang = this.options.language;

    this.recognition.onresult = (event) => this.handleResult(event);
    this.recognition.onerror = (event) => this.handleError(event);
    this.recognition.onstart = () => {
      this.isListening = true;
      if (this.onStart) this.onStart();
    };
    this.recognition.onend = () => {
      this.isListening = false;
      if (this.onEnd) this.onEnd();
    };

    return true;
  }

  async start() {
    if (!this.recognition) {
      if (!this.initialize()) {
        if (this.onError) {
          this.onError({ code: 'NOT_SUPPORTED', message: 'Speech recognition not supported' });
        }
        return false;
      }
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      this.recognition.start();
      return true;
    } catch (error) {
      if (this.onError) {
        this.onError({ code: 'MIC_DENIED', message: 'Microphone access denied' });
      }
      return false;
    }
  }

  stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }

  handleResult(event) {
    let finalTranscript = '';
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      const transcript = result[0].transcript;

      if (result.isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }

    if (finalTranscript && this.onResult) {
      this.transcript += finalTranscript;
      this.onResult({
        transcript: finalTranscript,
        fullTranscript: this.transcript,
        confidence: event.results[event.results.length - 1][0].confidence,
        isFinal: true,
        timestamp: Date.now(),
      });
    }

    if (interimTranscript && this.onInterim) {
      this.onInterim({
        transcript: interimTranscript,
        isFinal: false,
        timestamp: Date.now(),
      });
    }
  }

  handleError(event) {
    const messages = {
      'no-speech': "I didn't hear anything. Please speak again.",
      'audio-capture': 'No microphone found.',
      'not-allowed': 'Microphone access denied.',
      'network': 'Network error occurred.',
    };

    if (this.onError) {
      this.onError({
        code: event.error,
        message: messages[event.error] || `Error: ${event.error}`,
      });
    }
  }

  clearTranscript() {
    this.transcript = '';
  }

  setLanguage(language) {
    this.options.language = language;
    if (this.recognition) {
      this.recognition.lang = language;
    }
  }

  destroy() {
    this.stop();
    this.recognition = null;
  }
}