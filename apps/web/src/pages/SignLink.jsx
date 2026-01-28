/* ============================================================
   🌉 UNIBRIDGE - SIGNLINK PAGE
   Real-time Sign Language Recognition with MediaPipe Hands
   ============================================================ */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import useSettingsStore from '../stores/settingsStore';

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

  FlipHorizontal: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3" />
      <path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" />
      <path d="M12 20v2" />
      <path d="M12 14v2" />
      <path d="M12 8v2" />
      <path d="M12 2v2" />
    </svg>
  ),

  Settings: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
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

  Volume2: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
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

  Maximize: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  ),

  Minimize: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14h6v6" />
      <path d="M20 10h-6V4" />
      <path d="M14 10l7-7" />
      <path d="M3 21l7-7" />
    </svg>
  ),

  RefreshCw: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  ),

  Zap: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),

  Info: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),

  Eye: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),

  EyeOff: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
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

  Square: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  ),

  Play: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),

  History: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  ),

  Delete: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  ),

  Space: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 17H2a2 2 0 0 0 2-2V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6a2 2 0 0 0 2 2z" />
    </svg>
  ),

  Plus: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  ),

  ChevronDown: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),

  ChevronUp: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 15-6-6-6 6" />
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
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
};

/* ============================================
   🤟 ASL ALPHABET DETECTION
   Simple rule-based detection using landmarks
   ============================================ */

const ASL_ALPHABET = 'ABCDEFGHIKLMNOPQRSTUVWXY'.split('');

// Helper function to calculate distance between two landmarks
const getDistance = (p1, p2) => {
  return Math.sqrt(
    Math.pow(p1.x - p2.x, 2) + 
    Math.pow(p1.y - p2.y, 2) + 
    Math.pow(p1.z - p2.z, 2)
  );
};

// Helper to check if finger is extended
const isFingerExtended = (landmarks, fingerTip, fingerPip, fingerMcp) => {
  const tipToPip = getDistance(landmarks[fingerTip], landmarks[fingerPip]);
  const pipToMcp = getDistance(landmarks[fingerPip], landmarks[fingerMcp]);
  return tipToPip > pipToMcp * 0.8;
};

// Helper to check if finger is curled
const isFingerCurled = (landmarks, fingerTip, fingerPip, wrist) => {
  const tipToWrist = getDistance(landmarks[fingerTip], landmarks[wrist]);
  const pipToWrist = getDistance(landmarks[fingerPip], landmarks[wrist]);
  return tipToWrist < pipToWrist * 1.2;
};

