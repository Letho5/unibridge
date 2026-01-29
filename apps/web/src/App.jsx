/* ============================================================
   🌉 UNIBRIDGE - MAIN APP COMPONENT
   Root component with routing configuration
   ============================================================ */

import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
// Layout
import Layout from './components/layout/Layout';

// Pages
import Profile from './pages/Profile';
import Home from './pages/Home';
import VoiceLink from './pages/VoiceLink';
import Profile from './pages/Profile';
import SignLink from './pages/SignLink';
import SoundAlert from './pages/SoundAlert';
import TextVision from './pages/TextVision';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Store
import useSettingsStore from './stores/settingsStore';

/* ============================================
   🎬 PAGE TRANSITION VARIANTS
   ============================================ */

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ============================================
   🧩 ANIMATED PAGE WRAPPER
   ============================================ */

const AnimatedPage = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="enter"
    exit="exit"
  >
    {children}
  </motion.div>
);

/* ============================================
   🎯 MAIN APP COMPONENT
   ============================================ */

const App = () => {
  const location = useLocation();
  const { accessibilitySettings, darkMode } = useSettingsStore();

  // Apply accessibility settings
  useEffect(() => {
    const html = document.documentElement;
    
    // High contrast mode
    if (accessibilitySettings.highContrast) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }

    // Large text mode
    if (accessibilitySettings.largeText) {
      html.classList.add('large-text');
    } else {
      html.classList.remove('large-text');
    }

    // Reduce motion
    if (accessibilitySettings.reduceMotion) {
      html.classList.add('reduce-motion');
    } else {
      html.classList.remove('reduce-motion');
    }
  }, [accessibilitySettings]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Update page title based on route
  useEffect(() => {
    const titles = {
      '/': 'UniBridge - Universal Accessibility Platform',
      '/voice': 'VoiceLink - UniBridge',
      '/sign': 'SignLink - UniBridge',
      '/sound': 'SoundAlert - UniBridge',
      '/ocr': 'TextVision - UniBridge',
      '/settings': 'Settings - UniBridge',
    };
    
    document.title = titles[location.pathname] || 'UniBridge';
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          {/* Home Page */}
          <Route
            index
            element={
              <AnimatedPage>
                <Home />
              </AnimatedPage>
            }
          />
          <Route path="profile" element={<Profile />} />

          {/* VoiceLink - Speech to Text & Text to Speech */}
          <Route
            path="voice"
            element={
              <AnimatedPage>
                <VoiceLink />
              </AnimatedPage>
            }
          />
          <Route path="profile" element={<Profile />} />

          {/* SignLink - Sign Language Recognition */}
          <Route
            path="sign"
            element={
              <AnimatedPage>
                <SignLink />
              </AnimatedPage>
            }
          />

          {/* SoundAlert - Sound Detection */}
          <Route
            path="sound"
            element={
              <AnimatedPage>
                <SoundAlert />
              </AnimatedPage>
            }
          />

          {/* TextVision - OCR */}
          <Route
            path="ocr"
            element={
              <AnimatedPage>
                <TextVision />
              </AnimatedPage>
            }
          />

          {/* Settings */}
          <Route
            path="settings"
            element={
              <AnimatedPage>
                <Settings />
              </AnimatedPage>
            }
          />

          {/* 404 Not Found */}
          <Route
            path="*"
            element={
              <AnimatedPage>
                <NotFound />
              </AnimatedPage>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default App;