/* ============================================================
   🌉 UNIBRIDGE - HEADER COMPONENT
   Competition-Ready Navigation with Glass Effect
   ============================================================ */

import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useSettingsStore from '../../stores/settingsStore';
import { Menu, X, Mic, Hand, Bell, FileText, Settings, Sun, Moon, User } from 'lucide-react';

/* ============================================
   🎨 ICON COMPONENTS
   ============================================ */

const Icons = {
  // Logo Icon
  Logo: ({ className }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#14B8A6" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#logoGradient)" />
      <path
        d="M8 16C8 11.5817 11.5817 8 16 8V8C20.4183 8 24 11.5817 24 16V24H16C11.5817 24 8 20.4183 8 16V16Z"
        fill="white"
        fillOpacity="0.9"
      />
      <circle cx="16" cy="16" r="3" fill="url(#logoGradient)" />
    </svg>
  ),

  // Sun Icon (Light Mode)
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

  // Moon Icon (Dark Mode)
  Moon: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  ),

  // Menu Icon (Hamburger)
  Menu: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  ),

  // Close Icon (X)
  Close: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),

  // Microphone Icon
  Microphone: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  ),

  // Hand Icon
  Hand: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  ),

  // Bell Icon
  Bell: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),

  // File Text Icon
  FileText: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
    </svg>
  ),

  // Settings Icon
  Settings: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),

  // Home Icon
  Home: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),

  // External Link Icon
  ExternalLink: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  ),

  // Chevron Down Icon
  ChevronDown: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
};

/* ============================================
   🎬 ANIMATION VARIANTS
   ============================================ */

