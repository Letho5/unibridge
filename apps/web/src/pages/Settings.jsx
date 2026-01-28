/* ============================================================
   🌉 UNIBRIDGE - SETTINGS PAGE
   Comprehensive App Settings & Preferences
   ============================================================ */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSettingsStore from '../stores/settingsStore';

/* ============================================
   🎨 ICON COMPONENTS
   ============================================ */

const Icons = {
  Settings: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),

  Sun: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  ),

  Moon: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  ),

  Microphone: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  ),

  Hand: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  ),

  Bell: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),

  FileText: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
    </svg>
  ),

  Accessibility: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="4" r="1" />
      <path d="m18 19 1-7-6 1" />
      <path d="m5 8 3-3 5.5 3-2.36 3.5" />
      <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
      <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
    </svg>
  ),

  Palette: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),

  Volume2: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  ),

  Eye: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),

  Type: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" x2="15" y1="20" y2="20" />
      <line x1="12" x2="12" y1="4" y2="20" />
    </svg>
  ),

  Zap: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
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

  Info: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),

  Monitor: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  ),

  Smartphone: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  ),

  Globe: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),

  Shield: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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

  ChevronRight: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),

  ChevronDown: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),

  Download: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  ),

  Upload: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
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

  HelpCircle: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  ),

  Contrast: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" />
    </svg>
  ),

  Minimize2: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 14 10 14 10 20" />
      <polyline points="20 10 14 10 14 4" />
      <line x1="14" x2="21" y1="10" y2="3" />
      <line x1="3" x2="10" y1="21" y2="14" />
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
   🧩 SUB-COMPONENTS
   ============================================ */

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
      focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${checked ? 'bg-purple-600' : 'bg-slate-300 dark:bg-dark-600'}
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

// Slider Component
const Slider = ({ value, onChange, min = 0, max = 100, step = 1, label, unit = '', color = 'purple' }) => {
  const colorClasses = {
    purple: 'accent-purple-500',
    teal: 'accent-teal-500',
    pink: 'accent-pink-500',
    blue: 'accent-blue-500',
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
        <span className="text-sm font-medium text-slate-900 dark:text-white">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={`w-full h-2 bg-slate-200 dark:bg-dark-700 rounded-lg appearance-none cursor-pointer ${colorClasses[color]}`}
      />
    </div>
  );
};

