/* ============================================================
   🌉 UNIBRIDGE - SIGNLINK PAGE
   Camera-based Sign Language Recognition
   ============================================================ */

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ============================================
   🎨 ICON COMPONENTS
   ============================================ */

const Icons = {
  Hand: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  ),

  Camera: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),

  CameraOff: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" x2="22" y1="2" y2="22" />
      <path d="M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" />
      <path d="M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" />
      <path d="M14.121 15.121A3 3 0 1 1 9.88 10.88" />
    </svg>
  ),

  AlertCircle: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  ),

  Info: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),

  Copy: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  ),

  Trash2: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  ),

  Volume2: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  ),

  Sparkles: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),

  X: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),

  Loader: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

/* ============================================
   🎬 ANIMATION VARIANTS
   ============================================ */

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

/* ============================================
   🔤 ASL ALPHABET REFERENCE
   ============================================ */

const ASL_ALPHABET = [
  { letter: 'A', description: 'Fist with thumb beside' },
  { letter: 'B', description: 'Flat hand, thumb tucked' },
  { letter: 'C', description: 'Curved hand like holding a cup' },
  { letter: 'D', description: 'Index up, others touch thumb' },
  { letter: 'E', description: 'Fingers curled, thumb tucked' },
  { letter: 'F', description: 'OK sign with three fingers up' },
  { letter: 'G', description: 'Pointer and thumb out, sideways' },
  { letter: 'H', description: 'Two fingers out sideways' },
  { letter: 'I', description: 'Pinky up only' },
  { letter: 'J', description: 'Pinky traces J shape' },
  { letter: 'K', description: 'Two fingers up, thumb between' },
  { letter: 'L', description: 'L shape with thumb and index' },
  { letter: 'M', description: 'Three fingers over thumb' },
  { letter: 'N', description: 'Two fingers over thumb' },
  { letter: 'O', description: 'Fingers touch thumb in O shape' },
  { letter: 'P', description: 'K sign pointing down' },
  { letter: 'Q', description: 'G sign pointing down' },
  { letter: 'R', description: 'Crossed fingers' },
  { letter: 'S', description: 'Fist with thumb over fingers' },
  { letter: 'T', description: 'Thumb between index and middle' },
  { letter: 'U', description: 'Two fingers up together' },
  { letter: 'V', description: 'Peace sign' },
  { letter: 'W', description: 'Three fingers up' },
  { letter: 'X', description: 'Index finger hooked' },
  { letter: 'Y', description: 'Thumb and pinky out' },
  { letter: 'Z', description: 'Index traces Z shape' },
];

/* ============================================
   🧩 SUB-COMPONENTS
   ============================================ */

// Toast Notification
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeConfig = {
    success: { bg: 'bg-green-500', icon: Icons.Check },
    error: { bg: 'bg-red-500', icon: Icons.AlertCircle },
    info: { bg: 'bg-teal-500', icon: Icons.Info },
  };

  const config = typeConfig[type] || typeConfig.info;
  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className={`${config.bg} text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3`}
    >
      <IconComponent className="w-5 h-5" />
      <span className="font-medium">{message}</span>
    </motion.div>
  );
};

// Letter Button for manual input
const LetterButton = ({ letter, onClick, isActive }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => onClick(letter)}
    className={`
      w-10 h-10 rounded-lg font-bold text-lg transition-all
      ${isActive 
        ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30' 
        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-100 dark:hover:bg-teal-900/30'
      }
    `}
  >
    {letter}
  </motion.button>
);

/* ============================================
   🎯 MAIN SIGNLINK COMPONENT
   ============================================ */

