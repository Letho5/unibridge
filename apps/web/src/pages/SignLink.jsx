/* ============================================================
   🌉 UNIBRIDGE - SIGNLINK
   Working ASL Recognition with TensorFlow.js
   ============================================================ */

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as tf from '@tensorflow/tfjs';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';

/* ============================================
   🎨 ICONS
   ============================================ */

const Icons = {
  Hand: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  ),
  Camera: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  CameraOff: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="2" x2="22" y1="2" y2="22" />
      <path d="M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" />
      <path d="M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" />
    </svg>
  ),
  Upload: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  ),
  Copy: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="14" height="14" x="8" y="8" rx="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  ),
  Trash2: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  ),
  Volume2: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  ),
  AlertCircle: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  ),
  Info: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),
  Loader: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" x2="12" y1="2" y2="6" />
      <line x1="12" x2="12" y1="18" y2="22" />
      <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
      <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
      <line x1="2" x2="6" y1="12" y2="12" />
      <line x1="18" x2="22" y1="12" y2="12" />
      <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
      <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
    </svg>
  ),
  Check: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  X: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
  Sparkles: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
  Zap: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Play: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  RotateCcw: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  ),
};

/* ============================================
   🤖 ASL GESTURE RECOGNITION
   ============================================ */

// Finger indices for hand landmark detection
const FINGER_INDICES = {
  thumb: [0, 1, 2, 3, 4],
  index: [0, 5, 6, 7, 8],
  middle: [0, 9, 10, 11, 12],
  ring: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

// Check if a specific finger is extended
const isFingerExtended = (landmarks, finger) => {
  if (!landmarks || landmarks.length < 21) return false;
  
  const indices = FINGER_INDICES[finger];
  
  if (finger === 'thumb') {
    // Thumb: check if tip is far from base horizontally
    return Math.abs(landmarks[4].x - landmarks[2].x) > 0.05;
  }
  
  // Other fingers: check if tip is above PIP joint (lower y = higher on screen)
  const tipY = landmarks[indices[4]].y;
  const pipY = landmarks[indices[2]].y;
  return tipY < pipY;
};

// Get the state of all fingers (extended or not)
const getFingerStates = (landmarks) => {
  if (!landmarks || landmarks.length < 21) {
    return { thumb: false, index: false, middle: false, ring: false, pinky: false };
  }
  
  return {
    thumb: isFingerExtended(landmarks, 'thumb'),
    index: isFingerExtended(landmarks, 'index'),
    middle: isFingerExtended(landmarks, 'middle'),
    ring: isFingerExtended(landmarks, 'ring'),
    pinky: isFingerExtended(landmarks, 'pinky'),
  };
};

// Calculate Euclidean distance between two points
const distance = (p1, p2) => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

// Main ASL letter recognition function
const recognizeGesture = (landmarks) => {
  if (!landmarks || landmarks.length < 21) return null;
  
  const fingers = getFingerStates(landmarks);
  const { thumb, index, middle, ring, pinky } = fingers;
  
  // Calculate additional geometric features
  const thumbIndexDist = distance(landmarks[4], landmarks[8]);
  const indexMiddleDist = distance(landmarks[8], landmarks[12]);
  const allFingersTogether = indexMiddleDist < 0.08;
  
  // Count total extended fingers
  const extendedCount = [thumb, index, middle, ring, pinky].filter(Boolean).length;
  
  // ===== ASL Letter Recognition Rules =====
  
  // A - Fist with thumb to side
  if (!index && !middle && !ring && !pinky && thumb) {
    return { letter: 'A', confidence: 88, description: 'Fist with thumb beside' };
  }
  
  // B - All fingers up, thumb tucked
  if (index && middle && ring && pinky && !thumb) {
    return { letter: 'B', confidence: 90, description: 'Flat hand, fingers together' };
  }
  
  // C - Curved hand shape
  if (extendedCount === 0 && thumbIndexDist > 0.1 && thumbIndexDist < 0.2) {
    return { letter: 'C', confidence: 70, description: 'Curved hand shape' };
  }
  
  // D - Index up, others down
  if (index && !middle && !ring && !pinky && !thumb) {
    return { letter: 'D', confidence: 85, description: 'Index finger pointing up' };
  }
  
  // E - All fingers curled into palm
  if (!index && !middle && !ring && !pinky && !thumb) {
    return { letter: 'E', confidence: 75, description: 'All fingers curled' };
  }
  
  // F - Index and thumb touching, others up
  if (thumbIndexDist < 0.06 && middle && ring && pinky) {
    return { letter: 'F', confidence: 85, description: 'OK sign with fingers up' };
  }
  
  // G - Index and thumb pointing sideways
  if (thumb && index && !middle && !ring && !pinky) {
    if (Math.abs(landmarks[8].y - landmarks[4].y) < 0.1) {
      return { letter: 'G', confidence: 80, description: 'Pointer sideways' };
    }
  }
  
  // H - Index and middle pointing sideways
  if (index && middle && !ring && !pinky && !thumb) {
    const sideways = Math.abs(landmarks[8].y - landmarks[5].y) < 0.15;
    if (sideways) {
      return { letter: 'H', confidence: 78, description: 'Two fingers sideways' };
    }
  }
  
  // I - Pinky only extended
  if (!index && !middle && !ring && pinky && !thumb) {
    return { letter: 'I', confidence: 92, description: 'Pinky up only' };
  }
  
  // K - Index and middle up with thumb between
  if (index && middle && !ring && !pinky && thumb) {
    return { letter: 'K', confidence: 80, description: 'Two fingers with thumb' };
  }
  
  // L - L shape with thumb and index
  if (thumb && index && !middle && !ring && !pinky) {
    const lShape = Math.abs(landmarks[4].x - landmarks[8].x) > 0.1;
    if (lShape) {
      return { letter: 'L', confidence: 92, description: 'L shape' };
    }
  }
  
  // O - Fingers touch thumb forming O
  if (thumbIndexDist < 0.05 && !middle && !ring && !pinky) {
    return { letter: 'O', confidence: 78, description: 'O shape' };
  }
  
  // R - Crossed index and middle fingers
  if (index && middle && !ring && !pinky && indexMiddleDist < 0.04) {
    return { letter: 'R', confidence: 82, description: 'Crossed fingers' };
  }
  
  // S - Fist with thumb over fingers
  if (!index && !middle && !ring && !pinky && !thumb) {
    return { letter: 'S', confidence: 72, description: 'Fist' };
  }
  
  // U - Two fingers up held together
  if (index && middle && !ring && !pinky && !thumb && allFingersTogether) {
    return { letter: 'U', confidence: 88, description: 'Two fingers together' };
  }
  
  // V - Peace sign (two fingers spread)
  if (index && middle && !ring && !pinky && !thumb && !allFingersTogether) {
    return { letter: 'V', confidence: 92, description: 'Peace sign' };
  }
  
  // W - Three fingers up
  if (index && middle && ring && !pinky && !thumb) {
    return { letter: 'W', confidence: 88, description: 'Three fingers up' };
  }
  
  // Y - Thumb and pinky extended (hang loose)
  if (thumb && !index && !middle && !ring && pinky) {
    return { letter: 'Y', confidence: 90, description: 'Hang loose' };
  }
  
  // 5 - All five fingers spread
  if (thumb && index && middle && ring && pinky) {
    return { letter: '5', confidence: 85, description: 'All fingers spread' };
  }
  
  return null;
};

/* ============================================
   🧩 TOAST COMPONENT
   ============================================ */

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const config = {
    success: { bg: 'bg-green-500', icon: Icons.Check },
    error: { bg: 'bg-red-500', icon: Icons.AlertCircle },
    info: { bg: 'bg-teal-500', icon: Icons.Info },
  }[type] || { bg: 'bg-teal-500', icon: Icons.Info };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className={`${config.bg} text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3`}
    >
      <config.icon className="w-5 h-5" />
      <span className="font-medium">{message}</span>
    </motion.div>
  );
};