// Detect ASL letter from hand landmarks
const detectASLSign = (landmarks) => {
  if (!landmarks || landmarks.length < 21) return null;

  // Landmark indices
  const WRIST = 0;
  const THUMB_TIP = 4;
  const THUMB_IP = 3;
  const THUMB_MCP = 2;
  const INDEX_TIP = 8;
  const INDEX_PIP = 6;
  const INDEX_MCP = 5;
  const MIDDLE_TIP = 12;
  const MIDDLE_PIP = 10;
  const MIDDLE_MCP = 9;
  const RING_TIP = 16;
  const RING_PIP = 14;
  const RING_MCP = 13;
  const PINKY_TIP = 20;
  const PINKY_PIP = 18;
  const PINKY_MCP = 17;

  // Check finger states
  const indexExtended = isFingerExtended(landmarks, INDEX_TIP, INDEX_PIP, INDEX_MCP);
  const middleExtended = isFingerExtended(landmarks, MIDDLE_TIP, MIDDLE_PIP, MIDDLE_MCP);
  const ringExtended = isFingerExtended(landmarks, RING_TIP, RING_PIP, RING_MCP);
  const pinkyExtended = isFingerExtended(landmarks, PINKY_TIP, PINKY_PIP, PINKY_MCP);

  const indexCurled = isFingerCurled(landmarks, INDEX_TIP, INDEX_PIP, WRIST);
  const middleCurled = isFingerCurled(landmarks, MIDDLE_TIP, MIDDLE_PIP, WRIST);
  const ringCurled = isFingerCurled(landmarks, RING_TIP, RING_PIP, WRIST);
  const pinkyCurled = isFingerCurled(landmarks, PINKY_TIP, PINKY_PIP, WRIST);

  const thumbExtended = getDistance(landmarks[THUMB_TIP], landmarks[WRIST]) > 
                       getDistance(landmarks[INDEX_MCP], landmarks[WRIST]) * 0.8;

  // Detect specific signs

  // V - Peace sign (index and middle extended, others curled)
  if (indexExtended && middleExtended && !ringExtended && !pinkyExtended) {
    const fingerSpread = Math.abs(landmarks[INDEX_TIP].x - landmarks[MIDDLE_TIP].x) > 0.04;
    if (fingerSpread) {
      return { letter: 'V', confidence: 0.9 };
    }
  }

  // W - Three fingers extended (index, middle, ring)
  if (indexExtended && middleExtended && ringExtended && !pinkyExtended) {
    return { letter: 'W', confidence: 0.85 };
  }

  // L - Index extended, thumb out perpendicular
  if (indexExtended && !middleExtended && !ringExtended && !pinkyExtended && thumbExtended) {
    const thumbAngle = Math.abs(landmarks[THUMB_TIP].x - landmarks[INDEX_TIP].x);
    if (thumbAngle > 0.1) {
      return { letter: 'L', confidence: 0.85 };
    }
  }

  // I - Only pinky extended
  if (!indexExtended && !middleExtended && !ringExtended && pinkyExtended) {
    return { letter: 'I', confidence: 0.85 };
  }

  // Y - Thumb and pinky extended, others curled
  if (!indexExtended && !middleExtended && !ringExtended && pinkyExtended && thumbExtended) {
    return { letter: 'Y', confidence: 0.8 };
  }

  // B - All four fingers extended and together, thumb tucked
  if (indexExtended && middleExtended && ringExtended && pinkyExtended) {
    const fingersClose = Math.abs(landmarks[INDEX_TIP].x - landmarks[PINKY_TIP].x) < 0.08;
    if (fingersClose && !thumbExtended) {
      return { letter: 'B', confidence: 0.8 };
    }
  }

  // A - Fist with thumb to the side
  if (!indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
    const thumbToSide = landmarks[THUMB_TIP].y > landmarks[INDEX_PIP].y;
    if (thumbToSide && thumbExtended) {
      return { letter: 'A', confidence: 0.75 };
    }
  }

  // S - Fist with thumb over fingers
  if (!indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
    const thumbOverFingers = landmarks[THUMB_TIP].y < landmarks[INDEX_PIP].y;
    if (thumbOverFingers) {
      return { letter: 'S', confidence: 0.75 };
    }
  }

  // E - Fingers curled, thumb across
  if (indexCurled && middleCurled && ringCurled && pinkyCurled) {
    return { letter: 'E', confidence: 0.7 };
  }

  // O - Fingers and thumb form circle
  const thumbToIndex = getDistance(landmarks[THUMB_TIP], landmarks[INDEX_TIP]);
  if (thumbToIndex < 0.06 && !middleExtended && !ringExtended && !pinkyExtended) {
    return { letter: 'O', confidence: 0.75 };
  }

  // C - Curved hand shape (like holding a cup)
  if (!indexCurled && !middleCurled && !ringCurled && !pinkyCurled) {
    const curvedShape = getDistance(landmarks[THUMB_TIP], landmarks[PINKY_TIP]) > 0.1 &&
                       getDistance(landmarks[THUMB_TIP], landmarks[PINKY_TIP]) < 0.2;
    if (curvedShape) {
      return { letter: 'C', confidence: 0.7 };
    }
  }

  // D - Index pointing up, others form circle with thumb
  if (indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
    const thumbToMiddle = getDistance(landmarks[THUMB_TIP], landmarks[MIDDLE_TIP]);
    if (thumbToMiddle < 0.08) {
      return { letter: 'D', confidence: 0.75 };
    }
  }

  // F - Index and thumb touching, others extended
  if (middleExtended && ringExtended && pinkyExtended) {
    const thumbToIndexTouch = getDistance(landmarks[THUMB_TIP], landmarks[INDEX_TIP]) < 0.05;
    if (thumbToIndexTouch) {
      return { letter: 'F', confidence: 0.8 };
    }
  }

  // G - Index pointing sideways, thumb parallel
  if (indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
    const pointingSide = Math.abs(landmarks[INDEX_TIP].y - landmarks[INDEX_MCP].y) < 0.05;
    if (pointingSide) {
      return { letter: 'G', confidence: 0.7 };
    }
  }

  // H - Index and middle pointing sideways
  if (indexExtended && middleExtended && !ringExtended && !pinkyExtended) {
    const pointingSide = Math.abs(landmarks[INDEX_TIP].y - landmarks[INDEX_MCP].y) < 0.05;
    if (pointingSide) {
      return { letter: 'H', confidence: 0.7 };
    }
  }

  // K - Index and middle up in V, thumb between them
  if (indexExtended && middleExtended && !ringExtended && !pinkyExtended) {
    const thumbBetween = landmarks[THUMB_TIP].x > Math.min(landmarks[INDEX_TIP].x, landmarks[MIDDLE_TIP].x) && 
                        landmarks[THUMB_TIP].x < Math.max(landmarks[INDEX_TIP].x, landmarks[MIDDLE_TIP].x);
    if (thumbBetween) {
      return { letter: 'K', confidence: 0.7 };
    }
  }

  // M - Thumb under three fingers
  if (!indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
    const thumbUnder = landmarks[THUMB_TIP].y > landmarks[RING_MCP].y;
    if (thumbUnder) {
      return { letter: 'M', confidence: 0.65 };
    }
  }

  // N - Thumb under two fingers
  if (!indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
    const thumbUnder = landmarks[THUMB_TIP].y > landmarks[MIDDLE_MCP].y &&
                      landmarks[THUMB_TIP].y < landmarks[RING_MCP].y;
    if (thumbUnder) {
      return { letter: 'N', confidence: 0.65 };
    }
  }

  // P - Like K but pointing down
  if (indexExtended && middleExtended && !ringExtended && !pinkyExtended) {
    const pointingDown = landmarks[INDEX_TIP].y > landmarks[INDEX_MCP].y;
    if (pointingDown) {
      return { letter: 'P', confidence: 0.7 };
    }
  }

  // Q - Like G but pointing down
  if (indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
    const pointingDown = landmarks[INDEX_TIP].y > landmarks[INDEX_MCP].y;
    if (pointingDown && thumbExtended) {
      return { letter: 'Q', confidence: 0.7 };
    }
  }

  // R - Index and middle crossed
  if (indexExtended && middleExtended && !ringExtended && !pinkyExtended) {
    const fingersCrossed = Math.abs(landmarks[INDEX_TIP].x - landmarks[MIDDLE_TIP].x) < 0.025;
    if (fingersCrossed) {
      return { letter: 'R', confidence: 0.75 };
    }
  }

  // T - Thumb between index and middle
  if (!indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
    const thumbBetween = landmarks[THUMB_TIP].x > landmarks[INDEX_MCP].x &&
                        landmarks[THUMB_TIP].x < landmarks[MIDDLE_MCP].x;
    if (thumbBetween) {
      return { letter: 'T', confidence: 0.65 };
    }
  }

  // U - Index and middle together, pointing up
  if (indexExtended && middleExtended && !ringExtended && !pinkyExtended) {
    const fingersTogether = Math.abs(landmarks[INDEX_TIP].x - landmarks[MIDDLE_TIP].x) < 0.03;
    if (fingersTogether) {
      return { letter: 'U', confidence: 0.75 };
    }
  }

  // X - Index bent at hook
  if (!middleExtended && !ringExtended && !pinkyExtended) {
    const indexBent = landmarks[INDEX_TIP].y > landmarks[INDEX_PIP].y &&
                     landmarks[INDEX_PIP].y < landmarks[INDEX_MCP].y;
    if (indexBent) {
      return { letter: 'X', confidence: 0.7 };
    }
  }

  return null;
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
    loading: {
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      text: 'text-amber-600 dark:text-amber-400',
      dot: 'bg-amber-500',
      pulse: true,
    },
    active: {
      bg: 'bg-teal-100 dark:bg-teal-900/30',
      text: 'text-teal-600 dark:text-teal-400',
      dot: 'bg-teal-500',
      pulse: true,
    },
    detecting: {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-600 dark:text-purple-400',
      dot: 'bg-purple-500',
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

// Hand Indicator
const HandIndicator = ({ detected, side }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: detected ? 1 : 0.3 }}
    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
      detected 
        ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' 
        : 'bg-slate-100 dark:bg-dark-800 text-slate-400 dark:text-slate-500'
    }`}
  >
    <Icons.Hand className={`w-4 h-4 ${side === 'left' ? 'scale-x-[-1]' : ''}`} />
    <span className="text-xs font-medium capitalize">{side}</span>
    {detected && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-2 h-2 rounded-full bg-teal-500"
      />
    )}
  </motion.div>
);

// Action Button Component
const ActionButton = ({ onClick, icon: Icon, label, variant = 'secondary', size = 'md', disabled = false, loading = false, active = false }) => {
  const variants = {
    primary: 'bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40',
    secondary: 'bg-slate-100 dark:bg-dark-800 hover:bg-slate-200 dark:hover:bg-dark-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-dark-700',
    danger: 'bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400',
    ghost: 'hover:bg-slate-100 dark:hover:bg-dark-800 text-slate-600 dark:text-slate-400',
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
        ${active ? variants.primary : variants[variant]} ${sizes[size]}
        rounded-xl transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2
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

// Toggle Switch
const ToggleSwitch = ({ checked, onChange, label, description }) => (
  <label className="flex items-center justify-between cursor-pointer group">
    <div>
      <div className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
        {label}
      </div>
      {description && (
        <div className="text-xs text-slate-500 dark:text-slate-500">
          {description}
        </div>
      )}
    </div>
    <div className="relative ml-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div className={`w-11 h-6 rounded-full transition-colors ${checked ? 'bg-teal-500' : 'bg-slate-300 dark:bg-dark-600'}`}>
        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${checked ? 'translate-x-5' : ''}`} />
      </div>
    </div>
  </label>
);

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