// Setting Row Component
const SettingRow = ({ icon: Icon, title, description, children, iconColor = 'purple' }) => {
  const colorClasses = {
    purple: 'bg-purple-500/10 text-purple-500',
    teal: 'bg-teal-500/10 text-teal-500',
    pink: 'bg-pink-500/10 text-pink-500',
    blue: 'bg-blue-500/10 text-blue-500',
    amber: 'bg-amber-500/10 text-amber-500',
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-dark-800 last:border-0">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {Icon && (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClasses[iconColor]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-medium text-slate-900 dark:text-white">
            {title}
          </h4>
          {description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="ml-4 flex-shrink-0">
        {children}
      </div>
    </div>
  );
};

// Settings Section Component
const SettingsSection = ({ icon: Icon, title, description, children, iconColor = 'purple', defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const colorClasses = {
    purple: 'bg-purple-500/10 text-purple-500',
    teal: 'bg-teal-500/10 text-teal-500',
    pink: 'bg-pink-500/10 text-pink-500',
    blue: 'bg-blue-500/10 text-blue-500',
    amber: 'bg-amber-500/10 text-amber-500',
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="glass-card overflow-hidden"
    >
      {/* Section Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-dark-800/50 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[iconColor]}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {description}
              </p>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icons.ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </button>

      {/* Section Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-dark-800">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Select Component
const Select = ({ value, onChange, options, label }) => (
  <div className="relative">
    {label && (
      <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
        {label}
      </label>
    )}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-dark-800 border-0 text-slate-900 dark:text-white text-sm appearance-none cursor-pointer focus:ring-2 focus:ring-purple-500 focus:outline-none"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <Icons.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
  </div>
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
    info: { bg: 'bg-purple-500', icon: Icons.Info },
    warning: { bg: 'bg-amber-500', icon: Icons.AlertCircle },
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

// Confirm Dialog Component
const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-dark-900 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
            <Icons.AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white text-center mb-2">
            {title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-center text-sm">
            {message}
          </p>
        </div>
        <div className="flex border-t border-slate-200 dark:border-dark-700">
          <button
            onClick={onClose}
            className="flex-1 py-4 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-dark-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-4 text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-l border-slate-200 dark:border-dark-700"
          >
            Reset
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ============================================
   🎯 MAIN SETTINGS COMPONENT
   ============================================ */

const Settings = () => {
  // Get settings from store
  const {
    darkMode,
    toggleDarkMode,
    setDarkMode,
    voiceSettings,
    updateVoiceSettings,
    signSettings,
    updateSignSettings,
    soundSettings,
    updateSoundSettings,
    ocrSettings,
    updateOcrSettings,
    accessibilitySettings,
    updateAccessibilitySettings,
    resetAllSettings,
  } = useSettingsStore();

  // Local state
  const [toasts, setToasts] = useState([]);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Toast functions
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Handle setting changes with feedback
  const handleSettingChange = (category, key, value) => {
    switch (category) {
      case 'voice':
        updateVoiceSettings({ [key]: value });
        break;
      case 'sign':
        updateSignSettings({ [key]: value });
        break;
      case 'sound':
        updateSoundSettings({ [key]: value });
        break;
      case 'ocr':
        updateOcrSettings({ [key]: value });
        break;
      case 'accessibility':
        updateAccessibilitySettings({ [key]: value });
        break;
      default:
        break;
    }
    showToast('Setting updated', 'success');
  };

  // Handle reset all settings
  const handleResetAll = () => {
    resetAllSettings();
    setShowResetDialog(false);
    showToast('All settings reset to defaults', 'success');
  };

  // Language options for OCR
  const languageOptions = [
    { value: 'eng', label: 'English' },
    { value: 'spa', label: 'Spanish' },
    { value: 'fra', label: 'French' },
    { value: 'deu', label: 'German' },
    { value: 'ita', label: 'Italian' },
    { value: 'por', label: 'Portuguese' },
    { value: 'chi_sim', label: 'Chinese (Simplified)' },
    { value: 'chi_tra', label: 'Chinese (Traditional)' },
    { value: 'jpn', label: 'Japanese' },
    { value: 'kor', label: 'Korean' },
    { value: 'ara', label: 'Arabic' },
    { value: 'hin', label: 'Hindi' },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container-custom max-w-4xl">
        {/* Header Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 mb-4">
            <Icons.Settings className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              App Configuration
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Settings
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Customize UniBridge to match your preferences. All settings are saved automatically.
          </motion.p>
        </motion.div>

        {/* Settings Sections */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Appearance Settings */}
          <SettingsSection
            icon={Icons.Palette}
            title="Appearance"
            description="Theme and display preferences"
            iconColor="purple"
          >
            <SettingRow
              icon={darkMode ? Icons.Moon : Icons.Sun}
              title="Dark Mode"
              description="Switch between light and dark theme"
              iconColor="purple"
            >
              <ToggleSwitch
                checked={darkMode}
                onChange={toggleDarkMode}
              />
            </SettingRow>

            <SettingRow
              icon={Icons.Monitor}
              title="System Theme"
              description="Follow your device's theme setting"
              iconColor="purple"
            >
              <ToggleSwitch
                checked={false}
                onChange={(value) => {
                  if (value) {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    setDarkMode(prefersDark);
                    showToast('Now following system theme', 'info');
                  }
                }}
              />
            </SettingRow>
          </SettingsSection>

          {/* Voice Settings */}
          <SettingsSection
            icon={Icons.Microphone}
            title="Voice Settings"
            description="Speech recognition and synthesis options"
            iconColor="purple"
          >
            <div className="space-y-6">
              <Slider
                label="Speech Rate"
                value={voiceSettings.speechRate}
                onChange={(value) => handleSettingChange('voice', 'speechRate', value)}
                min={0.5}
                max={2}
                step={0.1}
                unit="x"
                color="purple"
              />

              <Slider
                label="Speech Pitch"
                value={voiceSettings.speechPitch}
                onChange={(value) => handleSettingChange('voice', 'speechPitch', value)}
                min={0.5}
                max={2}
                step={0.1}
                color="purple"
              />

              <Slider
                label="Speech Volume"
                value={Math.round(voiceSettings.speechVolume * 100)}
                onChange={(value) => handleSettingChange('voice', 'speechVolume', value / 100)}
                min={0}
                max={100}
                step={5}
                unit="%"
                color="purple"
              />

              <div className="pt-2">
                <SettingRow
                  icon={Icons.Volume2}
                  title="Auto-Speak Results"
                  description="Automatically speak recognized text"
                  iconColor="purple"
                >
                  <ToggleSwitch
                    checked={voiceSettings.autoSpeak}
                    onChange={(value) => handleSettingChange('voice', 'autoSpeak', value)}
                  />
                </SettingRow>

                <SettingRow
                  icon={Icons.Microphone}
                  title="Continuous Listening"
                  description="Keep listening after speech ends"
                  iconColor="purple"
                >
                  <ToggleSwitch
                    checked={voiceSettings.continuousListening}
                    onChange={(value) => handleSettingChange('voice', 'continuousListening', value)}
                  />
                </SettingRow>
              </div>
            </div>
          </SettingsSection>

          {/* Sign Language Settings */}
          <SettingsSection
            icon={Icons.Hand}
            title="Sign Language Settings"
            description="Hand tracking and recognition options"
            iconColor="teal"
          >
            <div className="space-y-6">
              <Slider
                label="Confidence Threshold"
                value={Math.round(signSettings.confidenceThreshold * 100)}
                onChange={(value) => handleSettingChange('sign', 'confidenceThreshold', value / 100)}
                min={50}
                max={95}
                step={5}
                unit="%"
                color="teal"
              />

              <div className="pt-2">
                <SettingRow
                  icon={Icons.Eye}
                  title="Show Hand Landmarks"
                  description="Display tracking points on hands"
                  iconColor="teal"
                >
                  <ToggleSwitch
                    checked={signSettings.showHandLandmarks}
                    onChange={(value) => handleSettingChange('sign', 'showHandLandmarks', value)}
                  />
                </SettingRow>

                <SettingRow
                  title="Mirror Video"
                  description="Flip camera like a mirror"
                  iconColor="teal"
                >
                  <ToggleSwitch
                    checked={signSettings.mirrorVideo}
                    onChange={(value) => handleSettingChange('sign', 'mirrorVideo', value)}
                  />
                </SettingRow>

                <SettingRow
                  icon={Icons.Zap}
                  title="Auto-Capture Signs"
                  description="Automatically add letters when held steady"
                  iconColor="teal"
                >
                  <ToggleSwitch
                    checked={signSettings.autoCapture}
                    onChange={(value) => handleSettingChange('sign', 'autoCapture', value)}
                  />
                </SettingRow>
              </div>
            </div>
          </SettingsSection>

          {/* Sound Alert Settings */}
          <SettingsSection
            icon={Icons.Bell}
            title="Sound Alert Settings"
            description="Audio detection and notification options"
            iconColor="pink"
          >
            <div className="space-y-6">
              <SettingRow
                icon={Icons.Bell}
                title="Enable Sound Alerts"
                description="Get notified about detected sounds"
                iconColor="pink"
              >
                <ToggleSwitch
                  checked={soundSettings.enableAlerts}
                  onChange={(value) => handleSettingChange('sound', 'enableAlerts', value)}
                />
              </SettingRow>

              <Slider
                label="Alert Volume"
                value={Math.round(soundSettings.alertVolume * 100)}
                onChange={(value) => handleSettingChange('sound', 'alertVolume', value / 100)}
                min={0}
                max={100}
                step={5}
                unit="%"
                color="pink"
              />

              <div className="pt-2">
                <SettingRow
                  icon={Icons.Vibrate}
                  title="Vibration"
                  description="Vibrate device on alerts"
                  iconColor="pink"
                >
                  <ToggleSwitch
                    checked={soundSettings.vibrationEnabled}
                    onChange={(value) => handleSettingChange('sound', 'vibrationEnabled', value)}
                  />
                </SettingRow>

                <SettingRow
                  icon={Icons.Flashlight}
                  title="Flash Screen"
                  description="Flash screen on alerts"
                  iconColor="pink"
                >
                  <ToggleSwitch
                    checked={soundSettings.flashEnabled}
                    onChange={(value) => handleSettingChange('sound', 'flashEnabled', value)}
                  />
                </SettingRow>
              </div>

              {/* Sound Detection Options */}
              <div className="pt-4 border-t border-slate-100 dark:border-dark-800">
                <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-4">
                  Detect These Sounds
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'doorbell', label: 'Doorbell' },
                    { key: 'alarm', label: 'Alarm' },
                    { key: 'babyCry', label: 'Baby Crying' },
                    { key: 'phone', label: 'Phone Ring' },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-dark-800/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={soundSettings.notificationSounds[item.key]}
                        onChange={(e) => {
                          updateSoundSettings({
                            notificationSounds: {
                              ...soundSettings.notificationSounds,
                              [item.key]: e.target.checked,
                            },
                          });
                          showToast('Setting updated', 'success');
                        }}
                        className="w-4 h-4 rounded border-slate-300 text-pink-500 focus:ring-pink-500"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </SettingsSection>

          {/* OCR Settings */}
          <SettingsSection
            icon={Icons.FileText}
            title="Text Recognition (OCR)"
            description="Image text extraction options"
            iconColor="blue"
          >
            <div className="space-y-6">
              <Select
                label="Recognition Language"
                value={ocrSettings.language}
                onChange={(value) => handleSettingChange('ocr', 'language', value)}
                options={languageOptions}
              />

              <div className="pt-2">
                <SettingRow
                  icon={Icons.Contrast}
                  title="Enhance Contrast"
                  description="Improve recognition on low-contrast images"
                  iconColor="blue"
                >
                  <ToggleSwitch
                    checked={ocrSettings.enhanceContrast}
                    onChange={(value) => handleSettingChange('ocr', 'enhanceContrast', value)}
                  />
                </SettingRow>

                <SettingRow
                  icon={Icons.Volume2}
                  title="Auto-Read Text"
                  description="Automatically speak extracted text"
                  iconColor="blue"
                >
                  <ToggleSwitch
                    checked={ocrSettings.autoRead}
                    onChange={(value) => handleSettingChange('ocr', 'autoRead', value)}
                  />
                </SettingRow>
              </div>
            </div>
          </SettingsSection>

          {/* Accessibility Settings */}
          <SettingsSection
            icon={Icons.Accessibility}
            title="Accessibility"
            description="Make UniBridge work better for you"
            iconColor="amber"
          >
            <SettingRow
              icon={Icons.Contrast}
              title="High Contrast"
              description="Increase contrast for better visibility"
              iconColor="amber"
            >
              <ToggleSwitch
                checked={accessibilitySettings.highContrast}
                onChange={(value) => handleSettingChange('accessibility', 'highContrast', value)}
              />
            </SettingRow>

            <SettingRow
              icon={Icons.Type}
              title="Large Text"
              description="Increase text size throughout the app"
              iconColor="amber"
            >
              <ToggleSwitch
                checked={accessibilitySettings.largeText}
                onChange={(value) => handleSettingChange('accessibility', 'largeText', value)}
              />
            </SettingRow>

            <SettingRow
              icon={Icons.Minimize2}
              title="Reduce Motion"
              description="Minimize animations and transitions"
              iconColor="amber"
            >
              <ToggleSwitch
                checked={accessibilitySettings.reduceMotion}
                onChange={(value) => handleSettingChange('accessibility', 'reduceMotion', value)}
              />
            </SettingRow>

            <SettingRow
              icon={Icons.Monitor}
              title="Screen Reader Optimized"
              description="Enhance compatibility with screen readers"
              iconColor="amber"
            >
              <ToggleSwitch
                checked={accessibilitySettings.screenReaderOptimized}
                onChange={(value) => handleSettingChange('accessibility', 'screenReaderOptimized', value)}
              />
            </SettingRow>
          </SettingsSection>

          {/* Data & Privacy Section */}
          <SettingsSection
            icon={Icons.Shield}
            title="Data & Privacy"
            description="Your data stays on your device"
            iconColor="purple"
            defaultOpen={false}
          >
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-3">
                  <Icons.Shield className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-green-800 dark:text-green-400">
                      Privacy First
                    </h4>
                    <p className="text-xs text-green-700 dark:text-green-400/80 mt-1">
                      All AI processing happens locally on your device. We don't collect, 
                      store, or transmit any of your voice, video, or text data.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <SettingRow
                  icon={Icons.Download}
                  title="Export Settings"
                  description="Download your settings as a file"
                  iconColor="purple"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const settings = {
                        darkMode,
                        voiceSettings,
                        signSettings,
                        soundSettings,
                        ocrSettings,
                        accessibilitySettings,
                      };
                      const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'unibridge-settings.json';
                      a.click();
                      showToast('Settings exported', 'success');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-dark-800 hover:bg-slate-200 dark:hover:bg-dark-700 text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors"
                  >
                    Export
                  </motion.button>
                </SettingRow>

                <SettingRow
                  icon={Icons.Trash2}
                  title="Clear All Data"
                  description="Remove all saved settings and history"
                  iconColor="pink"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      localStorage.clear();
                      showToast('All data cleared', 'success');
                      window.location.reload();
                    }}
                    className="px-4 py-2 rounded-xl bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium transition-colors"
                  >
                    Clear
                  </motion.button>
                </SettingRow>
              </div>
            </div>
          </SettingsSection>

          {/* Reset All Settings */}
          <motion.div variants={fadeInUp}>
            <button
              onClick={() => setShowResetDialog(true)}
              className="w-full p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-dark-700 hover:border-red-300 dark:hover:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all group"
            >
              <div className="flex items-center justify-center gap-3">
                <Icons.RotateCcw className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" />
                <span className="text-slate-600 dark:text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400 font-medium transition-colors">
                  Reset All Settings to Defaults
                </span>
              </div>
            </button>
          </motion.div>

          {/* App Info */}
          <motion.div variants={fadeInUp} className="text-center py-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">U</span>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-900 dark:text-white">UniBridge</h3>
                <p className="text-xs text-slate-500 dark:text-slate-500">Version 1.0.0</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-500 max-w-md mx-auto">
              Breaking barriers, building bridges. Made with ❤️ for accessibility.
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <a href="#" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
                Documentation
              </a>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <a href="#" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
                GitHub
              </a>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <a href="#" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
                Report Issue
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Reset Confirmation Dialog */}
      <AnimatePresence>
        {showResetDialog && (
          <ConfirmDialog
            isOpen={showResetDialog}
            onClose={() => setShowResetDialog(false)}
            onConfirm={handleResetAll}
            title="Reset All Settings?"
            message="This will restore all settings to their default values. Your preferences will be lost."
          />
        )}
      </AnimatePresence>

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

export default Settings;