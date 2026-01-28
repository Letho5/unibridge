/**
 * SignRecognizer - Recognizes ASL signs from hand tracking data
 */
export class SignRecognizer {
  constructor(options = {}) {
    this.options = {
      language: options.language || 'ASL',
      confidenceThreshold: options.confidenceThreshold || 0.75,
      stabilizationFrames: options.stabilizationFrames || 5,
      ...options,
    };

    this.recentPredictions = [];
    this.lastRecognizedSign = null;
    this.onRecognition = null;

    this.ASL_ALPHABET = {
      A: { thumb: true, index: false, middle: false, ring: false, pinky: false },
      B: { thumb: false, index: true, middle: true, ring: true, pinky: true },
      C: { thumb: true, index: true, middle: true, ring: true, pinky: true },
      D: { thumb: true, index: true, middle: false, ring: false, pinky: false },
      E: { thumb: false, index: false, middle: false, ring: false, pinky: false },
      F: { thumb: true, index: false, middle: true, ring: true, pinky: true },
      I: { thumb: false, index: false, middle: false, ring: false, pinky: true },
      L: { thumb: true, index: true, middle: false, ring: false, pinky: false },
      O: { thumb: true, index: true, middle: true, ring: true, pinky: true },
      U: { thumb: false, index: true, middle: true, ring: false, pinky: false },
      V: { thumb: false, index: true, middle: true, ring: false, pinky: false },
      W: { thumb: false, index: true, middle: true, ring: true, pinky: false },
      Y: { thumb: true, index: false, middle: false, ring: false, pinky: true },
    };
  }

  recognize(handData) {
    if (!handData || handData.handsDetected === 0) {
      return null;
    }

    const hand = handData.hands[0];
    const fingerStates = hand.fingerStates;

    const matches = this.findMatches(fingerStates);

    if (matches.length === 0) {
      return null;
    }

    const bestMatch = matches[0];

    this.recentPredictions.push(bestMatch);
    if (this.recentPredictions.length > this.options.stabilizationFrames) {
      this.recentPredictions.shift();
    }

    const stablePrediction = this.getStablePrediction();

    if (stablePrediction && stablePrediction.confidence >= this.options.confidenceThreshold) {
      if (stablePrediction.sign !== this.lastRecognizedSign) {
        this.lastRecognizedSign = stablePrediction.sign;

        if (this.onRecognition) {
          this.onRecognition({
            sign: stablePrediction.sign,
            confidence: stablePrediction.confidence,
            language: this.options.language,
            timestamp: Date.now(),
          });
        }

        return stablePrediction;
      }
    }

    return null;
  }

  findMatches(fingerStates) {
    const matches = [];

    for (const [letter, expected] of Object.entries(this.ASL_ALPHABET)) {
      const confidence = this.calculateConfidence(fingerStates, expected);

      if (confidence > 0.6) {
        matches.push({ sign: letter, confidence });
      }
    }

    matches.sort((a, b) => b.confidence - a.confidence);
    return matches;
  }

  calculateConfidence(detected, expected) {
    let matches = 0;
    let total = 0;

    for (const finger of Object.keys(expected)) {
      total++;
      if (detected[finger] === expected[finger]) {
        matches++;
      }
    }

    return total > 0 ? matches / total : 0;
  }

  getStablePrediction() {
    if (this.recentPredictions.length < this.options.stabilizationFrames) {
      return null;
    }

    const counts = {};
    for (const pred of this.recentPredictions) {
      const key = pred.sign;
      if (!counts[key]) {
        counts[key] = { count: 0, totalConfidence: 0, prediction: pred };
      }
      counts[key].count++;
      counts[key].totalConfidence += pred.confidence;
    }

    let best = null;
    let bestCount = 0;

    for (const data of Object.values(counts)) {
      if (data.count > bestCount) {
        bestCount = data.count;
        best = {
          ...data.prediction,
          confidence: data.totalConfidence / data.count,
        };
      }
    }

    if (bestCount >= this.options.stabilizationFrames * 0.6) {
      return best;
    }

    return null;
  }

  reset() {
    this.recentPredictions = [];
    this.lastRecognizedSign = null;
  }

  setLanguage(language) {
    this.options.language = language;
    this.reset();
  }
}