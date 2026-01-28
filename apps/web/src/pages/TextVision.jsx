/* ============================================================
   🌉 UNIBRIDGE - TEXTVISION PAGE
   OCR - Extract Text from Images using Tesseract.js
   ============================================================ */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createWorker } from 'tesseract.js';
import useSettingsStore from '../stores/settingsStore';

/* ============================================
   🎨 ICON COMPONENTS
   ============================================ */

const Icons = {
  FileText: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  ),

  Image: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  ),

  Upload: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  ),

  Camera: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),

  Scan: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <line x1="7" x2="17" y1="12" y2="12" />
    </svg>
  ),

  Copy: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
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

  Trash2: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  ),

  Download: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  ),

  RotateCw: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  ),

  ZoomIn: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
      <line x1="11" x2="11" y1="8" y2="14" />
      <line x1="8" x2="14" y1="11" y2="11" />
    </svg>
  ),

  ZoomOut: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
      <line x1="8" x2="14" y1="11" y2="11" />
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

  Info: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),

  Settings: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),

  Globe: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),

  X: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),

  ChevronDown: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
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

  History: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  ),

  Sparkles: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  ),

  Clipboard: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  ),

  Contrast: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" />
    </svg>
  ),

  Type: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" x2="15" y1="20" y2="20" />
      <line x1="12" x2="12" y1="4" y2="20" />
    </svg>
  ),

  Layers: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3 }
  }
};

/* ============================================
   📋 SUPPORTED LANGUAGES
   ============================================ */

const OCR_LANGUAGES = [
  { code: 'eng', name: 'English', flag: '🇺🇸' },
  { code: 'spa', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fra', name: 'French', flag: '🇫🇷' },
  { code: 'deu', name: 'German', flag: '🇩🇪' },
  { code: 'ita', name: 'Italian', flag: '🇮🇹' },
  { code: 'por', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'rus', name: 'Russian', flag: '🇷🇺' },
  { code: 'jpn', name: 'Japanese', flag: '🇯🇵' },
  { code: 'kor', name: 'Korean', flag: '🇰🇷' },
  { code: 'chi_sim', name: 'Chinese (Simplified)', flag: '🇨🇳' },
  { code: 'chi_tra', name: 'Chinese (Traditional)', flag: '🇹🇼' },
  { code: 'ara', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hin', name: 'Hindi', flag: '🇮🇳' },
  { code: 'tha', name: 'Thai', flag: '🇹🇭' },
  { code: 'vie', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'nld', name: 'Dutch', flag: '🇳🇱' },
  { code: 'pol', name: 'Polish', flag: '🇵🇱' },
  { code: 'tur', name: 'Turkish', flag: '🇹🇷' },
];

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
    loading: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-600 dark:text-blue-400',
      dot: 'bg-blue-500',
      pulse: true,
    },
    processing: {
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      text: 'text-amber-600 dark:text-amber-400',
      dot: 'bg-amber-500',
      pulse: true,
    },
    success: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-600 dark:text-green-400',
      dot: 'bg-green-500',
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

// Progress Bar Component
const ProgressBar = ({ progress, status }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-600 dark:text-slate-400">{status}</span>
        <span className="font-medium text-blue-600 dark:text-blue-400">{Math.round(progress)}%</span>
      </div>
      <div className="h-3 bg-slate-200 dark:bg-dark-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
        />
      </div>
    </div>
  );
};

