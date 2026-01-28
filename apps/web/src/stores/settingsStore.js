/* ============================================================
   🌉 UNIBRIDGE - SETTINGS STORE
   Zustand store for app settings and preferences
   ============================================================ */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSettingsStore = create(
  persist(
    (set, get) => ({
      // ============================================
      // 🎨 THEME SETTINGS
      // ============================================
      darkMode: false,
      
      toggleDarkMode: () => {
        const newDarkMode = !get().darkMode;
        set({ darkMode: newDarkMode });
        
        // Update document class for Tailwind dark mode
        if (newDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      
      setDarkMode: (value) => {
        set({ darkMode: value });
        if (value) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      // ============================================
      // 🔊 VOICE SETTINGS
      // ============================================
      voiceSettings: {
        speechRate: 1,
        speechPitch: 1,
        speechVolume: 1,
        preferredVoice: null,
        autoSpeak: false,
        continuousListening: false,
      },
      
      updateVoiceSettings: (newSettings) => {
        set((state) => ({
          voiceSettings: { ...state.voiceSettings, ...newSettings },
        }));
      },

      // ============================================
      // 🤟 SIGN LANGUAGE SETTINGS
      // ============================================
      signSettings: {
        showHandLandmarks: true,
        confidenceThreshold: 0.7,
        mirrorVideo: true,
        autoCapture: false,
      },
      
      updateSignSettings: (newSettings) => {
        set((state) => ({
          signSettings: { ...state.signSettings, ...newSettings },
        }));
      },

      // ============================================
      // 🔔 SOUND ALERT SETTINGS
      // ============================================
      soundSettings: {
        enableAlerts: true,
        alertVolume: 0.8,
        vibrationEnabled: true,
        flashEnabled: false,
        notificationSounds: {
          doorbell: true,
          alarm: true,
          babyCry: true,
          phone: true,
        },
      },
      
      updateSoundSettings: (newSettings) => {
        set((state) => ({
          soundSettings: { ...state.soundSettings, ...newSettings },
        }));
      },

      // ============================================
      // 📝 OCR SETTINGS
      // ============================================
      ocrSettings: {
        language: 'eng',
        enhanceContrast: true,
        autoRead: false,
      },
      
      updateOcrSettings: (newSettings) => {
        set((state) => ({
          ocrSettings: { ...state.ocrSettings, ...newSettings },
        }));
      },

      // ============================================
      // ♿ ACCESSIBILITY SETTINGS
      // ============================================
      accessibilitySettings: {
        highContrast: false,
        largeText: false,
        reduceMotion: false,
        screenReaderOptimized: false,
      },
      
      updateAccessibilitySettings: (newSettings) => {
        set((state) => ({
          accessibilitySettings: { ...state.accessibilitySettings, ...newSettings },
        }));
      },

      // ============================================
      // 🔄 RESET SETTINGS
      // ============================================
      resetAllSettings: () => {
        set({
          darkMode: false,
          voiceSettings: {
            speechRate: 1,
            speechPitch: 1,
            speechVolume: 1,
            preferredVoice: null,
            autoSpeak: false,
            continuousListening: false,
          },
          signSettings: {
            showHandLandmarks: true,
            confidenceThreshold: 0.7,
            mirrorVideo: true,
            autoCapture: false,
          },
          soundSettings: {
            enableAlerts: true,
            alertVolume: 0.8,
            vibrationEnabled: true,
            flashEnabled: false,
            notificationSounds: {
              doorbell: true,
              alarm: true,
              babyCry: true,
              phone: true,
            },
          },
          ocrSettings: {
            language: 'eng',
            enhanceContrast: true,
            autoRead: false,
          },
          accessibilitySettings: {
            highContrast: false,
            largeText: false,
            reduceMotion: false,
            screenReaderOptimized: false,
          },
        });
        document.documentElement.classList.remove('dark');
      },
    }),
    {
      name: 'unibridge-settings',
      // Initialize dark mode on hydration
      onRehydrateStorage: () => (state) => {
        if (state?.darkMode) {
          document.documentElement.classList.add('dark');
        }
      },
    }
  )
);

export default useSettingsStore;