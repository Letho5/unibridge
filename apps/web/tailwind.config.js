/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // ============================================
      // 🎨 NEW COLOR PALETTE - Competition Theme
      // ============================================
      colors: {
        // Primary Purple (Main Brand)
        purple: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A78BFA',  // Light purple
          600: '#8B5CF6',  // PRIMARY - Main brand purple
          700: '#7C3AED',  // Dark purple
          800: '#6D28D9',
          900: '#5B21B6',
          950: '#4C1D95',
        },
        
        // Pink/Rose Accent
        pink: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',  // PRIMARY - Pink accent
          600: '#DB2777',  // AI brain circle
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843',
          950: '#500724',
        },
        
        // Teal Accent
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',  // PRIMARY - Teal accent
          600: '#0D9488',  // Data/ML color
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
          950: '#042F2E',
        },
        
        // Cyan Accent
        cyan: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',  // Bright cyan
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
          950: '#083344',
        },
        
        // Blue Accent
        blue: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',  // Blue accent
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
        
        // Dark Mode Backgrounds
        dark: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',  // Dark cards
          900: '#0F172A',  // Dark mode bg
          950: '#020617',
        },
        
        // Semantic Colors for Accessibility Features
        voice: {
          primary: '#8B5CF6',    // Purple for voice features
          secondary: '#A78BFA',
          accent: '#C084FC',
        },
        sign: {
          primary: '#14B8A6',    // Teal for sign language
          secondary: '#2DD4BF',
          accent: '#5EEAD4',
        },
        sound: {
          primary: '#EC4899',    // Pink for sound alerts
          secondary: '#F472B6',
          accent: '#F9A8D4',
        },
        ocr: {
          primary: '#3B82F6',    // Blue for OCR/reading
          secondary: '#60A5FA',
          accent: '#93C5FD',
        },
        
        // AI Theme Colors
        ai: {
          pink: '#DB2777',       // AI brain visualization
          teal: '#0D9488',       // Data/ML processing
          purple: '#8B5CF6',     // Cloud/Network
          cyan: '#06B6D4',       // Connections
        },
        
        // Glass Effect Colors
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(15, 23, 42, 0.8)',
          purple: 'rgba(139, 92, 246, 0.1)',
          pink: 'rgba(236, 72, 153, 0.1)',
          teal: 'rgba(20, 184, 166, 0.1)',
        },
      },
      
      // ============================================
      // 🌈 GRADIENTS
      // ============================================
      backgroundImage: {
        // Primary Gradients
        'gradient-primary': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #14B8A6 100%)',
        'gradient-hero': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
        'gradient-card': 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        
        // Feature-specific Gradients
        'gradient-voice': 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
        'gradient-sign': 'linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)',
        'gradient-sound': 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
        'gradient-ocr': 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
        
        // Background Gradients
        'gradient-dark': 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
        'gradient-light': 'linear-gradient(180deg, #F8FAFC 0%, #E2E8F0 100%)',
        
        // Animated Gradients (use with animation)
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, #8B5CF6 0deg, #EC4899 120deg, #14B8A6 240deg, #8B5CF6 360deg)',
        'gradient-radial': 'radial-gradient(ellipse at center, #8B5CF6 0%, transparent 70%)',
        'gradient-radial-pink': 'radial-gradient(ellipse at center, #EC4899 0%, transparent 70%)',
        'gradient-radial-teal': 'radial-gradient(ellipse at center, #14B8A6 0%, transparent 70%)',
        
        // Mesh Gradient (for hero backgrounds)
        'gradient-mesh': `
          radial-gradient(at 40% 20%, rgba(139, 92, 246, 0.3) 0px, transparent 50%),
          radial-gradient(at 80% 0%, rgba(236, 72, 153, 0.2) 0px, transparent 50%),
          radial-gradient(at 0% 50%, rgba(20, 184, 166, 0.2) 0px, transparent 50%),
          radial-gradient(at 80% 50%, rgba(59, 130, 246, 0.2) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(139, 92, 246, 0.2) 0px, transparent 50%)
        `,
      },
      
      // ============================================
      // ✨ ANIMATIONS
      // ============================================
      animation: {
        // Fade animations
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'fade-in-left': 'fadeInLeft 0.6s ease-out',
        'fade-in-right': 'fadeInRight 0.6s ease-out',
        
        // Scale animations
        'scale-in': 'scaleIn 0.3s ease-out',
        'scale-in-bounce': 'scaleInBounce 0.5s ease-out',
        
        // Slide animations
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'slide-left': 'slideLeft 0.4s ease-out',
        'slide-right': 'slideRight 0.4s ease-out',
        
        // Continuous animations
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'spin-reverse': 'spinReverse 10s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        
        // Gradient animations
        'gradient-shift': 'gradientShift 8s ease infinite',
        'gradient-x': 'gradientX 15s ease infinite',
        'gradient-y': 'gradientY 15s ease infinite',
        
        // Special effects
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'wave': 'wave 2.5s ease-in-out infinite',
        'ripple': 'ripple 1s ease-out',
        
        // Loading states
        'loading-dots': 'loadingDots 1.4s ease-in-out infinite',
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
        
        // Voice/Sound visualizer
        'sound-wave': 'soundWave 0.5s ease-in-out infinite alternate',
        'equalizer': 'equalizer 0.8s ease-in-out infinite',
        
        // Hand tracking visualization
        'hand-pulse': 'handPulse 1.5s ease-in-out infinite',
      },
      
      keyframes: {
        // Fade keyframes
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        
        // Scale keyframes
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleInBounce: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        
        // Slide keyframes
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        
        // Float keyframes
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        
        // Pulse keyframes
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(139, 92, 246, 0.8)',
            transform: 'scale(1.02)',
          },
        },
        
        // Spin keyframes
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        
        // Bounce keyframes
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        
        // Gradient keyframes
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientY: {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
        },
        
        // Shimmer keyframes
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        
        // Glow keyframes
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' },
          '100%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.8), 0 0 60px rgba(236, 72, 153, 0.4)' },
        },
        
        // Wave keyframes
        wave: {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10deg)' },
          '60%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        
        // Ripple keyframes
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        
        // Loading keyframes
        loadingDots: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
        },
        skeleton: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
        
        // Sound wave keyframes
        soundWave: {
          '0%': { transform: 'scaleY(1)' },
          '100%': { transform: 'scaleY(1.5)' },
        },
        equalizer: {
          '0%, 100%': { height: '20%' },
          '50%': { height: '100%' },
        },
        
        // Hand tracking keyframes
        handPulse: {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 rgba(20, 184, 166, 0.7)',
          },
          '50%': { 
            transform: 'scale(1.05)',
            boxShadow: '0 0 0 20px rgba(20, 184, 166, 0)',
          },
        },
      },
      
      // ============================================
      // 📐 SPACING & SIZING
      // ============================================
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '92': '23rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      
      // ============================================
      // 🔤 TYPOGRAPHY
      // ============================================
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
        '10xl': ['10rem', { lineHeight: '1' }],
      },
      
      // ============================================
      // 🌫️ BLUR & BACKDROP
      // ============================================
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
        '3xl': '64px',
      },
      
      // ============================================
      // 🎭 BOX SHADOWS
      // ============================================
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.15)',
        'neon-purple': '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
        'neon-pink': '0 0 20px rgba(236, 72, 153, 0.5), 0 0 40px rgba(236, 72, 153, 0.3)',
        'neon-teal': '0 0 20px rgba(20, 184, 166, 0.5), 0 0 40px rgba(20, 184, 166, 0.3)',
        'neon-blue': '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(139, 92, 246, 0.2)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 1px rgba(139, 92, 246, 0.5)',
        'button': '0 4px 14px rgba(139, 92, 246, 0.4)',
        'button-hover': '0 6px 20px rgba(139, 92, 246, 0.6)',
      },
      
      // ============================================
      // 🔲 BORDER RADIUS
      // ============================================
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
      // ============================================
      // ⏱️ TRANSITIONS
      // ============================================
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      // ============================================
      // 📱 SCREENS (Breakpoints)
      // ============================================
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },
      
      // ============================================
      // 🎚️ Z-INDEX
      // ============================================
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    // Custom plugin for glassmorphism utilities
    function({ addUtilities }) {
      const newUtilities = {
        // Glassmorphism effects
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-purple': {
          background: 'rgba(139, 92, 246, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
        },
        '.glass-pink': {
          background: 'rgba(236, 72, 153, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(236, 72, 153, 0.2)',
        },
        '.glass-teal': {
          background: 'rgba(20, 184, 166, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(20, 184, 166, 0.2)',
        },
        
        // Text gradients
        '.text-gradient': {
          background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #14B8A6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
        '.text-gradient-purple-pink': {
          background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
        '.text-gradient-purple-blue': {
          background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
        '.text-gradient-teal-cyan': {
          background: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
        
        // Animated gradient background
        '.bg-gradient-animated': {
          backgroundSize: '200% 200%',
          animation: 'gradientShift 8s ease infinite',
        },
        
        // Hide scrollbar
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        
        // Focus visible styles for accessibility
        '.focus-ring': {
          '&:focus-visible': {
            outline: '2px solid #8B5CF6',
            outlineOffset: '2px',
          },
        },
        
        // Safe area padding for mobile
        '.safe-top': {
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.safe-bottom': {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}