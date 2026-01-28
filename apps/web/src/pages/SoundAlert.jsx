/* ============================================================
   🌉 UNIBRIDGE - SOUNDALERT PAGE
   Real-time Sound Detection & Visual Alerts
   ============================================================ */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSettingsStore from '../stores/settingsStore';

/* ============================================
   🎨 ICON COMPONENTS
   ============================================ */

const Icons = {
  Bell: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),

  BellOff: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5" />
      <path d="M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  ),

  BellRing: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      <path d="M4 2C2.8 3.7 2 5.7 2 8" />
      <path d="M22 8c0-2.3-.8-4.3-2-6" />
    </svg>
  ),

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

  AlertTriangle: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
  ),

  AlertCircle: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  ),

  Phone: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),

  Baby: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
      <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
    </svg>
  ),

  DoorOpen: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 4h3a2 2 0 0 1 2 2v14" />
      <path d="M2 20h3" />
      <path d="M13 20h9" />
      <path d="M10 12v.01" />
      <path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z" />
    </svg>
  ),

  Siren: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 12a5 5 0 0 1 5-5v0a5 5 0 0 1 5 5v6H7v-6Z" />
      <path d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1H5v-1Z" />
      <path d="M12 7V3" />
      <path d="M3 12H1" />
      <path d="M23 12h-2" />
      <path d="m4.6 4.6 1.4 1.4" />
      <path d="m18 6 1.4-1.4" />
    </svg>
  ),

  Settings: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
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

  Check: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),

  X: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),

  Info: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),

  History: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
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

  Vibrate: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m2 8 2 2-2 2 2 2-2 2" />
      <path d="m22 8-2 2 2 2-2 2 2 2" />
      <rect width="8" height="14" x="8" y="5" rx="1" />
    </svg>
  ),

  Flashlight: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6c0 2-2 2-2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4V2h12z" />
      <line x1="6" x2="18" y1="6" y2="6" />
      <line x1="12" x2="12" y1="12" y2="12" />
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

  Activity: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),

  Waves: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
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
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const alertAnimation = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  },
  exit: { 
    scale: 0, 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

/* ============================================
   🔊 SOUND TYPES CONFIGURATION
   ============================================ */

const SOUND_TYPES = {
  doorbell: {
    id: 'doorbell',
    name: 'Doorbell',
    icon: Icons.DoorOpen,
    color: 'purple',
    bgColor: 'bg-purple-500',
    textColor: 'text-purple-500',
    lightBg: 'bg-purple-100 dark:bg-purple-900/30',
    description: 'Doorbell or knocking sounds',
    frequency: { min: 800, max: 2000 },
    minDuration: 200,
  },
  alarm: {
    id: 'alarm',
    name: 'Alarm',
    icon: Icons.Siren,
    color: 'red',
    bgColor: 'bg-red-500',
    textColor: 'text-red-500',
    lightBg: 'bg-red-100 dark:bg-red-900/30',
    description: 'Smoke alarm, fire alarm, security alarm',
    frequency: { min: 2500, max: 4000 },
    minDuration: 500,
  },
  babyCry: {
    id: 'babyCry',
    name: 'Baby Crying',
    icon: Icons.Baby,
    color: 'pink',
    bgColor: 'bg-pink-500',
    textColor: 'text-pink-500',
    lightBg: 'bg-pink-100 dark:bg-pink-900/30',
    description: 'Baby crying or infant sounds',
    frequency: { min: 300, max: 600 },
    minDuration: 800,
  },
  phone: {
    id: 'phone',
    name: 'Phone Ring',
    icon: Icons.Phone,
    color: 'blue',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-500',
    lightBg: 'bg-blue-100 dark:bg-blue-900/30',
    description: 'Phone ringing or notification sounds',
    frequency: { min: 1000, max: 3000 },
    minDuration: 300,
  },
};

/* ============================================
   🧩 SUB-COMPONENTS
   ============================================ */

// Status Badge Component
const StatusBadge = ({ status, message }) => {
  const statusConfig = {
    idle: {
      bg: 'bg-slate-100 dark:bg-slate-800',
      text: 'text-slate-600 dark:text-slate-400',
      dot: 'bg-slate-400',
    },
    listening: {
      bg: 'bg-pink-100 dark:bg-pink-900/30',
      text: 'text-pink-600 dark:text-pink-400',
      dot: 'bg-pink-500',
      pulse: true,
    },
    detecting: {
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      text: 'text-amber-600 dark:text-amber-400',
      dot: 'bg-amber-500',
      pulse: true,
    },
    alert: {
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-600 dark:text-red-400',
      dot: 'bg-red-500',
      pulse: true,
    },
    error: {
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-600 dark:text-red-400',
      dot: 'bg-red-500',
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

// Audio Visualizer Component
const AudioVisualizer = ({ isActive, audioLevel = 0, frequencyData = [] }) => {
  const bars = 32;
  
  return (
    <div className="h-32 flex items-end justify-center gap-1 px-4">
      {Array.from({ length: bars }).map((_, index) => {
        const level = frequencyData[index] || 0;
        const height = isActive ? Math.max(4, (level / 255) * 100) : 4;
        
        return (
          <motion.div
            key={index}
            className={`w-2 rounded-full ${
              isActive 
                ? height > 60 
                  ? 'bg-red-500' 
                  : height > 30 
                    ? 'bg-pink-500' 
                    : 'bg-pink-400'
                : 'bg-slate-300 dark:bg-slate-600'
            }`}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.05 }}
          />
        );
      })}
    </div>
  );
};

// Volume Meter Component
const VolumeMeter = ({ level, threshold }) => {
  const percentage = Math.min(100, Math.max(0, level));
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-600 dark:text-slate-400">Volume Level</span>
        <span className="font-medium text-slate-900 dark:text-white">{Math.round(percentage)}%</span>
      </div>
      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
          style={{ left: `${threshold}%` }}
        />
        <motion.div
          className={`h-full rounded-full ${
            percentage > threshold 
              ? 'bg-gradient-to-r from-pink-500 to-red-500' 
              : 'bg-gradient-to-r from-pink-400 to-pink-500'
          }`}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500">
        Red line indicates detection threshold ({threshold}%)
      </p>
    </div>
  );
};

// Sound Type Toggle Component
const SoundTypeToggle = ({ soundType, enabled, onToggle }) => {
  const config = SOUND_TYPES[soundType];
  const IconComponent = config.icon;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onToggle(soundType)}
      className={`
        relative p-4 rounded-2xl border-2 transition-all duration-200
        ${enabled 
          ? `${config.lightBg} border-current ${config.textColor}` 
          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div className={`
          w-10 h-10 rounded-xl flex items-center justify-center
          ${enabled ? config.bgColor + ' text-white' : 'bg-slate-200 dark:bg-slate-700'}
        `}>
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="text-left">
          <div className={`font-medium ${enabled ? config.textColor : 'text-slate-600 dark:text-slate-400'}`}>
            {config.name}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-500">
            {config.description}
          </div>
        </div>
      </div>
      
      <div className={`
        absolute top-2 right-2 w-3 h-3 rounded-full
        ${enabled ? config.bgColor : 'bg-slate-300 dark:bg-slate-600'}
      `}>
        {enabled && (
          <Icons.Check className="w-3 h-3 text-white" />
        )}
      </div>
    </motion.button>
  );
};

// Alert Popup Component
const AlertPopup = ({ alert, onDismiss }) => {
  const config = SOUND_TYPES[alert.type];
  const IconComponent = config.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(alert.id);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [alert.id, onDismiss]);

  return (
    <motion.div
      variants={alertAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`
        relative overflow-hidden rounded-2xl shadow-2xl
        ${config.lightBg} border-2 border-current ${config.textColor}
      `}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.3, 0, 0.3]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`absolute inset-0 ${config.bgColor} opacity-20`}
      />

      <div className="relative p-6">
        <div className="flex items-start gap-4">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className={`w-14 h-14 rounded-2xl ${config.bgColor} text-white flex items-center justify-center shadow-lg`}
          >
            <IconComponent className="w-8 h-8" />
          </motion.div>

          <div className="flex-1">
            <h3 className={`text-xl font-bold ${config.textColor}`}>
              {config.name} Detected!
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              {alert.timestamp}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-slate-500">Confidence:</span>
              <div className="h-1.5 w-20 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${config.bgColor} rounded-full`}
                  style={{ width: `${alert.confidence}%` }}
                />
              </div>
              <span className="text-xs font-medium">{alert.confidence}%</span>
            </div>
          </div>

          <button
            onClick={() => onDismiss(alert.id)}
            className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-black/20 transition-colors"
          >
            <Icons.X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// History Item Component
const HistoryItem = ({ item, onDelete }) => {
  const config = SOUND_TYPES[item.type];
  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
    >
      <div className={`w-10 h-10 rounded-xl ${config.lightBg} ${config.textColor} flex items-center justify-center`}>
        <IconComponent className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`font-medium ${config.textColor}`}>{config.name}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
            {item.confidence}%
          </span>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-500">
          {item.timestamp}
        </div>
      </div>
      <button
        onClick={() => onDelete(item.id)}
        className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-all"
      >
        <Icons.Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

// Toggle Switch Component
const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className={`
      relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full
      border-2 border-transparent transition-colors duration-200 ease-in-out
      focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${checked ? 'bg-pink-500' : 'bg-slate-300 dark:bg-slate-600'}
    `}
  >
    <span
      className={`
        pointer-events-none inline-block h-5 w-5 transform rounded-full
        bg-white shadow-lg ring-0 transition duration-200 ease-in-out
        ${checked ? 'translate-x-5' : 'translate-x-0'}
      `}
    />
  </button>
);

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeConfig = {
    success: { bg: 'bg-green-500', icon: Icons.Check },
    error: { bg: 'bg-red-500', icon: Icons.AlertCircle },
    info: { bg: 'bg-pink-500', icon: Icons.Info },
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

/* ============================================
   🎯 MAIN SOUNDALERT COMPONENT
   ============================================ */

const SoundAlert = () => {
  // State Management
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('Ready to listen');
  
  const [audioLevel, setAudioLevel] = useState(0);
  const [frequencyData, setFrequencyData] = useState([]);
  const [detectionThreshold, setDetectionThreshold] = useState(30);
  
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [alertHistory, setAlertHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  
  const [showSettings, setShowSettings] = useState(false);
  const [enabledSounds, setEnabledSounds] = useState({
    doorbell: true,
    alarm: true,
    babyCry: true,
    phone: true,
  });
  const [enableVibration, setEnableVibration] = useState(true);
  const [enableFlash, setEnableFlash] = useState(false);
  
  const [toasts, setToasts] = useState([]);

  // Refs
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastDetectionRef = useRef({});

  const { soundSettings } = useSettingsStore();

  // Toast Functions
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Notification Sound
  const playNotificationSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      console.warn('Could not play notification sound:', e);
    }
  }, []);

  // Alert Functions
  const triggerAlert = useCallback((soundType, confidence) => {
    const now = Date.now();
    const lastDetection = lastDetectionRef.current[soundType] || 0;
    
    if (now - lastDetection < 3000) return;
    lastDetectionRef.current[soundType] = now;

    const alert = {
      id: now,
      type: soundType,
      confidence: Math.round(confidence),
      timestamp: new Date().toLocaleTimeString(),
    };

    setActiveAlerts((prev) => [alert, ...prev].slice(0, 3));
    setAlertHistory((prev) => [alert, ...prev].slice(0, 50));

    if (enableVibration && navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }

    if (enableFlash) {
      document.body.classList.add('flash-alert');
      setTimeout(() => {
        document.body.classList.remove('flash-alert');
      }, 500);
    }

    setStatus('alert');
    setStatusMessage(`${SOUND_TYPES[soundType].name} detected!`);
    playNotificationSound();
  }, [enableVibration, enableFlash, playNotificationSound]);

  const dismissAlert = useCallback((id) => {
    setActiveAlerts((prev) => prev.filter((a) => a.id !== id));
    if (activeAlerts.length <= 1) {
      setStatus('listening');
      setStatusMessage('Listening for sounds...');
    }
  }, [activeAlerts.length]);

  const deleteHistoryItem = useCallback((id) => {
    setAlertHistory((prev) => prev.filter((item) => item.id !== id));
    showToast('Alert removed from history', 'info');
  }, [showToast]);

  const clearHistory = useCallback(() => {
    setAlertHistory([]);
    showToast('History cleared', 'success');
  }, [showToast]);

  // Sound Detection Logic
  const detectSound = useCallback((frequencyData, averageLevel) => {
    if (averageLevel < detectionThreshold) return;

    const frequencies = Array.from(frequencyData);
    const maxFrequencyIndex = frequencies.indexOf(Math.max(...frequencies));
    const dominantFrequency = (maxFrequencyIndex / frequencies.length) * 22050;

    Object.keys(enabledSounds).forEach((soundType) => {
      if (!enabledSounds[soundType]) return;
      
      const config = SOUND_TYPES[soundType];
      
      if (dominantFrequency >= config.frequency.min && dominantFrequency <= config.frequency.max) {
        const levelConfidence = Math.min(100, (averageLevel / detectionThreshold) * 50);
        const frequencyConfidence = 50;
        const totalConfidence = Math.min(95, levelConfidence + frequencyConfidence);
        
        if (totalConfidence > 60) {
          triggerAlert(soundType, totalConfidence);
        }
      }
    });
  }, [enabledSounds, detectionThreshold, triggerAlert]);

  // Audio Analysis Loop
  const analyzeAudio = useCallback(() => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    analyserRef.current.getByteFrequencyData(dataArray);
    
    const average = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
    const normalizedLevel = (average / 255) * 100;
    
    setAudioLevel(normalizedLevel);
    setFrequencyData(Array.from(dataArray.slice(0, 32)));
    
    if (normalizedLevel > detectionThreshold) {
      setStatus('detecting');
      setStatusMessage('Sound detected...');
      detectSound(dataArray, normalizedLevel);
    } else if (status !== 'alert') {
      setStatus('listening');
      setStatusMessage('Listening for sounds...');
    }

    animationFrameRef.current = requestAnimationFrame(analyzeAudio);
  }, [detectionThreshold, detectSound, status]);

  // Start/Stop Listening
  const startListening = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;

      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.8;

      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);

      setIsListening(true);
      setIsLoading(false);
      setStatus('listening');
      setStatusMessage('Listening for sounds...');

      analyzeAudio();
      showToast('Now listening for sounds', 'success');

    } catch (err) {
      console.error('Failed to start listening:', err);
      setIsLoading(false);
      
      if (err.name === 'NotAllowedError') {
        setError('Microphone permission denied. Please allow access to use sound detection.');
      } else if (err.name === 'NotFoundError') {
        setError('No microphone found. Please connect a microphone and try again.');
      } else {
        setError('Failed to access microphone. Please try again.');
      }
      
      setStatus('error');
      setStatusMessage('Microphone error');
    }
  };

  const stopListening = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    analyserRef.current = null;

    setIsListening(false);
    setAudioLevel(0);
    setFrequencyData([]);
    setStatus('idle');
    setStatusMessage('Ready to listen');
    setActiveAlerts([]);

    showToast('Stopped listening', 'info');
  }, [showToast]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const toggleSoundType = (soundType) => {
    setEnabledSounds((prev) => ({
      ...prev,
      [soundType]: !prev[soundType],
    }));
  };

  // Cleanup on Unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  // Demo Mode
  const simulateDetection = (soundType) => {
    if (!isListening) {
      showToast('Start listening first', 'error');
      return;
    }
    
    const confidence = 70 + Math.random() * 25;
    triggerAlert(soundType, confidence);
  };

  // Render
  return (
    <div className="min-h-screen py-8 px-4">
      {/* Flash Alert Overlay */}
      <div className="flash-overlay fixed inset-0 pointer-events-none z-40 opacity-0 bg-white transition-opacity duration-100" />

      <style>{`
        .flash-alert .flash-overlay {
          opacity: 0.8;
        }
        
        @keyframes flash {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.8; }
        }
        
        .flash-alert .flash-overlay {
          animation: flash 0.5s ease-in-out;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {           background: rgb(148 163 184 / 0.3);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(148 163 184 / 0.5);
        }
      `}</style>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-sm font-medium mb-4">
            <Icons.Bell className="w-4 h-4" />
            Sound Detection
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            SoundAlert
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Real-time sound detection with visual and vibration alerts for important sounds
          </p>
        </motion.div>

        {/* Status Badge */}
        <motion.div variants={fadeInUp} className="flex justify-center">
          <StatusBadge status={status} message={statusMessage} />
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
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto p-1 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg transition-colors"
              >
                <Icons.X className="w-4 h-4 text-red-500" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Alerts */}
        <AnimatePresence>
          {activeAlerts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              {activeAlerts.map((alert) => (
                <AlertPopup
                  key={alert.id}
                  alert={alert}
                  onDismiss={dismissAlert}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Control Card */}
        <motion.div
          variants={fadeInUp}
          className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          {/* Audio Visualizer */}
          <div className="p-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-800 border-b border-slate-200 dark:border-slate-700">
            <AudioVisualizer
              isActive={isListening}
              audioLevel={audioLevel}
              frequencyData={frequencyData}
            />
          </div>

          {/* Controls */}
          <div className="p-6 space-y-6">
            {/* Main Button */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleListening}
                disabled={isLoading}
                className={`
                  relative w-full max-w-sm py-4 px-8 rounded-2xl font-semibold text-lg
                  transition-all duration-300 flex items-center justify-center gap-3
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30'
                    : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-lg shadow-pink-500/30'
                  }
                `}
              >
                {isLoading ? (
                  <>
                    <Icons.Loader className="w-6 h-6 animate-spin" />
                    Starting...
                  </>
                ) : isListening ? (
                  <>
                    <Icons.MicrophoneOff className="w-6 h-6" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Icons.Microphone className="w-6 h-6" />
                    Start Listening
                  </>
                )}

                {isListening && (
                  <motion.span
                    animate={pulseAnimation}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                  />
                )}
              </motion.button>
            </div>

            {/* Volume Meter */}
            {isListening && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <VolumeMeter level={audioLevel} threshold={detectionThreshold} />
              </motion.div>
            )}

            {/* Threshold Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Detection Sensitivity
                </label>
                <span className="text-sm text-slate-500">{detectionThreshold}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                value={detectionThreshold}
                onChange={(e) => setDetectionThreshold(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:bg-pink-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:shadow-lg"
              />
              <p className="text-xs text-slate-500">
                Lower values = more sensitive, Higher values = less sensitive
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sound Types */}
        <motion.div
          variants={fadeInUp}
          className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Icons.Waves className="w-5 h-5 text-pink-500" />
              Sound Types to Detect
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.keys(SOUND_TYPES).map((soundType) => (
              <SoundTypeToggle
                key={soundType}
                soundType={soundType}
                enabled={enabledSounds[soundType]}
                onToggle={toggleSoundType}
              />
            ))}
          </div>
        </motion.div>

        {/* Alert Settings */}
        <motion.div
          variants={fadeInUp}
          className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Icons.Settings className="w-5 h-5 text-pink-500" />
              Alert Settings
            </h2>
          </div>

          <div className="space-y-4">
            {/* Vibration Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                  <Icons.Vibrate className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">Vibration</div>
                  <div className="text-sm text-slate-500">Vibrate device on alert</div>
                </div>
              </div>
              <ToggleSwitch
                checked={enableVibration}
                onChange={setEnableVibration}
              />
            </div>

            {/* Flash Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                  <Icons.Flashlight className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">Screen Flash</div>
                  <div className="text-sm text-slate-500">Flash screen on alert</div>
                </div>
              </div>
              <ToggleSwitch
                checked={enableFlash}
                onChange={setEnableFlash}
              />
            </div>
          </div>
        </motion.div>

        {/* Demo Buttons (for testing) */}
        {isListening && (
          <motion.div
            variants={fadeInUp}
            className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Icons.Play className="w-5 h-5 text-pink-500" />
                Test Alerts (Demo)
              </h2>
            </div>

            <p className="text-sm text-slate-500 mb-4">
              Click to simulate sound detection for testing purposes
            </p>

            <div className="flex flex-wrap gap-2">
              {Object.keys(SOUND_TYPES).map((soundType) => {
                const config = SOUND_TYPES[soundType];
                const IconComponent = config.icon;
                return (
                  <button
                    key={soundType}
                    onClick={() => simulateDetection(soundType)}
                    disabled={!enabledSounds[soundType]}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm
                      transition-all disabled:opacity-50 disabled:cursor-not-allowed
                      ${config.lightBg} ${config.textColor} hover:shadow-md
                    `}
                  >
                    <IconComponent className="w-4 h-4" />
                    {config.name}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* History Section */}
        <motion.div
          variants={fadeInUp}
          className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                <Icons.History className="w-5 h-5 text-pink-500" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-slate-900 dark:text-white">Alert History</div>
                <div className="text-sm text-slate-500">{alertHistory.length} alerts recorded</div>
              </div>
            </div>
            <motion.div
              animate={{ rotate: showHistory ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </button>

          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-slate-200 dark:border-slate-700"
              >
                <div className="p-6">
                  {alertHistory.length > 0 ? (
                    <>
                      <div className="flex justify-end mb-4">
                        <button
                          onClick={clearHistory}
                          className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                        >
                          <Icons.Trash2 className="w-4 h-4" />
                          Clear All
                        </button>
                      </div>
                      <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
                        <AnimatePresence>
                          {alertHistory.map((item) => (
                            <HistoryItem
                              key={item.id}
                              item={item}
                              onDelete={deleteHistoryItem}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Icons.Bell className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                      <p className="text-slate-500">No alerts recorded yet</p>
                      <p className="text-sm text-slate-400">Detected sounds will appear here</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Info Card */}
        <motion.div
          variants={fadeInUp}
          className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-start gap-3">
            <Icons.Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-medium mb-1">How it works</p>
              <p>
                SoundAlert uses your devices microphone to detect sounds and provides visual
                and vibration alerts. For best results, ensure you are in a quiet environment
                and the microphone has clear access to the sounds you want to detect.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

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

export default SoundAlert;