// Language Selector Component
const LanguageSelector = ({ value, onChange }) => {
  const selectedLang = OCR_LANGUAGES.find(l => l.code === value);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        Recognition Language
      </label>
      <div className="relative">
        <Icons.Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-10 py-3 rounded-xl bg-white dark:bg-dark-800 border-2 border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white appearance-none cursor-pointer transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
        >
          {OCR_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
        <Icons.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
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
      focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${checked ? 'bg-blue-600' : 'bg-slate-300 dark:bg-dark-600'}
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

// Action Button Component
const ActionButton = ({ onClick, icon: Icon, label, variant = 'secondary', size = 'md', disabled = false, loading = false }) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40',
    secondary: 'bg-slate-100 dark:bg-dark-800 hover:bg-slate-200 dark:hover:bg-dark-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-dark-700',
    danger: 'bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400',
    success: 'bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-600 dark:text-green-400',
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
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        relative
      `}
      aria-label={label}
      title={label}
    >
      {loading ? (
        <Icons.Loader className="w-5 h-5 animate-spin" />
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
    success: { bg: 'bg-green-500', icon: Icons.Check },
    error: { bg: 'bg-red-500', icon: Icons.AlertCircle },
    info: { bg: 'bg-blue-500', icon: Icons.Info },
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

// History Item Component
const HistoryItem = ({ item, onSelect, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-dark-800/50 hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors group cursor-pointer"
      onClick={() => onSelect(item)}
    >
      <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-dark-700 overflow-hidden flex-shrink-0">
        {item.thumbnail && (
          <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
          {item.text.substring(0, 50)}...
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-500">
          {item.timestamp} • {item.language}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(item.id);
        }}
        className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-all"
      >
        <Icons.Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

/* ============================================
   🎯 MAIN TEXTVISION COMPONENT
   ============================================ */

const TextVision = () => {
  // ============================================
  // State Management
  // ============================================
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState('');
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('Ready to scan');
  const [error, setError] = useState(null);
  
  // Settings state
  const [selectedLanguage, setSelectedLanguage] = useState('eng');
  const [enhanceContrast, setEnhanceContrast] = useState(true);
  const [autoRead, setAutoRead] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // History state
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  
  // Toast state
  const [toasts, setToasts] = useState([]);
  
  // Speaking state
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Refs
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const workerRef = useRef(null);
  const canvasRef = useRef(null);

  // Get settings from store
  const { ocrSettings, updateOcrSettings } = useSettingsStore();

  // ============================================
  // Toast Functions
  // ============================================
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ============================================
  // Initialize Tesseract Worker
  // ============================================
  const initWorker = useCallback(async () => {
    try {
      setStatus('loading');
      setStatusMessage('Loading OCR engine...');
      setProgressStatus('Initializing...');
      setProgress(10);

      const worker = await createWorker({
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(50 + (m.progress * 50));
            setProgressStatus('Recognizing text...');
          } else if (m.status === 'loading language traineddata') {
            setProgress(20 + (m.progress * 30));
            setProgressStatus(`Loading ${selectedLanguage} language data...`);
          }
        },
      });

      await worker.loadLanguage(selectedLanguage);
      await worker.initialize(selectedLanguage);
      
      workerRef.current = worker;
      setProgress(100);
      setStatus('idle');
      setStatusMessage('Ready to scan');
      
      return worker;
    } catch (err) {
      console.error('Failed to initialize Tesseract:', err);
      setError('Failed to load OCR engine. Please refresh and try again.');
      setStatus('error');
      setStatusMessage('OCR engine failed');
      throw err;
    }
  }, [selectedLanguage]);

  // ============================================
  // Image Processing
  // ============================================
  const enhanceImage = useCallback((imageData) => {
    if (!enhanceContrast) return imageData;

    const canvas = canvasRef.current;
    if (!canvas) return imageData;

    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    return new Promise((resolve) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // Get image data
        const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageDataObj.data;
        
        // Apply contrast enhancement
        const factor = 1.5; // Contrast factor
        
        for (let i = 0; i < data.length; i += 4) {
          // Apply contrast to RGB channels
          data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
          data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
          data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
        }
        
        ctx.putImageData(imageDataObj, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = imageData;
    });
  }, [enhanceContrast]);

  // ============================================
  // OCR Processing
  // ============================================
  const processImage = useCallback(async () => {
    if (!selectedImage) {
      showToast('Please select an image first', 'error');
      return;
    }

    try {
      setIsProcessing(true);
      setProgress(0);
      setStatus('processing');
      setStatusMessage('Processing image...');
      setError(null);
      setExtractedText('');

      // Initialize worker if needed
      let worker = workerRef.current;
      if (!worker) {
        worker = await initWorker();
      }

      // Enhance image if enabled
      setProgressStatus('Preparing image...');
      const processedImage = await enhanceImage(imagePreview);
      setProgress(40);

      // Perform OCR
      setProgressStatus('Recognizing text...');
      const { data: { text, confidence } } = await worker.recognize(processedImage);

      setExtractedText(text.trim());
      setProgress(100);
      setStatus('success');
      setStatusMessage(`Extracted with ${Math.round(confidence)}% confidence`);

      // Add to history
      const historyItem = {
        id: Date.now(),
        text: text.trim(),
        thumbnail: imagePreview,
        language: OCR_LANGUAGES.find(l => l.code === selectedLanguage)?.name || selectedLanguage,
        timestamp: new Date().toLocaleString(),
        confidence: Math.round(confidence),
      };
      setHistory((prev) => [historyItem, ...prev.slice(0, 19)]);

      showToast('Text extracted successfully!', 'success');

      // Auto-read if enabled
      if (autoRead && text.trim()) {
        speakText(text.trim());
      }

    } catch (err) {
      console.error('OCR processing failed:', err);
      setError('Failed to extract text. Please try again with a clearer image.');
      setStatus('error');
      setStatusMessage('Extraction failed');
      showToast('Failed to extract text', 'error');
    } finally {
      setIsProcessing(false);
    }
  }, [selectedImage, imagePreview, initWorker, enhanceImage, selectedLanguage, autoRead, showToast]);

  // ============================================
  // Image Selection Handlers
  // ============================================
  const handleFileSelect = useCallback((event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file', 'error');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showToast('Image size must be less than 10MB', 'error');
      return;
    }

    setSelectedImage(file);
    setExtractedText('');
    setError(null);
    setStatus('idle');
    setStatusMessage('Image selected - Ready to scan');

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  }, [showToast]);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelect({ target: { files: [file] } });
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const clearImage = useCallback(() => {
    setSelectedImage(null);
    setImagePreview(null);
    setExtractedText('');
    setError(null);
    setStatus('idle');
    setStatusMessage('Ready to scan');
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  }, []);

  // ============================================
  // Text Actions
  // ============================================
  const copyText = useCallback(async () => {
    if (!extractedText.trim()) {
      showToast('No text to copy', 'error');
      return;
    }

    try {
      await navigator.clipboard.writeText(extractedText);
      showToast('Copied to clipboard!', 'success');
    } catch (err) {
      showToast('Failed to copy', 'error');
    }
  }, [extractedText, showToast]);

  const speakText = useCallback((text) => {
    const textToSpeak = text || extractedText;
    if (!textToSpeak.trim()) {
      showToast('No text to speak', 'error');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = selectedLanguage === 'eng' ? 'en-US' : selectedLanguage;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setIsSpeaking(false);
      showToast('Failed to speak text', 'error');
    };

    window.speechSynthesis.speak(utterance);
  }, [extractedText, selectedLanguage, showToast]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const downloadText = useCallback(() => {
    if (!extractedText.trim()) {
      showToast('No text to download', 'error');
      return;
    }

    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `extracted-text-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Text downloaded!', 'success');
  }, [extractedText, showToast]);

  // ============================================
  // History Functions
  // ============================================
  const selectHistoryItem = useCallback((item) => {
    setExtractedText(item.text);
    setImagePreview(item.thumbnail);
    setShowHistory(false);
    showToast('Loaded from history', 'info');
  }, [showToast]);

  const deleteHistoryItem = useCallback((id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    showToast('Removed from history', 'info');
  }, [showToast]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    showToast('History cleared', 'success');
  }, [showToast]);

  // ============================================
  // Cleanup
  // ============================================
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  // Reinitialize worker when language changes
  useEffect(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  }, [selectedLanguage]);

  // ============================================
  // Render
  // ============================================
  return (
    <div className="min-h-screen py-8 px-4">
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />

      <div className="container-custom max-w-6xl">
        {/* Header Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-8"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 mb-4">
            <Icons.FileText className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Optical Character Recognition
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Text<span className="text-gradient-purple-blue">Vision</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Extract text from images using advanced OCR technology. 
            Supports 18+ languages with high accuracy.
          </motion.p>
        </motion.div>

        {/* Error Banner */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 rounded-2xl bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800"
            >
              <div className="flex items-center gap-3">
                <Icons.AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-red-700 dark:text-red-400">Error</p>
                  <p className="text-sm text-red-600 dark:text-red-400/80">{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-500 hover:text-red-700 text-xl font-bold"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Badge */}
        <motion.div variants={fadeInUp} className="flex justify-center mb-6">
          <StatusBadge status={status} message={statusMessage} />
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Image Upload */}
          <motion.div variants={fadeInUp} className="space-y-6">
            {/* Upload Card */}
            <div className="glass-card overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-dark-700">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Icons.Image className="w-4 h-4 text-blue-500" />
                  </div>
                  Image Input
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className={`p-2 rounded-xl transition-colors ${
                      showSettings 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-dark-700'
                    }`}
                  >
                    <Icons.Settings className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className={`p-2 rounded-xl transition-colors ${
                      showHistory 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-dark-700'
                    }`}
                  >
                    <Icons.History className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Settings Panel */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-b border-slate-200 dark:border-dark-700 overflow-hidden"
                  >
                    <div className="p-4 space-y-4">
                      <LanguageSelector
                        value={selectedLanguage}
                        onChange={setSelectedLanguage}
                      />

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Enhance Contrast
                          </div>
                          <div className="text-xs text-slate-500">
                            Improve recognition on low-contrast images
                          </div>
                        </div>
                        <ToggleSwitch
                          checked={enhanceContrast}
                          onChange={setEnhanceContrast}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Auto-Read Text
                          </div>
                          <div className="text-xs text-slate-500">
                            Automatically speak extracted text
                          </div>
                        </div>
                        <ToggleSwitch
                          checked={autoRead}
                          onChange={setAutoRead}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Upload Area */}
              <div className="p-4">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Selected"
                      className="w-full h-64 object-contain rounded-xl bg-slate-100 dark:bg-dark-800"
                    />
                    <button
                      onClick={clearImage}
                      className="absolute top-2 right-2 p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      <Icons.X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-slate-300 dark:border-dark-600 rounded-2xl p-8 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-500/10 flex items-center justify-center"
                    >
                      <Icons.Upload className="w-8 h-8 text-blue-500" />
                    </motion.div>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">
                      Drag & drop an image here, or click to browse
                    </p>
                    <p className="text-sm text-slate-400 dark:text-slate-500">
                      Supports JPG, PNG, GIF, WebP (max 10MB)
                    </p>
                  </div>
                )}

                {/* Hidden file inputs */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Upload Buttons */}
              <div className="p-4 pt-0 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-dark-800 hover:bg-slate-200 dark:hover:bg-dark-700 text-slate-700 dark:text-slate-300 font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Icons.Upload className="w-5 h-5" />
                  <span>Upload Image</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-dark-800 hover:bg-slate-200 dark:hover:bg-dark-700 text-slate-700 dark:text-slate-300 font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Icons.Camera className="w-5 h-5" />
                  <span>Take Photo</span>
                </motion.button>
              </div>

              {/* Progress Bar */}
              {isProcessing && (
                <div className="p-4 pt-0">
                  <ProgressBar progress={progress} status={progressStatus} />
                </div>
              )}

              {/* Extract Button */}
              <div className="p-4 pt-0">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={processImage}
                  disabled={!selectedImage || isProcessing}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30"
                >
                  {isProcessing ? (
                    <>
                      <Icons.Loader className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Icons.Scan className="w-5 h-5" />
                      <span>Extract Text</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Extracted Text */}
          <motion.div variants={fadeInUp} className="space-y-6">
            {/* Extracted Text Card */}
            <div className="glass-card overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-dark-700">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Icons.Type className="w-4 h-4 text-green-500" />
                  </div>
                  Extracted Text
                </h2>
                <span className="text-xs text-slate-500 dark:text-slate-500">
                  {extractedText.length} characters
                </span>
              </div>

              {/* Text Display */}
              <div className="p-4">
                <div className="min-h-[300px] max-h-[400px] overflow-y-auto p-4 rounded-xl bg-slate-50 dark:bg-dark-800/50 border-2 border-slate-200 dark:border-dark-700">
                  {extractedText ? (
                    <p className="text-slate-900 dark:text-white whitespace-pre-wrap leading-relaxed">
                      {extractedText}
                    </p>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <Icons.FileText className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
                      <p className="text-slate-500 dark:text-slate-500">
                        Extracted text will appear here
                      </p>
                      <p className="text-sm text-slate-400 dark:text-slate-600 mt-1">
                        Upload an image and click Extract Text
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Text Actions */}
              <div className="p-4 pt-0 flex flex-wrap gap-2">
                <ActionButton
                  onClick={copyText}
                  icon={Icons.Copy}
                  label="Copy text"
                  disabled={!extractedText}
                />
                <ActionButton
                  onClick={() => isSpeaking ? stopSpeaking() : speakText()}
                  icon={isSpeaking ? Icons.VolumeX : Icons.Volume2}
                  label={isSpeaking ? "Stop speaking" : "Speak text"}
                  disabled={!extractedText}
                  variant={isSpeaking ? 'danger' : 'secondary'}
                />
                <ActionButton
                  onClick={downloadText}
                  icon={Icons.Download}
                  label="Download text"
                  disabled={!extractedText}
                />
                <ActionButton
                  onClick={() => setExtractedText('')}
                  icon={Icons.Trash2}
                  label="Clear text"
                  variant="danger"
                  disabled={!extractedText}
                />
              </div>
            </div>

            {/* Quick Tips */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                💡 Tips for Better Results
              </h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Use high-resolution images with clear, readable text</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Ensure good lighting and minimal shadows</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Select the correct language for better accuracy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Enable contrast enhancement for faded or low-contrast text</span>
                </li>
              </ul>
            </div>

            {/* Supported Languages */}
            <div className="glass-card p-6">              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Icons.Globe className="w-5 h-5 text-blue-500" />
                Supported Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {OCR_LANGUAGES.slice(0, 8).map((lang) => (
                  <span
                    key={lang.code}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedLanguage === lang.code
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {lang.flag} {lang.name}
                  </span>
                ))}
                <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-slate-100 dark:bg-dark-800 text-slate-500 dark:text-slate-500">
                  +{OCR_LANGUAGES.length - 8} more
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* History Panel (Slide-over) */}
        <AnimatePresence>
          {showHistory && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setShowHistory(false)}
              />

              {/* Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-dark-900 shadow-2xl z-50 overflow-hidden"
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-dark-700">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <Icons.History className="w-5 h-5 text-blue-500" />
                      Scan History
                    </h2>
                    <button
                      onClick={() => setShowHistory(false)}
                      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors"
                    >
                      <Icons.X className="w-5 h-5 text-slate-500" />
                    </button>
                  </div>

                  {/* History List */}
                  <div className="flex-1 overflow-y-auto p-4">
                    {history.length > 0 ? (
                      <div className="space-y-3">
                        <AnimatePresence>
                          {history.map((item) => (
                            <HistoryItem
                              key={item.id}
                              item={item}
                              onSelect={selectHistoryItem}
                              onDelete={deleteHistoryItem}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center py-12">
                        <Icons.History className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
                        <p className="text-slate-500 dark:text-slate-500">No scan history yet</p>
                        <p className="text-sm text-slate-400 dark:text-slate-600 mt-1">
                          Your scanned images will appear here
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  {history.length > 0 && (
                    <div className="p-4 border-t border-slate-200 dark:border-dark-700">
                      <button
                        onClick={clearHistory}
                        className="w-full py-3 rounded-xl bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 font-medium flex items-center justify-center gap-2 transition-colors"
                      >
                        <Icons.Trash2 className="w-5 h-5" />
                        Clear All History
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Info Card */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mt-8 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-start gap-3">
            <Icons.Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-medium mb-1">How TextVision Works</p>
              <p>
                TextVision uses Tesseract.js, a powerful OCR (Optical Character Recognition) engine 
                that runs entirely in your browser. Your images are processed locally and never 
                uploaded to any server, ensuring complete privacy. The first scan may take longer 
                as the language data needs to be downloaded.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-8 grid md:grid-cols-3 gap-4"
        >
          <motion.div variants={fadeInUp} className="glass-card p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-purple-500/10 flex items-center justify-center">
              <Icons.Sparkles className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">High Accuracy</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Advanced algorithms for precise text extraction
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="glass-card p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-green-500/10 flex items-center justify-center">
              <Icons.Globe className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">18+ Languages</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Support for multiple languages and scripts
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="glass-card p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <Icons.Layers className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">100% Private</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              All processing happens locally in your browser
            </p>
          </motion.div>
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

      {/* Custom Styles */}
      <style>{`
        .glass-card {
          @apply bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700;
        }
        
        .text-gradient-purple-blue {
          background: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .container-custom {
          @apply mx-auto px-4;
        }
      `}</style>
    </div>
  );
};

export default TextVision;