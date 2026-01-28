/* ============================================================
   🌉 UNIBRIDGE - VOICELINK PAGE
   Real-time Speech-to-Text & Text-to-Speech with Web Speech API
   ============================================================ */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSettingsStore from '../stores/settingsStore';

/* ============================================
   🎨 ICON COMPONENTS
   ============================================ */

const Icons = {
  Microphone: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  ),

  MicrophoneOff: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" x2="22" y1="2" y2="22" />
      <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" />
      <path d="M5 10v2a7 7 0 0 0 12 5" />
      <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  ),

  Volume2: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  ),

  VolumeX: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="22" x2="16" y1="9" y2="15" />
      <line x1="16" x2="22" y1="9" y2="15" />
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
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  ),

  RotateCcw: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  ),

  Check: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),

  AlertCircle: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  ),

  Settings: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),

  ChevronDown: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),

  Globe: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),

  Pause: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="4" height="16" x="6" y="4" />
      <rect width="4" height="16" x="14" y="4" />
    </svg>
  ),

  Play: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),

  Square: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  ),

  Waveform: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h2" />
      <path d="M6 8v8" />
      <path d="M10 4v16" />
      <path d="M14 6v12" />
      <path d="M18 8v8" />
      <path d="M22 12h-2" />
    </svg>
  ),

  ArrowLeftRight: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3 4 7l4 4" />
      <path d="M4 7h16" />
      <path d="m16 21 4-4-4-4" />
      <path d="M20 17H4" />
    </svg>
  ),

  History: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
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

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

/* ============================================
   🧩 SUB-COMPONENTS
   ============================================ */

// Voice Visualizer Component
const VoiceVisualizer = ({ isActive, intensity = 0.5 }) => {
  const bars = 9;
  
  return (
    <div className="flex items-end justify-center gap-1 h-16" role="img" aria-label={isActive ? "Voice input active" : "Voice input inactive"}>
      {Array.from({ length: bars }).map((_, index) => {
        const baseHeight = Math.sin((index / bars) * Math.PI) * 100;
        const animationDelay = index * 0.1;
        
        return (
          <motion.div
            key={index}
            className={`w-1.5 rounded-full ${isActive ? 'bg-purple-500' : 'bg-slate-300 dark:bg-slate-600'}`}
            initial={{ height: 8 }}
            animate={isActive ? {
              height: [8, baseHeight * intensity, 8],
            } : { height: 8 }}
            transition={{
              duration: 0.5,
              delay: animationDelay,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status, message }) => {
  const statusConfig = {
    idle: {
      bg: 'bg-slate-100 dark:bg-slate-800',
      text: 'text-slate-600 dark:text-slate-400',
      dot: 'bg-slate-400',
    },
    listening: {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-600 dark:text-purple-400',
      dot: 'bg-purple-500',
      pulse: true,
    },
    processing: {
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      text: 'text-amber-600 dark:text-amber-400',
      dot: 'bg-amber-500',
      pulse: true,
    },
    speaking: {
      bg: 'bg-teal-100 dark:bg-teal-900/30',
      text: 'text-teal-600 dark:text-teal-400',
      dot: 'bg-teal-500',
      pulse: true,
    },
    error: {
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-600 dark:text-red-400',
      dot: 'bg-red-500',
    },
    success: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-600 dark:text-green-400',
      dot: 'bg-green-500',
    },
  };

  const config = statusConfig[status] || statusConfig.idle;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${config.bg} ${config.text}`}
    >
      <span className="relative flex h-2 w-2">
        {config.pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.dot} opacity-75`} />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`} />
      </span>
      {message}
    </motion.div>
  );
};

// Language Selector Component
const LanguageSelector = ({ value, onChange, languages, label, id }) => {
  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <Icons.Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-10 py-3 rounded-xl bg-white dark:bg-dark-800 border-2 border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white appearance-none cursor-pointer transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 focus:outline-none"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <Icons.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
};

// Voice Selector Component
const VoiceSelector = ({ value, onChange, voices, label, id }) => {
  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <Icons.Volume2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-10 py-3 rounded-xl bg-white dark:bg-dark-800 border-2 border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white appearance-none cursor-pointer transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 focus:outline-none"
        >
          {voices.length === 0 ? (
            <option value="">Loading voices...</option>
          ) : (
            voices.map((voice, index) => (
              <option key={index} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))
          )}
        </select>
        <Icons.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
};

// Action Button Component
const ActionButton = ({ onClick, icon: Icon, label, variant = 'secondary', size = 'md', disabled = false, loading = false }) => {
  const variants = {
    primary: 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40',
    secondary: 'bg-slate-100 dark:bg-dark-800 hover:bg-slate-200 dark:hover:bg-dark-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-dark-700',
    danger: 'bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400',
    success: 'bg-teal-100 dark:bg-teal-900/30 hover:bg-teal-200 dark:hover:bg-teal-900/50 text-teal-600 dark:text-teal-400',
  };

  const sizes = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${variants[variant]} ${sizes[size]}
        rounded-xl transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        relative
      `}
      aria-label={label}
      title={label}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <Icon className="w-5 h-5" />
      )}
    </motion.button>
  );
};

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeConfig = {
    success: {
      bg: 'bg-green-500',
      icon: Icons.Check,
    },
    error: {
      bg: 'bg-red-500',
      icon: Icons.AlertCircle,
    },
    info: {
      bg: 'bg-purple-500',
      icon: Icons.AlertCircle,
    },
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

// Transcript History Item
const HistoryItem = ({ text, timestamp, onSpeak, onCopy }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="group p-4 rounded-xl bg-slate-50 dark:bg-dark-800/50 hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-slate-900 dark:text-white text-sm leading-relaxed">
            {text}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
            {timestamp}
          </p>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <ActionButton
            onClick={() => onSpeak(text)}
            icon={Icons.Volume2}
            label="Speak this text"
            size="sm"
          />
          <ActionButton
            onClick={() => onCopy(text)}
            icon={Icons.Copy}
            label="Copy text"
            size="sm"
          />
        </div>
      </div>
    </motion.div>
  );
};