const headerVariants = {
  visible: {
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  hidden: {
    y: -100,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    x: '100%',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const mobileMenuItemVariants = {
  closed: { opacity: 0, x: 50 },
  open: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  }),
};

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

/* ============================================
   🧩 SUB-COMPONENTS
   ============================================ */

// Theme Toggle Button
const ThemeToggle = ({ isDark, onToggle, className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className={`
        relative p-2.5 rounded-xl
        bg-slate-100 dark:bg-dark-800
        hover:bg-slate-200 dark:hover:bg-dark-700
        border border-slate-200 dark:border-dark-700
        transition-colors duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2
        ${className}
      `}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Icons.Sun className="w-5 h-5 text-amber-500" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Icons.Moon className="w-5 h-5 text-slate-600" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// Navigation Link Component
const NavItem = ({ to, icon: Icon, label, color, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const colorClasses = {
    purple: 'hover:text-purple-600 dark:hover:text-purple-400',
    teal: 'hover:text-teal-600 dark:hover:text-teal-400',
    pink: 'hover:text-pink-600 dark:hover:text-pink-400',
    blue: 'hover:text-blue-600 dark:hover:text-blue-400',
  };

  const activeColorClasses = {
    purple: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10',
    teal: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10',
    pink: 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-500/10',
    blue: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10',
  };

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={`
        relative flex items-center gap-2 px-4 py-2 rounded-xl
        text-sm font-medium
        transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2
        ${isActive
          ? activeColorClasses[color] || activeColorClasses.purple
          : `text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-800 ${colorClasses[color] || colorClasses.purple}`
        }
      `}
      aria-current={isActive ? 'page' : undefined}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
      
      {/* Active Indicator */}
      {isActive && (
        <motion.div
          layoutId="activeNavIndicator"
          className="absolute inset-0 rounded-xl border-2 border-current opacity-20"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </NavLink>
  );
};

// Mobile Navigation Link
const MobileNavItem = ({ to, icon: Icon, label, color, index, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const colorClasses = {
    purple: {
      active: 'bg-purple-500 text-white',
      icon: 'bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white',
    },
    teal: {
      active: 'bg-teal-500 text-white',
      icon: 'bg-teal-500/10 text-teal-500 group-hover:bg-teal-500 group-hover:text-white',
    },
    pink: {
      active: 'bg-pink-500 text-white',
      icon: 'bg-pink-500/10 text-pink-500 group-hover:bg-pink-500 group-hover:text-white',
    },
    blue: {
      active: 'bg-blue-500 text-white',
      icon: 'bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white',
    },
  };

  const colors = colorClasses[color] || colorClasses.purple;

  return (
    <motion.div
      custom={index}
      variants={mobileMenuItemVariants}
    >
      <NavLink
        to={to}
        onClick={onClick}
        className={`
          group flex items-center gap-4 p-4 rounded-2xl
          transition-all duration-300
          ${isActive
            ? colors.active
            : 'hover:bg-slate-100 dark:hover:bg-dark-800'
          }
        `}
        aria-current={isActive ? 'page' : undefined}
      >
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center
          transition-all duration-300
          ${isActive ? 'bg-white/20' : colors.icon}
        `}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className={`font-semibold ${isActive ? '' : 'text-slate-900 dark:text-white'}`}>
            {label}
          </div>
          <div className={`text-sm ${isActive ? 'text-white/70' : 'text-slate-500 dark:text-slate-400'}`}>
            {getNavDescription(to)}
          </div>
        </div>
        <motion.div
          initial={false}
          animate={{ x: isActive ? 0 : -10, opacity: isActive ? 1 : 0 }}
          className="w-2 h-2 rounded-full bg-white"
        />
      </NavLink>
    </motion.div>
  );
};

// Helper function for nav descriptions
const getNavDescription = (path) => {
  const descriptions = {
    '/': 'Back to home',
    '/voice': 'Speech & text conversion',
    '/sign': 'Sign language recognition',
    '/sound': 'Sound alerts & detection',
    '/ocr': 'Text extraction from images',
    '/settings': 'App preferences',
  };
  return descriptions[path] || '';
};

/* ============================================
   🎯 MAIN HEADER COMPONENT
   ============================================ */

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  // Get theme from store
  const { darkMode, toggleDarkMode } = useSettingsStore();

  // Navigation items
  const navItems = [
    { name: 'Profile', path: '/profile', icon: User },
    { to: '/', icon: Icons.Home, label: 'Home', color: 'purple' },
    { to: '/voice', icon: Icons.Microphone, label: 'VoiceLink', color: 'purple' },
    { to: '/sign', icon: Icons.Hand, label: 'SignLink', color: 'teal' },
    { to: '/sound', icon: Icons.Bell, label: 'SoundAlert', color: 'pink' },
    { to: '/ocr', icon: Icons.FileText, label: 'TextVision', color: 'blue' },
  ];

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled past threshold
      setIsScrolled(currentScrollY > 20);
      
      // Hide/show header based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>

      {/* Main Header */}
      <motion.header
        initial="visible"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={headerVariants}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${isScrolled
            ? 'py-2'
            : 'py-4'
          }
        `}
      >
        <div className="container-custom">
          <nav
            className={`
              relative flex items-center justify-between
              px-4 lg:px-6 py-3 rounded-2xl
              transition-all duration-300
              ${isScrolled
                ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl shadow-lg shadow-black/5 border border-white/20 dark:border-white/10'
                : 'bg-transparent'
              }
            `}
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg"
              aria-label="UniBridge Home"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icons.Logo className="w-10 h-10" />
              </motion.div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  Uni
                </span>
                <span className="text-xl font-bold text-gradient-primary">
                  Bridge
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  color={item.color}
                />
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Settings Link (Desktop) */}
              <NavLink
                to="/settings"
                className={({ isActive }) => `
                  hidden md:flex items-center gap-2 px-4 py-2 rounded-xl
                  text-sm font-medium transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500
                  ${isActive
                    ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-800'
                  }
                `}
              >
                <Icons.Settings className="w-4 h-4" />
                <span>Settings</span>
              </NavLink>

              {/* Theme Toggle */}
              <ThemeToggle
                isDark={darkMode}
                onToggle={toggleDarkMode}
              />

              {/* CTA Button (Desktop) */}
              <Link
                to="/voice"
                className="hidden md:flex btn-primary btn-sm"
              >
                <span>Get Started</span>
              </Link>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 transition-colors hover:bg-slate-200 dark:hover:bg-dark-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <Icons.Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </motion.button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              id="mobile-menu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white dark:bg-dark-900 shadow-2xl lg:hidden overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-dark-800">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3"
                >
                  <Icons.Logo className="w-10 h-10" />
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    UniBridge
                  </span>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-dark-800 transition-colors hover:bg-slate-200 dark:hover:bg-dark-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                  aria-label="Close menu"
                >
                  <Icons.Close className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </motion.button>
              </div>

              {/* Menu Content */}
              <div className="p-4">
                {/* Navigation Links */}
                <motion.nav
                  initial="closed"
                  animate="open"
                  className="space-y-2"
                  aria-label="Mobile navigation"
                >
                  {navItems.map((item, index) => (
                    <MobileNavItem
                      key={item.to}
                      to={item.to}
                      icon={item.icon}
                      label={item.label}
                      color={item.color}
                      index={index}
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                  ))}

                  {/* Settings Link */}
                  <MobileNavItem
                    to="/settings"
                    icon={Icons.Settings}
                    label="Settings"
                    color="purple"
                    index={navItems.length}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                </motion.nav>

                {/* Divider */}
                <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-dark-700 to-transparent" />

                {/* Theme Toggle Section */}
                <motion.div
                  custom={navItems.length + 1}
                  variants={mobileMenuItemVariants}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-800"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        Appearance
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {darkMode ? 'Dark mode enabled' : 'Light mode enabled'}
                      </div>
                    </div>
                    <ThemeToggle
                      isDark={darkMode}
                      onToggle={toggleDarkMode}
                    />
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  custom={navItems.length + 2}
                  variants={mobileMenuItemVariants}
                  className="mt-6"
                >
                  <Link
                    to="/voice"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-gradient w-full justify-center py-4 text-base"
                  >
                    Start Communicating
                  </Link>
                </motion.div>

                {/* Footer Info */}
                <motion.div
                  custom={navItems.length + 3}
                  variants={mobileMenuItemVariants}
                  className="mt-8 text-center"
                >
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    UniBridge v1.0
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    Breaking barriers, building bridges
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
};

export default Header;