/* ============================================
   🎯 MAIN SIGNLINK COMPONENT
   ============================================ */

const SignLink = () => {
  // State Management
  const [mode, setMode] = useState('camera');
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [currentGesture, setCurrentGesture] = useState(null);
  const [handDetected, setHandDetected] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [demoMode, setDemoMode] = useState(false);

  // Refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const detectorRef = useRef(null);
  const animationRef = useRef(null);
  const fileInputRef = useRef(null);
  const lastGestureRef = useRef(null);
  const gestureCountRef = useRef(0);
  const streamRef = useRef(null);

  // Toast Management
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Hand Drawing Function
  const drawHand = useCallback((ctx, keypoints, width, height) => {
    if (!keypoints || keypoints.length < 21) return;

    // Define hand skeleton connections
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [0, 5], [5, 6], [6, 7], [7, 8],
      [0, 9], [9, 10], [10, 11], [11, 12],
      [0, 13], [13, 14], [14, 15], [15, 16],
      [0, 17], [17, 18], [18, 19], [19, 20],
      [5, 9], [9, 13], [13, 17]
    ];

    // Draw skeleton lines
    ctx.strokeStyle = '#14B8A6';
    ctx.lineWidth = 3;
    connections.forEach(([i, j]) => {
      const p1 = keypoints[i];
      const p2 = keypoints[j];
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    });

    // Draw landmark points
    keypoints.forEach((point, i) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = [4, 8, 12, 16, 20].includes(i) ? '#EC4899' : '#8B5CF6';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, []);

  // Hand Detection Loop
  const detectHands = useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const detector = detectorRef.current;

    if (!video || !canvas || !detector || !isActive) return;

    const ctx = canvas.getContext('2d');
    
    // Draw mirrored video frame
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    try {
      const hands = await detector.estimateHands(video, { flipHorizontal: true });

      if (hands && hands.length > 0) {
        setHandDetected(true);
        const keypoints = hands[0].keypoints;
        
        drawHand(ctx, keypoints, canvas.width, canvas.height);

        const normalized = keypoints.map(kp => ({
          x: kp.x / canvas.width,
          y: kp.y / canvas.height,
        }));

        const gesture = recognizeGesture(normalized);
        
        if (gesture) {
          setCurrentGesture(gesture);

          if (gesture.letter === lastGestureRef.current) {
            gestureCountRef.current++;
            if (gestureCountRef.current === 15) {
              setTranscript(prev => prev + gesture.letter);
              showToast(`Added: ${gesture.letter}`, 'success');
              gestureCountRef.current = 0;
            }
          } else {
            lastGestureRef.current = gesture.letter;
            gestureCountRef.current = 1;
          }
        } else {
          setCurrentGesture(null);
        }
      } else {
        setHandDetected(false);
        setCurrentGesture(null);
        lastGestureRef.current = null;
        gestureCountRef.current = 0;
      }
    } catch (err) {
      console.error('Detection error:', err);
    }

    animationRef.current = requestAnimationFrame(detectHands);
  }, [isActive, drawHand, showToast]);

  // Load TensorFlow Model
  const loadModel = useCallback(async () => {
    try {
      setIsLoading(true);
      showToast('Loading AI model...', 'info');

      await tf.ready();
      console.log('TensorFlow.js ready');
      
      const model = handPoseDetection.SupportedModels.MediaPipeHands;
      const detector = await handPoseDetection.createDetector(model, {
        runtime: 'tfjs',
        modelType: 'full',
        maxHands: 1,
      });

      detectorRef.current = detector;
      setIsModelLoaded(true);
      setIsLoading(false);
      showToast('AI model loaded!', 'success');
      return true;
    } catch (err) {
      console.error('Model load error:', err);
      setError('Failed to load AI model. Try enabling Demo Mode.');
      setIsLoading(false);
      return false;
    }
  }, [showToast]);

  // Start Camera
  const startCamera = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!detectorRef.current && !demoMode) {
        const loaded = await loadModel();
        if (!loaded && !demoMode) {
          setIsLoading(false);
          return;
        }
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 640 }, 
          height: { ideal: 480 }, 
          facingMode: 'user' 
        }
      });

      streamRef.current = stream;
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && canvas) {
        video.srcObject = stream;
        await video.play();
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
      }

      setIsActive(true);
      setIsLoading(false);
      showToast('Camera started!', 'success');

      if (!demoMode && detectorRef.current) {
        animationRef.current = requestAnimationFrame(detectHands);
      }
    } catch (err) {
      console.error('Camera error:', err);
      setIsLoading(false);
      
      if (err.name === 'NotAllowedError') {
        setError('Camera permission denied. Please allow camera access.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found. Please connect a camera.');
      } else {
        setError('Failed to start camera. Please try again.');
      }
    }
  };

  // Stop Camera
  const stopCamera = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsActive(false);
    setHandDetected(false);
    setCurrentGesture(null);
    showToast('Camera stopped', 'info');
  }, [showToast]);

  // Demo Mode Letter Simulation
  const simulateLetter = useCallback((letter) => {
    setCurrentGesture({ letter, confidence: 95, description: 'Demo mode' });
    setTranscript(prev => prev + letter);
    showToast(`Added: ${letter}`, 'success');
    
    setTimeout(() => setCurrentGesture(null), 500);
  }, [showToast]);

  // Handle Image Upload
  const handleUpload = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      setUploadedImage(event.target.result);
      setCurrentGesture(null);
      
      if (!detectorRef.current) {
        const loaded = await loadModel();
        if (!loaded) {
          showToast('Could not load model. Try Demo Mode.', 'error');
          return;
        }
      }

      const img = new Image();
      img.onload = async () => {
        try {
          const hands = await detectorRef.current?.estimateHands(img);
          if (hands && hands.length > 0) {
            const normalized = hands[0].keypoints.map(kp => ({
              x: kp.x / img.width,
              y: kp.y / img.height,
            }));
            
            const gesture = recognizeGesture(normalized);
            if (gesture) {
              setCurrentGesture(gesture);
              showToast(`Detected: ${gesture.letter} (${gesture.confidence}%)`, 'success');
            } else {
              showToast('Hand detected but sign not recognized', 'info');
            }
          } else {
            showToast('No hand detected in image', 'info');
          }
        } catch (err) {
          console.error('Image processing error:', err);
          showToast('Failed to process image', 'error');
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    
    e.target.value = '';
  }, [loadModel, showToast]);

  // Transcript Actions
  const addSpace = () => {
    setTranscript(prev => prev + ' ');
  };

  const backspace = () => {
    setTranscript(prev => prev.slice(0, -1));
  };

  const clearTranscript = () => {
    setTranscript('');
    showToast('Transcript cleared', 'info');
  };

  const copyTranscript = async () => {
    if (!transcript) {
      showToast('Nothing to copy', 'error');
      return;
    }
    try {
      await navigator.clipboard.writeText(transcript);
      showToast('Copied to clipboard!', 'success');
    } catch (err) {
      showToast('Failed to copy', 'error');
    }
  };

  const speakTranscript = () => {
    if (!transcript) {
      showToast('Nothing to speak', 'error');
      return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(transcript);
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
    showToast('Speaking...', 'info');
  };

  // Cleanup on Unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (detectorRef.current?.dispose) {
        detectorRef.current.dispose();
      }
    };
  }, [stopCamera]);

  // Restart Detection When Active
  useEffect(() => {
    if (isActive && !demoMode && detectorRef.current && !animationRef.current) {
      animationRef.current = requestAnimationFrame(detectHands);
    }
  }, [isActive, demoMode, detectHands]);

  // Supported ASL Letters
  const ASL_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'O', 'R', 'S', 'U', 'V', 'W', 'Y', '5'];

  return (
    <div className="min-h-screen py-8 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-medium mb-4">
            <Icons.Hand className="w-4 h-4" />
            AI Sign Language Recognition
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Sign<span className="text-teal-500">Link</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Translate ASL alphabet signs to text in real-time
          </p>
        </motion.div>

        {/* Mode Selection Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { 
              setMode('camera'); 
              setUploadedImage(null); 
            }}
            className={`px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all ${
              mode === 'camera' 
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Icons.Camera className="w-4 h-4" />
            Camera
          </button>
          
          <button
            onClick={() => { 
              setMode('upload'); 
              stopCamera(); 
            }}
            className={`px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all ${
              mode === 'upload' 
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Icons.Upload className="w-4 h-4" />
            Upload
          </button>
          
          <button
            onClick={() => setDemoMode(!demoMode)}
            className={`px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all ${
              demoMode 
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Icons.Play className="w-4 h-4" />
            Demo Mode
          </button>
        </div>

        {/* Demo Mode Notice */}
        <AnimatePresence>
          {demoMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 rounded-xl bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-center"
            >
              <p className="text-purple-700 dark:text-purple-300 font-medium">
                🎮 Demo Mode Active — Click letters below to simulate detection
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-center gap-3"
            >
              <Icons.AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 dark:text-red-300 flex-1">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="p-1 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg transition-colors"
              >
                <Icons.X className="w-4 h-4 text-red-500" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Camera/Upload Area */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  {mode === 'camera' ? (
                    <Icons.Camera className="w-5 h-5 text-teal-500" />
                  ) : (
                    <Icons.Upload className="w-5 h-5 text-teal-500" />
                  )}
                  {mode === 'camera' ? 'Camera Feed' : 'Image Upload'}
                </h2>
                
                <div className="flex items-center gap-2">
                  {isModelLoaded && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                      <Icons.Zap className="w-3 h-3 inline mr-1" />
                      AI Ready
                    </span>
                  )}
                  {handDetected && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 animate-pulse">
                      ✋ Hand Detected
                    </span>
                  )}
                </div>
              </div>

              {/* Video/Image Display Area */}
              <div className="relative aspect-video bg-slate-900">
                {mode === 'camera' ? (
                  <>
                    <video 
                      ref={videoRef} 
                      className="hidden" 
                      playsInline 
                      muted 
                    />
                    
                    <canvas 
                      ref={canvasRef} 
                      className="w-full h-full object-contain" 
                    />
                    
                    {!isActive && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-teal-500/20 flex items-center justify-center">
                            <Icons.Camera className="w-10 h-10 text-teal-500" />
                          </div>
                          <p className="text-slate-400 mb-2">Camera is off</p>
                          <p className="text-slate-500 text-sm">Click "Start Camera" to begin</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {uploadedImage ? (
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded sign" 
                        className="max-w-full max-h-full object-contain" 
                      />
                    ) : (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="text-center cursor-pointer p-8 hover:bg-slate-800/50 rounded-xl transition-colors"
                      >
                        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-teal-500/20 flex items-center justify-center">
                          <Icons.Upload className="w-10 h-10 text-teal-500" />
                        </div>
                        <p className="text-slate-400 mb-2">Click to upload an image</p>
                        <p className="text-slate-500 text-sm">Supports JPG, PNG, GIF</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Current Gesture Overlay */}
                <AnimatePresence>
                  {currentGesture && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute top-4 right-4 bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-2xl p-4 shadow-2xl"
                    >
                      <div className="text-5xl font-bold text-center">{currentGesture.letter}</div>
                      <div className="text-sm opacity-80 text-center mt-1">
                        {currentGesture.confidence}% confidence
                      </div>
                      <div className="text-xs opacity-60 text-center mt-1">
                        {currentGesture.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Loading Overlay */}
                {isLoading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center text-white">
                      <Icons.Loader className="w-12 h-12 mx-auto animate-spin mb-3" />
                      <p className="font-medium">Loading...</p>
                      <p className="text-sm text-white/70">Preparing AI model</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="p-4">
                <input 
                  ref={fileInputRef} 
                  type="file" 
                  accept="image/*" 
                  onChange={handleUpload} 
                  className="hidden" 
                />

                {mode === 'camera' ? (
                  <button
                    onClick={isActive ? stopCamera : startCamera}
                    disabled={isLoading}
                    className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      isActive 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg shadow-teal-500/30'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Icons.Loader className="w-6 h-6 animate-spin" />
                        Loading AI Model...
                      </>
                    ) : isActive ? (
                      <>
                        <Icons.CameraOff className="w-6 h-6" />
                        Stop Camera
                      </>
                    ) : (
                      <>
                        <Icons.Camera className="w-6 h-6" />
                        Start Camera
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Icons.Upload className="w-5 h-5" />
                    {uploadedImage ? 'Upload Another Image' : 'Upload Image'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            
            {/* Transcript Box */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Icons.Sparkles className="w-5 h-5 text-teal-500" />
                  Transcript
                </h2>
                <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                  {transcript.length} characters
                </span>
              </div>
              
              <div className="p-4">
                <div className="min-h-[120px] p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 border-dashed">
                  {transcript ? (
                    <p className="text-slate-900 dark:text-white text-xl font-medium break-words leading-relaxed">
                      {transcript}
                      <span className="animate-pulse text-teal-500">|</span>
                    </p>
                  ) : (
                    <p className="text-slate-400 dark:text-slate-500 text-center py-4">
                      Recognized signs will appear here...
                    </p>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={addSpace} 
                    className="flex-1 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 text-sm font-medium transition-colors"
                  >
                    Space
                  </button>
                  <button 
                    onClick={backspace} 
                    disabled={!transcript}
                    className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Backspace"
                  >
                    <Icons.RotateCcw className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={copyTranscript} 
                    disabled={!transcript}
                    className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Copy"
                  >
                    <Icons.Copy className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={speakTranscript} 
                    disabled={!transcript}
                    className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Speak"
                  >
                    <Icons.Volume2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={clearTranscript} 
                    disabled={!transcript}
                    className="p-2.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Clear"
                  >
                    <Icons.Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Letter Input Grid */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-4">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                {demoMode ? (
                  <>
                    <Icons.Play className="w-4 h-4 text-purple-500" />
                    Click to Simulate
                  </>
                ) : (
                  <>
                    <Icons.Hand className="w-4 h-4 text-teal-500" />
                    Supported Signs
                  </>
                )}
              </h3>
              
              <div className="grid grid-cols-7 gap-2">
                {ASL_LETTERS.map(letter => (
                  <motion.button
                    key={letter}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => demoMode ? simulateLetter(letter) : setTranscript(prev => prev + letter)}
                    className={`w-10 h-10 rounded-lg font-bold text-lg transition-all ${
                      currentGesture?.letter === letter
                        ? 'bg-teal-500 text-white scale-110 shadow-lg shadow-teal-500/30'
                        : demoMode
                          ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 cursor-pointer'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-teal-100 dark:hover:bg-teal-900/30 cursor-pointer'
                    }`}
                  >
                    {letter}
                  </motion.button>
                ))}
              </div>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center">
                {demoMode 
                  ? 'Click any letter to add it to the transcript'
                  : '19 ASL letters supported'
                }
              </p>
            </div>

            {/* Tips Card */}
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Icons.Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  <p className="font-semibold mb-2">Tips for Best Results:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-blue-600 dark:text-blue-400">
                    <li>Ensure good, even lighting</li>
                    <li>Hold each sign steady for ~0.5 seconds</li>
                    <li>Keep your full hand visible in frame</li>
                    <li>Use a plain background if possible</li>
                    <li>Enable Demo Mode if AI doesn't load</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Supported Letters Reference */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <h4 className="font-medium text-slate-900 dark:text-white text-sm mb-2">
                Supported ASL Letters:
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A, B, C, D, E, F, G, H, I, K, L, O, R, S, U, V, W, Y, 5
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                * Letters J and Z require motion and are not yet supported
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map(toast => (
            <Toast 
              key={toast.id} 
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)} 
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SignLink;