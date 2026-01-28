export const APP_NAME = 'UniBridge';
export const APP_TAGLINE = 'One Bridge. Every Voice. No Barriers.';

export const ROUTES = {
  HOME: '/',
  VOICE: '/voice',
  SIGN: '/sign',
  CHAT: '/chat',
  LEARN: '/learn',
  SETTINGS: '/settings',
  LOGIN: '/login',
  REGISTER: '/register',
};

export const SIGN_LANGUAGES = [
  { code: 'ASL', name: 'American Sign Language' },
  { code: 'BSL', name: 'British Sign Language' },
  { code: 'ISL', name: 'Indian Sign Language' },
];

export const VOICE_LANGUAGES = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'en-GB', name: 'English (UK)' },
  { code: 'es-ES', name: 'Spanish' },
  { code: 'fr-FR', name: 'French' },
  { code: 'de-DE', name: 'German' },
];

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

export const ERROR_MESSAGES = {
  AUTH_REQUIRED: 'Please sign in to continue',
  INVALID_CREDENTIALS: 'Incorrect email or password',
  CAMERA_DENIED: 'Camera access needed. Please allow in browser settings.',
  MIC_DENIED: 'Microphone access needed. Please allow in browser settings.',
  NO_HANDS_DETECTED: "I can't see your hands. Try moving closer.",
  LOW_CONFIDENCE: "I'm not sure what that sign means. Please try again.",
  NO_SPEECH: "I didn't hear anything. Please speak again.",
  NETWORK_ERROR: 'Connection lost. Please check your internet.',
  UNKNOWN: 'Something went wrong. Please try again.',
};