// ASL Reference Card
const ASLReferenceCard = ({ letter, isActive }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className={`
      w-10 h-10 rounded-lg text-center flex items-center justify-center
      transition-all duration-200 cursor-default font-bold
      ${isActive 
        ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30' 
        : 'bg-slate-100 dark:bg-dark-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-700'
      }
    `}
  >
    {letter}
  </motion.div>
);

/* ============================================
   🎯 MAIN SIGNLINK COMPONENT
   ============================================ */

const SignLink = () => {
  // ============================================
  // State Management
  // ============================================
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('Initializing...');
  
  // Detection state
  const [detectedLetter, setDetectedLetter] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [handsDetected, setHandsDetected] = useState({ left: false, right: false });
  const [transcript, setTranscript] = useState('');
  const [lastAddedLetter, setLastAddedLetter] = useState(null);
  const [letterHoldTime, setLetterHoldTime] = useState(0);
  
  // Settings state
  const [showSettings, setShowSettings] = useState(false);
  const [mirrorVideo, setMirrorVideo] = useState(true);
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.7);
  const [autoCapture, setAutoCapture] = useState(true);
  const [captureDelay] = useState(1000); // ms to hold before auto-capture
  
  // UI state
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const handsRef = useRef(null);
  const cameraRef = useRef(null);
  const containerRef = useRef(null);
  const lastDetectionRef = useRef(null);
  const holdStartTimeRef = useRef(null);

  // Get settings from store
  const { signSettings, updateSignSettings } = useSettingsStore();

  // ============================================
  // Toast Notifications
  // ============================================
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ============================================
  // Process Hand Detection Results
  // ============================================
  const onHandsResults = useCallback((results) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const video = videoRef.current;

    if (!canvas || !ctx || !video) return;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw video frame (mirror if needed)
    ctx.save();
    if (mirrorVideo) {
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
    }
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    // Check for hands
    const leftHand = results.multiHandedness?.find(h => h.label === 'Left');
    const rightHand = results.multiHandedness?.find(h => h.label === 'Right');
    
    setHandsDetected({
      left: !!leftHand,
      right: !!rightHand,
    });

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      setStatus('detecting');
      setStatusMessage('Hand detected!');

      // Draw landmarks for each hand
      results.multiHandLandmarks.forEach((landmarks, index) => {
        if (showLandmarks) {
          // Mirror landmarks if needed
          const drawLandmarks_arr = mirrorVideo 
            ? landmarks.map(l => ({ ...l, x: 1 - l.x }))
            : landmarks;

          // Draw connections
          drawConnectors(ctx, drawLandmarks_arr, HAND_CONNECTIONS, {
            color: '#14B8A6',
            lineWidth: 3,
          });

          // Draw landmarks
          drawLandmarks(ctx, drawLandmarks_arr, {
            color: '#8B5CF6',
            lineWidth: 1,
            radius: 4,
          });

          // Draw fingertips with larger circles
          [4, 8, 12, 16, 20].forEach((tip) => {
            const point = drawLandmarks_arr[tip];
            ctx.beginPath();
            ctx.arc(point.x * canvas.width, point.y * canvas.height, 8, 0, 2 * Math.PI);
            ctx.fillStyle = '#EC4899';
            ctx.fill();
          });
        }

        // Detect ASL sign from first hand
        if (index === 0) {
          const detection = detectASLSign(landmarks);
          
          if (detection && detection.confidence >= confidenceThreshold) {
            setDetectedLetter(detection.letter);
            setConfidence(detection.confidence);

            // Auto-capture logic
            if (autoCapture) {
              if (detection.letter === lastDetectionRef.current) {
                // Same letter, check hold time
                if (holdStartTimeRef.current) {
                  const holdDuration = Date.now() - holdStartTimeRef.current;
                  setLetterHoldTime(holdDuration);
                  
                  if (holdDuration >= captureDelay) {
                    // Add letter to transcript
                    setTranscript(prev => prev + detection.letter);
                    showToast(`Added: ${detection.letter}`, 'success');
                    holdStartTimeRef.current = null;
                    setLetterHoldTime(0);
                    lastDetectionRef.current = null;
                  }
                } else {
                  holdStartTimeRef.current = Date.now();
                }
              } else {
                // Different letter, reset
                lastDetectionRef.current = detection.letter;
                holdStartTimeRef.current = Date.now();
                setLetterHoldTime(0);
              }
            }
          } else {
            setDetectedLetter(null);
            setConfidence(0);
            setLetterHoldTime(0);
            holdStartTimeRef.current = null;
          }
        }
      });
    } else {
      setStatus('active');
      setStatusMessage('Show your hand');
      setDetectedLetter(null);
      setConfidence(0);
      setHandsDetected({ left: false, right: false });
      setLetterHoldTime(0);
      holdStartTimeRef.current = null;
      lastDetectionRef.current = null;
    }
  }, [mirrorVideo, showLandmarks, confidenceThreshold, autoCapture, captureDelay, showToast]);

  // ============================================
  // Initialize MediaPipe Hands
  // ============================================
  const initializeHands = useCallback(async () => {
    try {
      setIsLoading(true);
      setStatus('loading');
      setStatusMessage('Loading AI model...');

      const hands = new Hands({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        },
      });

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5,
      });

      hands.onResults(onHandsResults);
      
      handsRef.current = hands;
      
      setIsLoading(false);
      setStatus('idle');
      setStatusMessage('Ready - Click Start');
      
    } catch (err) {
      console.error('Failed to initialize MediaPipe:', err);
      setError('Failed to load hand tracking model. Please refresh and try again.');
      setStatus('error');
      setStatusMessage('Failed to load model');
      setIsLoading(false);
    }
  }, [onHandsResults]);

  // ============================================
  // Start/Stop Camera
  // ============================================
  const startCamera = async () => {
    try {
      setStatus('loading');
      setStatusMessage('Starting camera...');

      if (!handsRef.current) {
        await initializeHands();
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        await new Promise((resolve) => {
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            resolve();
          };
        });

        // Start MediaPipe camera
        if (handsRef.current) {
          cameraRef.current = new Camera(videoRef.current, {
            onFrame: async () => {
              if (handsRef.current && videoRef.current) {
                await handsRef.current.send({ image: videoRef.current });
              }
            },
            width: 1280,
            height: 720,
          });

          await cameraRef.current.start();
        }

        setIsActive(true);
        setStatus('active');
        setStatusMessage('Tracking active');
        setError(null);
      }
    } catch (err) {
      console.error('Failed to start camera:', err);
      
      if (err.name === 'NotAllowedError') {
        setError('Camera permission denied. Please allow camera access and try again.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found. Please connect a camera and try again.');
      } else {
        setError('Failed to start camera. Please try again.');
      }
      
      setStatus('error');
      setStatusMessage('Camera error');
    }
  };

  const stopCamera = useCallback(() => {
    if (cameraRef.current) {
      cameraRef.current.stop();
      cameraRef.current = null;
    }

    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    // Clear canvas
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    setIsActive(false);
    setStatus('idle');
    setStatusMessage('Camera stopped');
    setDetectedLetter(null);
    setConfidence(0);
    setHandsDetected({ left: false, right: false });
    setLetterHoldTime(0);
  }, []);

  const toggleCamera = () => {
    if (isActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  // ============================================
  // Transcript Functions
  // ============================================
  const addLetterToTranscript = (letter) => {
    if (letter) {
      setTranscript((prev) => prev + letter);
      showToast(`Added: ${letter}`, 'success');
    }
  };

  const addSpace = () => {
    setTranscript((prev) => prev + ' ');
    showToast('Added space', 'info');
  };

  const backspace = () => {
    setTranscript((prev) => prev.slice(0, -1));
  };

  const clearTranscript = () => {
    setTranscript('');
    showToast('Transcript cleared', 'info');
  };

  const copyTranscript = async () => {
    if (!transcript.trim()) {
      showToast('Nothing to copy', 'error');
      return;
    }

    try {
      await navigator.clipboard.writeText(transcript);
      showToast('Copied to clipboard!', 'success');
    } catch (err) {
      showToast('Failed to copy', 'error');
    }
  };

  const speakTranscript = () => {
    if (!transcript.trim()) {
      showToast('Nothing to speak', 'error');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(transcript);
    window.speechSynthesis.speak(utterance);
    showToast('Speaking...', 'info');
  };

  // ============================================
  // Fullscreen Toggle
  // ============================================
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // ============================================
  // Initialize on Mount
  // ============================================
  useEffect(() => {
    initializeHands();

    return () => {
      stopCamera();
    };
  }, [initializeHands, stopCamera]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // ============================================
  // Render
  // ============================================
  return (
    <div ref={containerRef} className="min-h-screen py-8 px-4 bg-slate-50 dark:bg-dark-900">
      <div className="container-custom max-w-7xl">
        {/* Header Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-8"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/20 mb-4">
            <Icons.Hand className="w-4 h-4 text-teal-500" />
            <span className="text-sm font-medium text-teal-600 dark:text-teal-400">
              Sign Language Recognition
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Sign<span className="text-gradient-teal-cyan">Link</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Real-time ASL alphabet recognition powered by MediaPipe hand tracking.
            Show signs to the camera and watch them translate instantly.
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
                  aria-label="Dismiss error"
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
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Camera Feed - Left Column (2 cols wide) */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <div className="glass-card overflow-hidden">
              {/* Camera Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-dark-700">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                      <Icons.Camera className="w-4 h-4 text-teal-500" />
                    </div>
                    Camera Feed
                  </h2>
                  
                  {/* Hand Indicators */}
                  <div className="hidden sm:flex items-center gap-2">
                    <HandIndicator detected={handsDetected.left} side="left" />
                    <HandIndicator detected={handsDetected.right} side="right" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <ActionButton
                    onClick={() => setShowSettings(!showSettings)}
                    icon={Icons.Settings}
                    label="Settings"
                    active={showSettings}
                    size="sm"
                  />
                  <ActionButton
                    onClick={toggleFullscreen}
                    icon={isFullscreen ? Icons.Minimize : Icons.Maximize}
                    label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
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
                    className="border-b border-slate-200 dark:border-dark-700 overflow-hidden"
                  >
                    <div className="p-4 grid sm:grid-cols-2 gap-4">
                      <ToggleSwitch
                        checked={mirrorVideo}
                        onChange={setMirrorVideo}
                        label="Mirror Video"
                        description="Flip camera like a mirror"
                      />
                      <ToggleSwitch
                        checked={showLandmarks}
                        onChange={setShowLandmarks}
                        label="Show Landmarks"
                        description="Display hand tracking points"
                      />
                      <ToggleSwitch
                        checked={autoCapture}
                        onChange={setAutoCapture}
                        label="Auto Capture"
                        description="Add letters when held steady"
                      />
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Min Confidence: {Math.round(confidenceThreshold * 100)}%
                        </label>
                        <input
                          type="range"
                          min="0.5"
                          max="0.95"
                          step="0.05"
                          value={confidenceThreshold}
                          onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                          className="w-full h-2 bg-slate-200 dark:bg-dark-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Camera View */}
              <div className="relative aspect-video bg-slate-900">
                {/* Hidden Video Element */}
                <video
                  ref={videoRef}
                  className="hidden"
                  playsInline
                  muted
                />

                {/* Canvas for Drawing */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                                {/* Overlay when inactive */}
                {!isActive && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-24 h-24 rounded-2xl bg-teal-500/20 flex items-center justify-center mb-4"
                    >
                      <Icons.Camera className="w-12 h-12 text-teal-500" />
                    </motion.div>
                    <p className="text-slate-400 text-center px-4">
                      {isLoading ? 'Loading hand tracking model...' : 'Click Start to begin sign language recognition'}
                    </p>
                    {isLoading && (
                      <div className="mt-4">
                        <Icons.Loader className="w-6 h-6 text-teal-500 animate-spin" />
                      </div>
                    )}
                  </div>
                )}

                {/* Letter Hold Progress Bar */}
                {autoCapture && isActive && detectedLetter && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="h-2 bg-slate-700/80 rounded-full overflow-hidden backdrop-blur-sm">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((letterHoldTime / captureDelay) * 100, 100)}%` }}
                        className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full"
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    <p className="text-xs text-slate-300 mt-2 text-center">
                      Hold steady to add "<span className="font-bold text-teal-400">{detectedLetter}</span>"
                    </p>
                  </div>
                )}

                {/* Detection Overlay - Top Right */}
                <AnimatePresence>
                  {isActive && detectedLetter && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: 20 }}
                      className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[100px]"
                    >
                      <div className="text-5xl font-bold text-teal-400 mb-1">{detectedLetter}</div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-1.5 w-16 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-teal-500 rounded-full transition-all duration-200"
                            style={{ width: `${confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400">
                          {Math.round(confidence * 100)}%
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hand Count Indicator - Top Left */}
                {isActive && (
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className={`px-3 py-1.5 rounded-lg backdrop-blur-sm text-sm font-medium ${
                      handsDetected.left || handsDetected.right
                        ? 'bg-teal-500/20 text-teal-400'
                        : 'bg-slate-800/80 text-slate-400'
                    }`}>
                      {handsDetected.left && handsDetected.right 
                        ? '2 Hands' 
                        : handsDetected.left || handsDetected.right 
                          ? '1 Hand' 
                          : 'No Hands'}
                    </div>
                  </div>
                )}
              </div>

              {/* Camera Controls */}
              <div className="p-4 flex items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleCamera}
                  disabled={isLoading}
                  className={`
                    relative px-8 py-4 rounded-2xl font-semibold
                    flex items-center gap-3
                    transition-all duration-300
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${isActive
                      ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 focus-visible:ring-red-500'
                      : 'bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white shadow-lg shadow-teal-500/30 focus-visible:ring-teal-500'
                    }
                  `}
                  aria-label={isActive ? 'Stop camera' : 'Start camera'}
                >
                  {isLoading ? (
                    <>
                      <Icons.Loader className="w-5 h-5 animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : isActive ? (
                    <>
                      <Icons.Square className="w-5 h-5" />
                      <span>Stop Camera</span>
                    </>
                  ) : (
                    <>
                      <Icons.Play className="w-5 h-5" />
                      <span>Start Camera</span>
                    </>
                  )}
                </motion.button>

                <ActionButton
                  onClick={() => setShowReference(!showReference)}
                  icon={Icons.Info}
                  label="ASL Reference"
                  active={showReference}
                />
              </div>
            </div>

            {/* ASL Reference Section */}
            <AnimatePresence>
              {showReference && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6"
                >
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Icons.Info className="w-5 h-5 text-teal-500" />
                      ASL Alphabet Reference
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Currently supported letters are highlighted when detected. Hold a sign steady for 1 second to add it to your transcript.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ASL_ALPHABET.map((letter) => (
                        <ASLReferenceCard
                          key={letter}
                          letter={letter}
                          isActive={detectedLetter === letter}
                        />
                      ))}
                    </div>
                    <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        <strong>Tip:</strong> For best results, ensure good lighting, keep your hand clearly visible, and make signs facing the camera. Letters J and Z require motion and are not yet supported.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column - Detection & Transcript */}
          <motion.div variants={fadeInUp} className="space-y-6">
            {/* Detected Letter Card */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Icons.Zap className="w-4 h-4 text-purple-500" />
                </div>
                Detected Sign
              </h3>
              
              <div className="min-h-[160px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {detectedLetter ? (
                    <motion.div
                      key={detectedLetter}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="text-center"
                    >
                      <div className="text-8xl font-bold text-gradient-primary mb-2">
                        {detectedLetter}
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-2 w-24 bg-slate-200 dark:bg-dark-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${confidence * 100}%` }}
                            className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full"
                          />
                        </div>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {Math.round(confidence * 100)}%
                        </span>
                      </div>
                      
                      {/* Manual add button */}
                      {!autoCapture && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addLetterToTranscript(detectedLetter)}
                          className="mt-4 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium transition-colors"
                        >
                          Add to Transcript
                        </motion.button>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-slate-400 dark:text-slate-500"
                    >
                      <Icons.Hand className="w-16 h-16 mx-auto mb-3 opacity-30" />
                      <p>{isActive ? 'Show a sign to the camera' : 'Start camera to begin'}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Transcript Card */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                    <Icons.History className="w-4 h-4 text-teal-500" />
                  </div>
                  Transcript
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-500">
                  {transcript.length} characters
                </span>
              </div>

              {/* Transcript Display */}
              <div className="min-h-[120px] max-h-[200px] overflow-y-auto p-4 rounded-xl bg-slate-50 dark:bg-dark-800/50 border-2 border-slate-200 dark:border-dark-700 mb-4">
                {transcript ? (
                  <p className="text-slate-900 dark:text-white text-lg leading-relaxed tracking-wide font-mono break-all">
                    {transcript}
                    <span className="animate-pulse text-teal-500">|</span>
                  </p>
                ) : (
                  <p className="text-slate-400 dark:text-slate-500 italic">
                    Your signed letters will appear here...
                  </p>
                )}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addSpace}
                  className="p-3 rounded-xl bg-slate-100 dark:bg-dark-800 hover:bg-slate-200 dark:hover:bg-dark-700 text-slate-600 dark:text-slate-400 transition-colors flex flex-col items-center gap-1"
                  title="Add space"
                >
                  <Icons.Space className="w-5 h-5" />
                  <span className="text-xs">Space</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={backspace}
                  disabled={!transcript}
                  className="p-3 rounded-xl bg-slate-100 dark:bg-dark-800 hover:bg-slate-200 dark:hover:bg-dark-700 text-slate-600 dark:text-slate-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center gap-1"
                  title="Backspace"
                >
                  <Icons.Delete className="w-5 h-5" />
                  <span className="text-xs">Delete</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyTranscript}
                  disabled={!transcript}
                  className="p-3 rounded-xl bg-slate-100 dark:bg-dark-800 hover:bg-slate-200 dark:hover:bg-dark-700 text-slate-600 dark:text-slate-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center gap-1"
                  title="Copy to clipboard"
                >
                  <Icons.Copy className="w-5 h-5" />
                  <span className="text-xs">Copy</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearTranscript}
                  disabled={!transcript}
                  className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center gap-1"
                  title="Clear all"
                >
                  <Icons.Trash2 className="w-5 h-5" />
                  <span className="text-xs">Clear</span>
                </motion.button>
              </div>

              {/* Speak Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={speakTranscript}
                disabled={!transcript}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/20"
              >
                <Icons.Volume2 className="w-5 h-5" />
                <span>Speak Transcript</span>
              </motion.button>
            </div>

            {/* Quick Tips */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                💡 Quick Tips
              </h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-0.5">•</span>
                  <span>Keep your hand clearly visible within the camera frame</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-0.5">•</span>
                  <span>Ensure good lighting for better detection accuracy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-0.5">•</span>
                  <span>Hold each sign steady for ~1 second to auto-capture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-0.5">•</span>
                  <span>Use the Space button to add spaces between words</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
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

export default SignLink;