/**
 * HandTracker - Real-time hand detection using MediaPipe
 */
export class HandTracker {
  constructor(options = {}) {
    this.options = {
      maxHands: options.maxHands || 2,
      minDetectionConfidence: options.minDetectionConfidence || 0.7,
      minTrackingConfidence: options.minTrackingConfidence || 0.5,
      ...options,
    };

    this.hands = null;
    this.videoElement = null;
    this.canvasElement = null;
    this.canvasCtx = null;
    this.isRunning = false;
    this.onResults = null;
    this.onError = null;

    this.LANDMARKS = {
      WRIST: 0,
      THUMB_TIP: 4,
      INDEX_TIP: 8,
      MIDDLE_TIP: 12,
      RING_TIP: 16,
      PINKY_TIP: 20,
    };
  }

  async initialize() {
    try {
      const { Hands } = await import('@mediapipe/hands');

      this.hands = new Hands({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        },
      });

      this.hands.setOptions({
        maxNumHands: this.options.maxHands,
        modelComplexity: 1,
        minDetectionConfidence: this.options.minDetectionConfidence,
        minTrackingConfidence: this.options.minTrackingConfidence,
      });

      this.hands.onResults((results) => this.handleResults(results));
      return true;
    } catch (error) {
      console.error('Failed to initialize HandTracker:', error);
      if (this.onError) {
        this.onError({
          code: 'INIT_FAILED',
          message: 'Failed to initialize hand tracking',
        });
      }
      return false;
    }
  }

  async start(videoElement, canvasElement = null) {
    if (!this.hands) {
      const initialized = await this.initialize();
      if (!initialized) return false;
    }

    this.videoElement = videoElement;
    this.canvasElement = canvasElement;

    if (canvasElement) {
      this.canvasCtx = canvasElement.getContext('2d');
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: 'user' },
      });

      this.videoElement.srcObject = stream;
      await this.videoElement.play();

      this.isRunning = true;
      this.processFrame();
      return true;
    } catch (error) {
      console.error('Failed to start camera:', error);
      if (this.onError) {
        this.onError({
          code: 'CAMERA_ERROR',
          message: this.getCameraErrorMessage(error),
        });
      }
      return false;
    }
  }

  getCameraErrorMessage(error) {
    if (error.name === 'NotAllowedError') {
      return 'Camera access denied. Please allow camera access.';
    }
    if (error.name === 'NotFoundError') {
      return 'No camera found. Please connect a camera.';
    }
    return 'Failed to access camera.';
  }

  async processFrame() {
    if (!this.isRunning || !this.videoElement) return;

    try {
      await this.hands.send({ image: this.videoElement });
    } catch (error) {
      console.error('Frame processing error:', error);
    }

    requestAnimationFrame(() => this.processFrame());
  }

  handleResults(results) {
    if (this.canvasCtx && this.canvasElement) {
      this.drawResults(results);
    }

    if (this.onResults) {
      const processed = {
        timestamp: Date.now(),
        handsDetected: results.multiHandLandmarks?.length || 0,
        hands: [],
      };

      if (results.multiHandLandmarks && results.multiHandedness) {
        for (let i = 0; i < results.multiHandLandmarks.length; i++) {
          const landmarks = results.multiHandLandmarks[i];
          const handedness = results.multiHandedness[i];

          processed.hands.push({
            label: handedness.label,
            confidence: handedness.score,
            landmarks: landmarks,
            fingerStates: this.getFingerStates(landmarks),
          });
        }
      }

      this.onResults(processed);
    }
  }

  getFingerStates(landmarks) {
    const dominated = landmarks[this.LANDMARKS.WRIST].y;

    return {
      thumb: landmarks[this.LANDMARKS.THUMB_TIP].x < landmarks[this.LANDMARKS.WRIST].x,
      index: landmarks[this.LANDMARKS.INDEX_TIP].y < dominated,
      middle: landmarks[this.LANDMARKS.MIDDLE_TIP].y < dominated,
      ring: landmarks[this.LANDMARKS.RING_TIP].y < dominated,
      pinky: landmarks[this.LANDMARKS.PINKY_TIP].y < dominated,
    };
  }

  drawResults(results) {
    const ctx = this.canvasCtx;
    const canvas = this.canvasElement;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.videoElement, 0, 0, canvas.width, canvas.height);

    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        for (let i = 0; i < landmarks.length; i++) {
          const lm = landmarks[i];
          const x = lm.x * canvas.width;
          const y = lm.y * canvas.height;

          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fillStyle = '#6366F1';
          ctx.fill();
        }
      }
    }

    ctx.restore();
  }

  stop() {
    this.isRunning = false;

    if (this.videoElement && this.videoElement.srcObject) {
      const tracks = this.videoElement.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      this.videoElement.srcObject = null;
    }
  }

  destroy() {
    this.stop();
    this.hands = null;
    this.onResults = null;
    this.onError = null;
  }
}