const SignLink = () => {
  // State
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [currentLetter, setCurrentLetter] = useState('');
  const [toasts, setToasts] = useState([]);
  const [showAlphabet, setShowAlphabet] = useState(false);

  // Refs
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Toast functions
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Start camera
  const startCamera = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });

      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsActive(true);
      setIsLoading(false);
      showToast('Camera started! Use the alphabet buttons below to add letters.', 'success');
    } catch (err) {
      console.error('Camera error:', err);
      setIsLoading(false);
      
      if (err.name === 'NotAllowedError') {
        setError('Camera permission denied. Please allow camera access in your browser settings.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found. Please connect a camera and try again.');
      } else {
        setError('Failed to start camera. Please try again.');
      }
    }
  };

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsActive(false);
    setCurrentLetter('');
    showToast('Camera stopped', 'info');
  }, [showToast]);

  // Add letter to transcript
  const addLetter = useCallback((letter) => {
    setCurrentLetter(letter);
    setTranscript(prev => prev + letter);
    
    // Clear current letter highlight after a moment
    setTimeout(() => setCurrentLetter(''), 500);
  }, []);

  // Add space
  const addSpace = useCallback(() => {
    setTranscript(prev => prev + ' ');
  }, []);

  // Clear transcript
  const clearTranscript = useCallback(() => {
    setTranscript('');
    showToast('Transcript cleared', 'info');
  }, [showToast]);

  // Copy transcript
  const copyTranscript = useCallback(async () => {
    if (!transcript.trim()) {
      showToast('Nothing to copy', 'error');
      return;
    }
    
    try {
      await navigator.clipboard.writeText(transcript);
      showToast('Copied to clipboard!', 'success');
    } catch {
      showToast('Failed to copy', 'error');
    }
  }, [transcript, showToast]);

  // Speak transcript
  const speakTranscript = useCallback(() => {
    if (!transcript.trim()) {
      showToast('Nothing to speak', 'error');
      return;
    }
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(transcript);
    window.speechSynthesis.speak(utterance);
    showToast('Speaking...', 'info');
  }, [transcript, showToast]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="min-h-screen py-8 px-4">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto space-y-6"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 text-sm font-medium mb-4">
            <Icons.Hand className="w-4 h-4" />
            Sign Language Recognition
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Sign<span className="text-teal-500">Link</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Practice ASL alphabet signs with your camera. Use the letter buttons to build your message.
          </p>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-center gap-3"
            >
              <Icons.AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 dark:text-red-300 text-sm flex-1">{error}</p>
              <button
                onClick={() => setError(null)}
                className="p-1 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg transition-colors"
              >
                <Icons.X className="w-4 h-4 text-red-500" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Camera Section */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              {/* Camera Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Icons.Camera className="w-5 h-5 text-teal-500" />
                  Camera Feed
                </h2>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isActive 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                }`}>
                  {isActive ? '● Live' : '○ Off'}
                </div>
              </div>

              {/* Video Area */}
              <div className="relative aspect-video bg-slate-900">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }}
                />
                
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

                {/* Current Letter Overlay */}
                {isActive && currentLetter && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-4 right-4 w-16 h-16 rounded-xl bg-teal-500 text-white flex items-center justify-center text-3xl font-bold shadow-lg"
                  >
                    {currentLetter}
                  </motion.div>
                )}
              </div>

              {/* Camera Controls */}
              <div className="p-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={isActive ? stopCamera : startCamera}
                  disabled={isLoading}
                  className={`
                    w-full py-4 rounded-xl font-semibold text-lg
                    flex items-center justify-center gap-3
                    transition-all duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${isActive
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/30'
                    }
                  `}
                >
                  {isLoading ? (
                    <>
                      <Icons.Loader className="w-6 h-6 animate-spin" />
                      Starting...
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
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Right Panel */}
          <motion.div variants={fadeInUp} className="space-y-6">
            {/* Transcript */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Icons.Sparkles className="w-5 h-5 text-teal-500" />
                  Transcript
                </h2>
                <span className="text-xs text-slate-500">{transcript.length} chars</span>
              </div>
              
              <div className="p-4">
                <div className="min-h-[100px] p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700">
                  {transcript ? (
                    <p className="text-slate-900 dark:text-white text-lg font-medium break-words">
                      {transcript}
                    </p>
                  ) : (
                    <p className="text-slate-400 dark:text-slate-500 text-center">
                      Your signed letters will appear here...
                    </p>
                  )}
                </div>

                {/* Transcript Actions */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={copyTranscript}
                    disabled={!transcript}
                    className="flex-1 py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Icons.Copy className="w-4 h-4" />
                    Copy
                  </button>
                  <button
                    onClick={speakTranscript}
                    disabled={!transcript}
                    className="flex-1 py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Icons.Volume2 className="w-4 h-4" />
                    Speak
                  </button>
                  <button
                    onClick={clearTranscript}
                    disabled={!transcript}
                    className="py-2 px-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Icons.Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Input */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Letter Input
                </h2>
                <button
                  onClick={addSpace}
                  className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Space
                </button>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-7 gap-2">
                  {ASL_ALPHABET.slice(0, 26).map(({ letter }) => (
                    <LetterButton
                      key={letter}
                      letter={letter}
                      onClick={addLetter}
                      isActive={currentLetter === letter}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ASL Reference */}
        <motion.div variants={fadeInUp}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <button
              onClick={() => setShowAlphabet(!showAlphabet)}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Icons.Hand className="w-5 h-5 text-teal-500" />
                ASL Alphabet Reference
              </h2>
              <motion.div animate={{ rotate: showAlphabet ? 180 : 0 }}>
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </button>

            <AnimatePresence>
              {showAlphabet && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {ASL_ALPHABET.map(({ letter, description }) => (
                      <div
                        key={letter}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors cursor-pointer"
                        onClick={() => addLetter(letter)}
                      >
                        <div className="text-2xl font-bold text-teal-500 mb-1">{letter}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{description}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          variants={fadeInUp}
          className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-start gap-3">
            <Icons.Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-medium mb-1">How to Use SignLink</p>
              <p>
                1. Start the camera to see yourself signing. 
                2. Practice ASL alphabet signs and click the corresponding letter button to add it to your transcript. 
                3. Use the ASL Reference to learn the hand shapes for each letter.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

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