/* ============================================
   📋 SUPPORTED LANGUAGES
   ============================================ */

const SUPPORTED_LANGUAGES = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'en-GB', name: 'English (UK)' },
  { code: 'es-ES', name: 'Spanish (Spain)' },
  { code: 'es-MX', name: 'Spanish (Mexico)' },
  { code: 'fr-FR', name: 'French' },
  { code: 'de-DE', name: 'German' },
  { code: 'it-IT', name: 'Italian' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'pt-PT', name: 'Portuguese (Portugal)' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)' },
  { code: 'ja-JP', name: 'Japanese' },
  { code: 'ko-KR', name: 'Korean' },
  { code: 'ar-SA', name: 'Arabic' },
  { code: 'hi-IN', name: 'Hindi' },
  { code: 'ru-RU', name: 'Russian' },
  { code: 'nl-NL', name: 'Dutch' },
  { code: 'pl-PL', name: 'Polish' },
  { code: 'sv-SE', name: 'Swedish' },
  { code: 'da-DK', name: 'Danish' },
];

/* ============================================
   🎯 MAIN VOICELINK COMPONENT
   ============================================ */

const VoiceLink = () => {
  // ============================================
  // State Management
  // ============================================
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [inputText, setInputText] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('Ready to listen');
  const [error, setError] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Voice settings
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [selectedVoice, setSelectedVoice] = useState('');
  const [availableVoices, setAvailableVoices] = useState([]);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);
  const [speechVolume, setSpeechVolume] = useState(1);
  
  // Feature flags
  const [isSupported, setIsSupported] = useState(true);
  const [continuousMode, setContinuousMode] = useState(false);

  // Refs
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  // Get settings from store
  const { voiceSettings, updateVoiceSettings } = useSettingsStore();

  // ============================================
  // Check Browser Support
  // ============================================
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;

    if (!SpeechRecognition || !speechSynthesis) {
      setIsSupported(false);
      setError('Your browser does not support speech recognition. Please use Chrome, Edge, or Safari.');
    }

    // Load available voices
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      setAvailableVoices(voices);
      if (voices.length > 0 && !selectedVoice) {
        // Try to find a voice matching the selected language
        const matchingVoice = voices.find(v => v.lang.startsWith(selectedLanguage.split('-')[0]));
        setSelectedVoice(matchingVoice?.name || voices[0].name);
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, [selectedLanguage]);

  // ============================================
  // Initialize Speech Recognition
  // ============================================
  const initializeRecognition = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.continuous = continuousMode;
    recognition.interimResults = true;
    recognition.lang = selectedLanguage;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setStatus('listening');
      setStatusMessage('Listening...');
      setError(null);
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimText = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimText += result[0].transcript;
        }
      }

      if (finalTranscript) {
        setTranscript((prev) => prev + (prev ? ' ' : '') + finalTranscript);
        setInterimTranscript('');
      } else {
        setInterimTranscript(interimText);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      
      const errorMessages = {
        'no-speech': 'No speech detected. Please try again.',
        'audio-capture': 'No microphone found. Please check your device.',
        'not-allowed': 'Microphone permission denied. Please allow access.',
        'network': 'Network error. Please check your connection.',
        'aborted': 'Recognition was aborted.',
        'language-not-supported': 'Language not supported.',
      };

      const message = errorMessages[event.error] || `Error: ${event.error}`;
      setError(message);
      setStatus('error');
      setStatusMessage(message);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript('');
      
      if (!error) {
        setStatus('idle');
        setStatusMessage('Ready to listen');
      }

      // Restart if continuous mode is enabled and no error
      if (continuousMode && !error && recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.log('Could not restart recognition:', e);
        }
      }
    };

    return recognition;
  }, [selectedLanguage, continuousMode, error]);

  // ============================================
  // Start/Stop Listening
  // ============================================
  const startListening = useCallback(() => {
    if (!isSupported) {
      showToast('Speech recognition not supported', 'error');
      return;
    }

    try {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      setIsSpeaking(false);

      // Initialize and start recognition
      recognitionRef.current = initializeRecognition();
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (err) {
      console.error('Failed to start recognition:', err);
      setError('Failed to start speech recognition. Please try again.');
      setStatus('error');
      setStatusMessage('Failed to start');
    }
  }, [isSupported, initializeRecognition]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
    setInterimTranscript('');
    
    // Save to history if there's a transcript
    if (transcript.trim()) {
      addToHistory(transcript);
    }
  }, [transcript]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // ============================================
  // Text-to-Speech Functions
  // ============================================
  const speak = useCallback((text) => {
    if (!text.trim()) {
      showToast('Please enter some text to speak', 'error');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find the selected voice
    const voice = availableVoices.find(v => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.lang = selectedLanguage;
    utterance.rate = speechRate;
    utterance.pitch = speechPitch;
    utterance.volume = speechVolume;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setStatus('speaking');
      setStatusMessage('Speaking...');
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setStatus('success');
      setStatusMessage('Finished speaking');
      setTimeout(() => {
        setStatus('idle');
        setStatusMessage('Ready to listen');
      }, 1500);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      setStatus('error');
      setStatusMessage('Failed to speak');
      showToast('Failed to speak text', 'error');
    };

    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [availableVoices, selectedVoice, selectedLanguage, speechRate, speechPitch, speechVolume]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setStatus('idle');
    setStatusMessage('Ready to listen');
  }, []);

  const toggleSpeaking = useCallback(() => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(inputText || transcript);
    }
  }, [isSpeaking, stopSpeaking, speak, inputText, transcript]);

  // ============================================
  // Utility Functions
  // ============================================
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const copyToClipboard = async (text) => {
    if (!text.trim()) {
      showToast('Nothing to copy', 'error');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied to clipboard!', 'success');
    } catch (err) {
      console.error('Failed to copy:', err);
      showToast('Failed to copy', 'error');
    }
  };

  const clearTranscript = () => {
    setTranscript('');
    setInputText('');
    setInterimTranscript('');
    showToast('Cleared', 'success');
  };

  const addToHistory = (text) => {
    if (!text.trim()) return;
    
    const newEntry = {
      id: Date.now(),
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };
    
    setHistory((prev) => [newEntry, ...prev.slice(0, 19)]);
  };

  const swapContent = () => {
    const temp = transcript;
    setTranscript(inputText);
    setInputText(temp);
  };

  // ============================================
  // Keyboard Shortcuts
  // ============================================
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Space to toggle listening (when not focused on input)
      if (e.code === 'Space' && document.activeElement.tagName !== 'TEXTAREA' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        toggleListening();
      }
      
      // Escape to stop everything
      if (e.code === 'Escape') {
        stopListening();
        stopSpeaking();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleListening, stopListening, stopSpeaking]);

  // ============================================
  // Render
  // ============================================
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container-custom max-w-6xl">
        {/* Header Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 mb-4">
            <Icons.Microphone className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              Voice Communication
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Voice<span className="text-gradient-primary">Link</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Real-time speech-to-text and text-to-speech conversion powered by AI. 
            Speak naturally and watch your words appear, or type and hear them spoken aloud.
          </motion.p>
        </motion.div>

        {/* Error Banner */}
        <AnimatePresence>
          {!isSupported && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-4 rounded-2xl bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800"
            >
              <div className="flex items-center gap-3">
                <Icons.AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-red-700 dark:text-red-400">Browser Not Supported</p>
                  <p className="text-sm text-red-600 dark:text-red-400/80">
                    Please use Chrome, Edge, or Safari for speech recognition features.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Badge */}
        <motion.div variants={fadeInUp} className="flex justify-center mb-8">
          <StatusBadge status={status} message={statusMessage} />
        </motion.div>

        {/* Main Content Area */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-6"
        >
          {/* Speech-to-Text Card */}
          <motion.div variants={fadeInUp} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Icons.Microphone className="w-4 h-4 text-purple-500" />
                </div>
                Speech to Text
              </h2>
              <div className="flex items-center gap-2">
                <ActionButton
                  onClick={() => setShowHistory(!showHistory)}
                  icon={Icons.History}
                  label="Show history"
                  variant={showHistory ? 'primary' : 'secondary'}
                  size="sm"
                />
                <ActionButton
                  onClick={() => setShowSettings(!showSettings)}
                  icon={Icons.Settings}
                  label="Settings"
                  variant={showSettings ? 'primary' : 'secondary'}
                  size="sm"
                />
              </div>
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-4 rounded-xl bg-slate-50 dark:bg-dark-800/50 space-y-4"
                >
                  <LanguageSelector
                    id="stt-language"
                    label="Recognition Language"
                    value={selectedLanguage}
                    onChange={setSelectedLanguage}
                    languages={SUPPORTED_LANGUAGES}
                  />
                  
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={continuousMode}
                      onChange={(e) => setContinuousMode(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      Continuous listening mode
                    </span>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Voice Visualizer */}
            <div className="mb-6">
              <VoiceVisualizer isActive={isListening} intensity={0.8} />
            </div>

            {/* Transcript Area */}
            <div className="relative mb-4">
              <div
                className="min-h-[200px] max-h-[300px] overflow-y-auto p-4 rounded-xl bg-slate-50 dark:bg-dark-800/50 border-2 border-slate-200 dark:border-dark-700 transition-colors focus-within:border-purple-500"
              >
                {transcript || interimTranscript ? (
                  <p className="text-slate-900 dark:text-white leading-relaxed">
                    {transcript}
                    {interimTranscript && (
                      <span className="text-slate-400 dark:text-slate-500 italic">
                        {' '}{interimTranscript}
                      </span>
                    )}
                  </p>
                ) : (
                  <p className="text-slate-400 dark:text-slate-500 italic">
                    {isListening 
                      ? "Listening... Start speaking" 
                      : "Click the microphone to start speaking..."}
                  </p>
                )}
              </div>
              
              {/* Character Count */}
              <div className="absolute bottom-2 right-2 text-xs text-slate-400 dark:text-slate-500">
                {transcript.length} characters
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ActionButton
                  onClick={() => copyToClipboard(transcript)}
                  icon={Icons.Copy}
                  label="Copy transcript"
                  disabled={!transcript}
                />
                <ActionButton
                  onClick={clearTranscript}
                  icon={Icons.Trash2}
                  label="Clear transcript"
                  variant="danger"
                  disabled={!transcript && !inputText}
                />
              </div>

              {/* Main Microphone Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={isListening ? pulseAnimation : {}}
                onClick={toggleListening}
                disabled={!isSupported}
                className={`
                  relative w-16 h-16 rounded-2xl
                  flex items-center justify-center
                  transition-all duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30'
                    : 'bg-gradient-to-br from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg shadow-purple-500/30'
                  }
                `}
                aria-label={isListening ? 'Stop listening' : 'Start listening'}
              >
                {isListening ? (
                  <Icons.Square className="w-6 h-6" />
                ) : (
                  <Icons.Microphone className="w-7 h-7" />
                )}
                
                {/* Pulse Ring */}
                {isListening && (
                  <span className="absolute inset-0 rounded-2xl animate-ping bg-red-500 opacity-20" />
                )}
              </motion.button>

              <div className="flex items-center gap-2">
                <ActionButton
                  onClick={swapContent}
                  icon={Icons.ArrowLeftRight}
                  label="Swap content"
                  disabled={!transcript && !inputText}
                />
                <ActionButton
                  onClick={() => speak(transcript)}
                  icon={Icons.Volume2}
                  label="Speak transcript"
                  variant="success"
                  disabled={!transcript || isSpeaking}
                />
              </div>
            </div>

            {/* Keyboard Shortcut Hint */}
            <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4">
              Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-dark-700 font-mono">Space</kbd> to toggle listening
            </p>
          </motion.div>

          {/* Text-to-Speech Card */}
          <motion.div variants={fadeInUp} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <Icons.Volume2 className="w-4 h-4 text-teal-500" />
                </div>
                Text to Speech
              </h2>
            </div>

            {/* Voice Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <VoiceSelector
                id="tts-voice"
                label="Voice"
                value={selectedVoice}
                onChange={setSelectedVoice}
                voices={availableVoices}
              />
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Speed: {speechRate.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speechRate}
                  onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-dark-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Pitch: {speechPitch.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speechPitch}
                  onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-dark-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Volume: {Math.round(speechVolume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={speechVolume}
                  onChange={(e) => setSpeechVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-dark-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
              </div>
            </div>

            {/* Text Input Area */}
            <div className="relative mb-4">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste text here to have it spoken aloud..."
                className="w-full min-h-[200px] max-h-[300px] p-4 rounded-xl bg-slate-50 dark:bg-dark-800/50 border-2 border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-y transition-colors focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 focus:outline-none"
                aria-label="Text to speak"
              />
              
              {/* Character Count */}
              <div className="absolute bottom-4 right-4 text-xs text-slate-400 dark:text-slate-500">
                {inputText.length} characters
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ActionButton
                  onClick={() => copyToClipboard(inputText)}
                  icon={Icons.Copy}
                  label="Copy text"
                  disabled={!inputText}
                />
                <ActionButton
                  onClick={() => setInputText('')}
                  icon={Icons.Trash2}
                  label="Clear text"
                  variant="danger"
                  disabled={!inputText}
                />
              </div>

              {/* Main Speaker Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={isSpeaking ? pulseAnimation : {}}
                onClick={toggleSpeaking}
                disabled={!inputText && !transcript}
                className={`
                  relative w-16 h-16 rounded-2xl
                  flex items-center justify-center
                  transition-all duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${isSpeaking
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30'
                    : 'bg-gradient-to-br from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white shadow-lg shadow-teal-500/30'
                  }
                `}
                aria-label={isSpeaking ? 'Stop speaking' : 'Start speaking'}
              >
                {isSpeaking ? (
                  <Icons.Square className="w-6 h-6" />
                ) : (
                  <Icons.Volume2 className="w-7 h-7" />
                )}
                
                {/* Pulse Ring */}
                {isSpeaking && (
                  <span className="absolute inset-0 rounded-2xl animate-ping bg-red-500 opacity-20" />
                )}
              </motion.button>

              <div className="flex items-center gap-2">
                <ActionButton
                  onClick={() => setInputText(transcript)}
                  icon={Icons.RotateCcw}
                  label="Use transcript"
                  disabled={!transcript}
                />
                <ActionButton
                  onClick={() => {
                    const text = inputText || transcript;
                    if (text) addToHistory(text);
                  }}
                  icon={Icons.History}
                  label="Save to history"
                  disabled={!inputText && !transcript}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* History Panel */}
        <AnimatePresence>
          {showHistory && history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6"
            >
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Icons.History className="w-5 h-5 text-purple-500" />
                    Recent History
                  </h3>
                  <button
                    onClick={() => setHistory([])}
                    className="text-sm text-slate-500 hover:text-red-500 transition-colors"
                  >
                    Clear all
                  </button>
                </div>
                
                <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin">
                  {history.map((item) => (
                    <HistoryItem
                      key={item.id}
                      text={item.text}
                      timestamp={item.timestamp}
                      onSpeak={speak}
                      onCopy={copyToClipboard}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Tips */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mt-8"
        >
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              💡 Quick Tips
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: 'Speak Clearly',
                  description: 'Speak at a normal pace with clear pronunciation for best results.',
                },
                {
                  title: 'Reduce Background Noise',
                  description: 'Find a quiet environment to improve recognition accuracy.',
                },
                {
                  title: 'Use Punctuation',
                  description: 'Say "period", "comma", or "question mark" to add punctuation.',
                },
              ].map((tip, index) => (
                <div key={index} className="p-4 rounded-xl bg-slate-50 dark:bg-dark-800/50">
                  <h4 className="font-medium text-slate-900 dark:text-white mb-1">
                    {tip.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
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

export default VoiceLink;