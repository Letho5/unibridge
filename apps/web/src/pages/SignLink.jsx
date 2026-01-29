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
};

/* ============================================
   🤖 ASL GESTURE RECOGNITION
   ============================================ */

// Finger indices
const FINGER_INDICES = {
  thumb: [0, 1, 2, 3, 4],
  index: [0, 5, 6, 7, 8],
  middle: [0, 9, 10, 11, 12],
  ring: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

// Check if finger is extended
const isFingerExtended = (landmarks, finger) => {
  const dominated hand = landmarks;
  if (!landmarks || landmarks.length < 21) return false;
  
  const indices = FINGER_INDICES[finger];
  if (finger === 'thumb') {
    // Thumb: check if tip is far from base horizontally
    return Math.abs(landmarks[4].x - landmarks[2].x) > 0.05;
  }
  
  // Other fingers: check if tip is above PIP joint
  const tipY = landmarks[indices[4]].y;
  const pipY = landmarks[indices[2]].y;
  return tipY < pipY;
};

// Get finger states
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

// Distance between two points
const distance = (p1, p2) => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

// Recognize ASL letter
const recognizeGesture = (landmarks) => {
  if (!landmarks || landmarks.length < 21) return null;
  
  const fingers = getFingerStates(landmarks);
  const { thumb, index, middle, ring, pinky } = fingers;
  
  // Calculate additional features
  const thumbIndexDist = distance(landmarks[4], landmarks[8]);
  const indexMiddleDist = distance(landmarks[8], landmarks[12]);
  const allFingersTogether = indexMiddleDist < 0.08;
  
  // Count extended fingers
  const extendedCount = [thumb, index, middle, ring, pinky].filter(Boolean).length;
  
  // A - Fist with thumb to side
  if (!index && !middle && !ring && !pinky && thumb) {
    return { letter: 'A', confidence: 88, description: 'Fist with thumb beside' };
  }
  
  // B - All fingers up, thumb tucked
  if (index && middle && ring && pinky && !thumb) {
    return { letter: 'B', confidence: 90, description: 'Flat hand, fingers together' };
  }
  
  // C - Curved hand (harder to detect, use approximation)
  if (extendedCount === 0 && thumbIndexDist > 0.1 && thumbIndexDist < 0.2) {
    return { letter: 'C', confidence: 70, description: 'Curved hand shape' };
  }
  
  // D - Index up, others down
  if (index && !middle && !ring && !pinky && !thumb) {
    return { letter: 'D', confidence: 85, description: 'Index finger pointing up' };
  }
  
  // E - All fingers curled
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
  
  // H - Index and middle sideways
  if (index && middle && !ring && !pinky && !thumb) {
    const sideways = Math.abs(landmarks[8].y - landmarks[5].y) < 0.15;
    if (sideways) {
      return { letter: 'H', confidence: 78, description: 'Two fingers sideways' };
    }
  }
  
  // I - Pinky only
  if (!index && !middle && !ring && pinky && !thumb) {
    return { letter: 'I', confidence: 92, description: 'Pinky up only' };
  }
  
  // K - Index and middle up with thumb between
  if (index && middle && !ring && !pinky && thumb) {
    return { letter: 'K', confidence: 80, description: 'Two fingers with thumb' };
  }
  
  // L - L shape
  if (thumb && index && !middle && !ring && !pinky) {
    const lShape = Math.abs(landmarks[4].x - landmarks[8].x) > 0.1;
    if (lShape) {
      return { letter: 'L', confidence: 92, description: 'L shape' };
    }
  }
  
  // O - Fingers touch thumb
  if (thumbIndexDist < 0.05 && !middle && !ring && !pinky) {
    return { letter: 'O', confidence: 78, description: 'O shape' };
  }
  
  // R - Crossed index and middle
  if (index && middle && !ring && !pinky && indexMiddleDist < 0.04) {
    return { letter: 'R', confidence: 82, description: 'Crossed fingers' };
  }
  
  // S - Fist with thumb over
  if (!index && !middle && !ring && !pinky && !thumb) {
    return { letter: 'S', confidence: 72, description: 'Fist' };
  }
  
  // U - Two fingers up together
  if (index && middle && !ring && !pinky && !thumb && allFingersTogether) {
    return { letter: 'U', confidence: 88, description: 'Two fingers together' };
  }
  
  // V - Peace sign
  if (index && middle && !ring && !pinky && !thumb && !allFingersTogether) {
    return { letter: 'V', confidence: 92, description: 'Peace sign' };
  }
  
  // W - Three fingers up
  if (index && middle && ring && !pinky && !thumb) {
    return { letter: 'W', confidence: 88, description: 'Three fingers up' };
  }
  
  // Y - Thumb and pinky out
  if (thumb && !index && !middle && !ring && pinky) {
    return { letter: 'Y', confidence: 90, description: 'Hang loose' };
  }
  
  // 5 - All fingers spread
  if (thumb && index && middle && ring && pinky) {
    return { letter: '5', confidence: 85, description: 'All fingers spread' };
  }
  
  return null;
};

/* ============================================
   🧩 COMPONENTS
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
   🎯 MAIN COMPONENT
   ============================================ */

const SignLink = () => {
  // State
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

  // Toast
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Draw hand landmarks
  const drawHand = useCallback((ctx, keypoints, width, height) => {
    if (!keypoints || keypoints.length < 21) return;

    // Connections
    const connections = [
      [0,1],[1,2],[2,3],[3,4],
      [0,5],[5,6],[6,7],[7,8],
      [0,9],[9,10],[10,11],[11,12],
      [0,13],[13,14],[14,15],[15,16],
      [0,17],[17,18],[18,19],[19,20],
      [5,9],[9,13],[13,17]
    ];

    // Draw connections
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

    // Draw points
    keypoints.forEach((point, i) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = [4,8,12,16,20].includes(i) ? '#EC4899' : '#8B5CF6';
      ctx.fill();
    });
  }, []);

  // Detection loop
  const detectHands = useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const detector = detectorRef.current;

    if (!video || !canvas || !detector || !isActive) return;

    const ctx = canvas.getContext('2d');
    
    // Draw mirrored video
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
        
        // Draw hand
        drawHand(ctx, keypoints, canvas.width, canvas.height);

        // Normalize keypoints for gesture recognition
        const normalized = keypoints.map(kp => ({
          x: kp.x / canvas.width,
          y: kp.y / canvas.height,
        }));

        // Recognize gesture
        const gesture = recognizeGesture(normalized);
        
        if (gesture) {
          setCurrentGesture(gesture);

          // Stability check - same gesture for ~0.5s
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

  // Load model
  const loadModel = useCallback(async () => {
    try {
      setIsLoading(true);
      showToast('Loading AI model...', 'info');

      await tf.ready();
      
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

  // Start camera
  const startCamera = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Load model first if not loaded
      if (!detectorRef.current && !demoMode) {
        const loaded = await loadModel();
        if (!loaded && !demoMode) {
          setIsLoading(false);
          return;
        }
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
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

      // Start detection loop
      if (!demoMode) {
        animationRef.current = requestAnimationFrame(detectHands);
      }
    } catch (err) {
      console.error('Camera error:', err);
      setIsLoading(false);
      setError(err.name === 'NotAllowedError' 
        ? 'Camera permission denied.' 
        : 'Failed to start camera.');
    }
  };

  // Stop camera
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

  // Demo mode letter simulation
  const simulateLetter = useCallback((letter) => {
    setCurrentGesture({ letter, confidence: 95, description: 'Demo mode' });
    setTranscript(prev => prev + letter);
    showToast(`Added: ${letter}`, 'success');
    
    setTimeout(() => setCurrentGesture(null), 500);
  }, [showToast]);

  // Handle image upload
  const handleUpload = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      setUploadedImage(event.target.result);
      
      if (!detectorRef.current) {
        await loadModel();
      }

      // Process image
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
              showToast(`Detected: ${gesture.letter}`, 'success');
            } else {
              showToast('No sign detected in image', 'info');
            }
          } else {
            showToast('No hand detected in image', 'info');
          }
        } catch (err) {
          showToast('Failed to process image', 'error');
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }, [loadModel, showToast]);

  // Transcript actions
  const addSpace = () => setTranscript(prev => prev + ' ');
  const clearTranscript = () => { setTranscript(''); showToast('Cleared', 'info'); };
  const copyTranscript = async () => {
    if (!transcript) return showToast('Nothing to copy', 'error');
    await navigator.clipboard.writeText(transcript);
    showToast('Copied!', 'success');
  };
  const speakTranscript = () => {
    if (!transcript) return showToast('Nothing to speak', 'error');
    speechSynthesis.cancel();
    speechSynthesis.speak(new SpeechSynthesisUtterance(transcript));
  };

  // Cleanup
  useEffect(() => {
    return () => {
      stopCamera();
      detectorRef.current?.dispose?.();
    };
  }, [stopCamera]);

  // Restart detection when active changes
  useEffect(() => {
    if (isActive && !demoMode && detectorRef.current) {
      animationRef.current = requestAnimationFrame(detectHands);
    }
  }, [isActive, demoMode, detectHands]);

  // ASL Letters for manual/demo input
  const ASL_LETTERS = ['A','B','C','D','E','F','G','H','I','K','L','O','R','S','U','V','W','Y','5'];

  return (
    <div className="min-h-screen py-8 px-4">
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

        {/* Mode Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { setMode('camera'); setUploadedImage(null); }}
            className={`px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all ${
              mode === 'camera' ? 'bg-teal-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Icons.Camera className="w-4 h-4" />
            Camera
          </button>
          <button
            onClick={() => { setMode('upload'); stopCamera(); }}
            className={`px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all ${
              mode === 'upload' ? 'bg-teal-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Icons.Upload className="w-4 h-4" />
            Upload
          </button>
          <button
            onClick={() => setDemoMode(!demoMode)}
            className={`px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all ${
              demoMode ? 'bg-purple-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Icons.Play className="w-4 h-4" />
            Demo Mode
          </button>
        </div>

        {/* Demo Mode Notice */}
        {demoMode && (
          <div className="p-4 rounded-xl bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-center">
            <p className="text-purple-700 dark:text-purple-300 font-medium">
              🎮 Demo Mode Active - Click letters below to simulate detection
            </p>
          </div>
        )}

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-center gap-3"
            >
              <Icons.AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700 dark:text-red-300 flex-1">{error}</p>
              <button onClick={() => setError(null)}>
                <Icons.X className="w-4 h-4 text-red-500" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Camera/Upload Area */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  {mode === 'camera' ? <Icons.Camera className="w-5 h-5 text-teal-500" /> : <Icons.Upload className="w-5 h-5 text-teal-500" />}
                  {mode === 'camera' ? 'Camera Feed' : 'Image Upload'}
                </h2>
                <div className="flex items-center gap-2">
                  {isModelLoaded && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-600">
                      <Icons.Zap className="w-3 h-3 inline mr-1" />AI Ready
                    </span>
                  )}
                  {handDetected && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-teal-100 dark:bg-teal-900/30 text-teal-600 animate-pulse">
                      ✋ Hand Detected
                    </span>
                  )}
                </div>
              </div>

              {/* Video/Image Area */}
              <div className="relative aspect-video bg-slate-900">
                {mode === 'camera' ? (
                  <>
                    <video ref={videoRef} className="hidden" playsInline muted />
                    <canvas ref={canvasRef} className="w-full h-full" />
                    
                    {!isActive && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-teal-500/20 flex items-center justify-center">
                            <Icons.Camera className="w-10 h-10 text-teal-500" />
                          </div>
                          <p className="text-slate-400">Click Start to begin</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {uploadedImage ? (
                      <img src={uploadedImage} alt="Uploaded" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="text-center cursor-pointer p-8 hover:bg-slate-800/50 rounded-xl transition-colors"
                      >
                        <Icons.Upload className="w-16 h-16 mx-auto mb-4 text-teal-500" />
                        <p className="text-slate-400">Click to upload an image</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Current Gesture Overlay */}
                {currentGesture && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 bg-teal-500 text-white rounded-xl p-4 shadow-lg"
                  >
                    <div className="text-4xl font-bold">{currentGesture.letter}</div>
                    <div className="text-xs opacity-80">{currentGesture.confidence}%</div>
                  </motion.div>
                )}

                {/* Loading */}
                {isLoading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Icons.Loader className="w-12 h-12 mx-auto animate-spin mb-2" />
                      <p>Loading...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="p-4">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />

                {mode === 'camera' ? (
                  <button
                    onClick={isActive ? stopCamera : startCamera}
                    disabled={isLoading}
                    className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all disabled:opacity-50 ${
                      isActive ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/30'
                    }`}
                  >
                    {isLoading ? (
                      <><Icons.Loader className="w-6 h-6 animate-spin" /> Loading...</>
                    ) : isActive ? (
                      <><Icons.CameraOff className="w-6 h-6" /> Stop Camera</>
                    ) : (
                      <><Icons.Camera className="w-6 h-6" /> Start Camera</>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-4 rounded-xl font-semibold bg-teal-500 hover:bg-teal-600 text-white flex items-center justify-center gap-2"
                  >
                    <Icons.Upload className="w-5 h-5" />
                    {uploadedImage ? 'Upload Another' : 'Upload Image'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Transcript */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Icons.Sparkles className="w-5 h-5 text-teal-500" />
                  Transcript
                </h2>
                <span className="text-xs text-slate-500">{transcript.length} chars</span>
              </div>
              
              <div className="p-4">
                <div className="min-h-[100px] p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700">
                  {transcript ? (
                    <p className="text-slate-900 dark:text-white text-xl font-medium break-words">{transcript}</p>
                  ) : (
                    <p className="text-slate-400 text-center">Signs appear here...</p>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <button onClick={addSpace} className="flex-1 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-sm">Space</button>
                  <button onClick={copyTranscript} disabled={!transcript} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 disabled:opacity-50">
                    <Icons.Copy className="w-4 h-4" />
                  </button>
                  <button onClick={speakTranscript} disabled={!transcript} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 disabled:opacity-50">
                    <Icons.Volume2 className="w-4 h-4" />
                  </button>
                  <button onClick={clearTranscript} disabled={!transcript} className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 hover:bg-red-200 disabled:opacity-50">
                    <Icons.Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Letter Input (Demo Mode or Manual) */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-4">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                {demoMode ? '🎮 Click to Simulate' : '⌨️ Manual Input'}
              </h3>
              <div className="grid grid-cols-7 gap-2">
                {ASL_LETTERS.map(letter => (
                  <button
                    key={letter}
                    onClick={() => demoMode ? simulateLetter(letter) : setTranscript(prev => prev + letter)}
                    className={`w-9 h-9 rounded-lg font-bold transition-all ${
                      currentGesture?.letter === letter
                        ? 'bg-teal-500 text-white scale-110'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-teal-100 dark:hover:bg-teal-900/30'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Icons.Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  <p className="font-medium mb-1">Tips:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Good lighting helps detection</li>
                    <li>Hold signs steady for 0.5s</li>
                    <li>Keep hand fully in frame</li>
                    <li>Use Demo Mode if AI doesn't load</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toasts */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map(toast => (
            <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SignLink;