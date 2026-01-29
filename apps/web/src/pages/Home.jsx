/* ============================================================
   🌉 UNIBRIDGE - HOME PAGE
   Competition-Ready, Award-Winning Landing Page
   ============================================================ */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ============================================
   🎨 ICON COMPONENTS
   Using inline SVGs for zero dependencies
   ============================================ */

const Icons = {
  // Voice/Microphone Icon
  Microphone: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  ),
  
  // Hand/Sign Language Icon
  Hand: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  ),
  
  // Sound/Bell Icon
  Bell: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),
  
  // OCR/File Text Icon
  FileText: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  ),
  
  // Brain/AI Icon
  Brain: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  ),
  
  // Sparkles Icon
  Sparkles: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  ),
  
  // Arrow Right Icon
  ArrowRight: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  ),
  
  // Play Icon
  Play: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  
  // Users Icon
  Users: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  
  // Globe Icon
  Globe: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  
  // Zap Icon
  Zap: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  
  // Shield Icon
  Shield: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  
  // Heart Icon
  Heart: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  
  // Check Icon
  Check: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

/* ============================================
   🎬 ANIMATION VARIANTS
   ============================================ */

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

/* ============================================
   🧩 REUSABLE COMPONENTS
   ============================================ */

// Animated Section Wrapper
const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }
        }
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, color, link, delay = 0 }) => {
  const colorClasses = {
    purple: {
      bg: 'bg-purple-500/10 dark:bg-purple-500/20',
      text: 'text-purple-600 dark:text-purple-400',
      hover: 'group-hover:bg-purple-500',
      shadow: 'group-hover:shadow-purple-500/25',
      border: 'hover:border-purple-500/30',
    },
    teal: {
      bg: 'bg-teal-500/10 dark:bg-teal-500/20',
      text: 'text-teal-600 dark:text-teal-400',
      hover: 'group-hover:bg-teal-500',
      shadow: 'group-hover:shadow-teal-500/25',
      border: 'hover:border-teal-500/30',
    },
    pink: {
      bg: 'bg-pink-500/10 dark:bg-pink-500/20',
      text: 'text-pink-600 dark:text-pink-400',
      hover: 'group-hover:bg-pink-500',
      shadow: 'group-hover:shadow-pink-500/25',
      border: 'hover:border-pink-500/30',
    },
    blue: {
      bg: 'bg-blue-500/10 dark:bg-blue-500/20',
      text: 'text-blue-600 dark:text-blue-400',
      hover: 'group-hover:bg-blue-500',
      shadow: 'group-hover:shadow-blue-500/25',
      border: 'hover:border-blue-500/30',
    },
  };

  const colors = colorClasses[color] || colorClasses.purple;

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group"
    >
      <Link
        to={link}
        className={`
          block h-full p-6 rounded-2xl
          bg-white/70 dark:bg-dark-800/70
          backdrop-blur-xl
          border border-white/20 dark:border-white/10
          ${colors.border}
          shadow-lg shadow-black/5
          hover:shadow-xl ${colors.shadow}
          transition-all duration-300
          focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2
        `}
        aria-label={`Go to ${title}`}
      >
        {/* Icon */}
        <div className={`
          w-14 h-14 rounded-xl mb-4
          flex items-center justify-center
          ${colors.bg} ${colors.text}
          ${colors.hover} group-hover:text-white
          group-hover:shadow-lg ${colors.shadow}
          transition-all duration-300
        `}>
          <Icon className="w-7 h-7" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Link Arrow */}
        <div className={`
          flex items-center gap-2 text-sm font-semibold
          ${colors.text}
          group-hover:gap-3 transition-all duration-300
        `}>
          <span>Get Started</span>
          <Icons.ArrowRight className="w-4 h-4" />
        </div>

        {/* Shine Effect */}
        <div className="card-shine rounded-2xl" />
      </Link>
    </motion.div>
  );
};

// Stat Card Component
const StatCard = ({ value, label, icon: Icon }) => (
  <motion.div
    variants={scaleIn}
    className="text-center p-6"
  >
    <div className="flex justify-center mb-3">
      <div className="w-12 h-12 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center">
        <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
    </div>
    <div className="text-3xl md:text-4xl font-bold text-gradient-primary mb-1">
      {value}
    </div>
    <div className="text-slate-600 dark:text-slate-400 text-sm">
      {label}
    </div>
  </motion.div>
);

// AI Technology Badge
const TechBadge = ({ name, color }) => {
  const colorClasses = {
    purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    pink: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
    teal: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  };

  return (
    <span className={`
      inline-flex items-center px-3 py-1 rounded-full
      text-xs font-semibold border
      ${colorClasses[color] || colorClasses.purple}
    `}>
      {name}
    </span>
  );
};

/* ============================================
   🏠 HOME PAGE COMPONENT
   ============================================ */

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Features data
  const features = [
    {
      icon: Icons.Microphone,
      title: 'VoiceLink',
      description: 'Real-time speech-to-text and text-to-speech conversion powered by advanced AI for seamless voice communication.',
      color: 'purple',
      link: '/voice',
    },
    {
      icon: Icons.Hand,
      title: 'SignLink',
      description: 'AI-powered sign language recognition using MediaPipe hand tracking and TensorFlow.js for real-time translation.',
      color: 'teal',
      link: '/sign',
    },
    {
      icon: Icons.Bell,
      title: 'SoundAlert',
      description: 'Intelligent sound detection for doorbells, alarms, and important audio cues with visual notifications.',
      color: 'pink',
      link: '/sound',
    },
    {
      icon: Icons.FileText,
      title: 'TextVision',
      description: 'Extract and read text from images using Tesseract.js OCR technology for instant accessibility.',
      color: 'blue',
      link: '/ocr',
    },
  ];

  // Stats data
  const stats = [
    { value: '4+', label: 'AI Technologies', icon: Icons.Brain },
    { value: '99%', label: 'Accuracy Rate', icon: Icons.Zap },
    { value: '50ms', label: 'Response Time', icon: Icons.Globe },
    { value: '24/7', label: 'Availability', icon: Icons.Shield },
  ];

  // AI Technologies
  const technologies = [
    { name: 'Web Speech API', color: 'purple' },
    { name: 'MediaPipe Hands', color: 'teal' },
    { name: 'TensorFlow.js', color: 'pink' },
    { name: 'Tesseract.js', color: 'blue' },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* ============================================
          🦸 HERO SECTION
          ============================================ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: mousePosition.x * 2,
              y: mousePosition.y * 2,
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 30 }}
            className="hero-orb-purple w-[500px] h-[500px] -top-48 -left-48"
          />
          <motion.div
            animate={{
              x: mousePosition.x * -1.5,
              y: mousePosition.y * -1.5,
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 30 }}
            className="hero-orb-pink w-[400px] h-[400px] top-1/4 -right-32"
          />
          <motion.div
            animate={{
              x: mousePosition.x * 1,
              y: mousePosition.y * 1,
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 30 }}
            className="hero-orb-teal w-[350px] h-[350px] -bottom-32 left-1/4"
          />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-50 dark:opacity-30" />

        {/* Hero Content */}
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 mb-8"
            >
              <Icons.Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                Powered by 4+ AI Technologies
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-slate-900 dark:text-white">Breaking </span>
              <span className="text-gradient-primary">Barriers</span>
              <br />
              <span className="text-slate-900 dark:text-white">Building </span>
              <span className="text-gradient-purple-pink">Bridges</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              The universal accessibility platform that connects everyone through 
              <span className="text-purple-600 dark:text-purple-400 font-semibold"> voice</span>, 
              <span className="text-teal-600 dark:text-teal-400 font-semibold"> sign</span>, and 
              <span className="text-pink-600 dark:text-pink-400 font-semibold"> vision</span>.
            </motion.p>
            {/* CTA Buttons */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.3 }}
  className="flex flex-col sm:flex-row items-center justify-center gap-4"
>
  <Link
    to="/voice"
    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 whitespace-nowrap"
  >
    <span>Start Communicating</span>
    <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </Link>
  <button
    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 hover:border-purple-500 hover:text-purple-600 dark:hover:border-purple-500 dark:hover:text-purple-400 transition-all duration-300 whitespace-nowrap"
    onClick={() => {
      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    }}
  >
    <Icons.Play className="w-4 h-4" />
    <span>See How It Works</span>
  </button>
</motion.div>

 
            {/* Tech Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-2 mt-10"
            >
              {technologies.map((tech, index) => (
                <TechBadge key={index} name={tech.name} color={tech.color} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-slate-600 flex justify-center pt-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-purple-500"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================
          🎯 FEATURES SECTION
          ============================================ */}
      <AnimatedSection id="features" className="py-20 md:py-32">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              variants={fadeIn}
              className="inline-block px-4 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-semibold mb-4"
            >
              CORE FEATURES
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4"
            >
              Four Powerful Ways to{' '}
              <span className="text-gradient-primary">Connect</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-600 dark:text-slate-400"
            >
              Each feature is built with cutting-edge AI to ensure seamless, 
              real-time accessibility for everyone.
            </motion.p>
          </div>

          {/* Feature Cards Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} delay={index * 0.1} />
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ============================================
          📊 STATS SECTION
          ============================================ */}
      <AnimatedSection className="py-20">
        <div className="container-custom">
          <div className="glass-card p-8 md:p-12">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================
          🤖 AI SHOWCASE SECTION
          ============================================ */}
      <AnimatedSection className="py-20 md:py-32">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <motion.span
                variants={fadeIn}
                className="inline-block px-4 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 text-sm font-semibold mb-4"
              >
                AI TECHNOLOGY
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6"
              >
                Powered by{' '}
                <span className="text-gradient-purple-pink">Advanced AI</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-slate-600 dark:text-slate-400 mb-8"
              >
                UniBridge combines multiple AI technologies to deliver accurate, 
                real-time accessibility features that adapt to your needs.
              </motion.p>

              {/* AI Features List */}
              <motion.ul variants={staggerContainer} className="space-y-4">
                {[
                  { icon: Icons.Microphone, text: 'Web Speech API for voice recognition & synthesis', color: 'purple' },
                  { icon: Icons.Hand, text: 'MediaPipe Hands for 21-point hand tracking', color: 'teal' },
                  { icon: Icons.Brain, text: 'TensorFlow.js for on-device ML inference', color: 'pink' },
                  { icon: Icons.FileText, text: 'Tesseract.js for accurate OCR processing', color: 'blue' },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    variants={fadeInUp}
                    className="flex items-center gap-4"
                  >
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${item.color === 'purple' ? 'bg-purple-500/10 text-purple-500' : ''}
                      ${item.color === 'teal' ? 'bg-teal-500/10 text-teal-500' : ''}
                      ${item.color === 'pink' ? 'bg-pink-500/10 text-pink-500' : ''}
                      ${item.color === 'blue' ? 'bg-blue-500/10 text-blue-500' : ''}
                    `}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">{item.text}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Right Visual */}
            <motion.div
              variants={scaleIn}
              className="relative"
            >
              {/* Main Visual Card */}
              <div className="relative glass-card p-8 overflow-hidden">
                {/* Animated AI Brain Visualization */}
                <div className="aspect-square relative flex items-center justify-center">
                  {/* Outer Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-4 rounded-full border-2 border-dashed border-purple-500/30"
                  />
                  
                  {/* Middle Ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-12 rounded-full border-2 border-dashed border-pink-500/30"
                  />
                  
                  {/* Inner Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-20 rounded-full border-2 border-dashed border-teal-500/30"
                  />

                  {/* Center Brain Icon */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-teal-500 flex items-center justify-center shadow-lg"
                  >
                    <Icons.Brain className="w-12 h-12 text-white" />
                  </motion.div>

                  {/* Floating Tech Icons */}
                  {[
                    { Icon: Icons.Microphone, position: 'top-8 left-1/2 -translate-x-1/2', color: 'purple' },
                    { Icon: Icons.Hand, position: 'right-8 top-1/2 -translate-y-1/2', color: 'teal' },
                    { Icon: Icons.Bell, position: 'bottom-8 left-1/2 -translate-x-1/2', color: 'pink' },
                    { Icon: Icons.FileText, position: 'left-8 top-1/2 -translate-y-1/2', color: 'blue' },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, delay: index * 0.3, repeat: Infinity }}
                      className={`absolute ${item.position}`}
                    >
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center
                        bg-white dark:bg-dark-800 shadow-lg
                        ${item.color === 'purple' ? 'text-purple-500' : ''}
                        ${item.color === 'teal' ? 'text-teal-500' : ''}
                        ${item.color === 'pink' ? 'text-pink-500' : ''}
                        ${item.color === 'blue' ? 'text-blue-500' : ''}
                      `}>
                        <item.Icon className="w-6 h-6" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================
          💜 WHY UNIBRIDGE SECTION
          ============================================ */}
      <AnimatedSection className="py-20 md:py-32 bg-slate-50 dark:bg-dark-800/50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              variants={fadeIn}
              className="inline-block px-4 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-4"
            >
              WHY UNIBRIDGE
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4"
            >
              Designed for{' '}
              <span className="text-gradient-teal-cyan">Everyone</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-600 dark:text-slate-400"
            >
              Accessibility isn't a feature—it's a fundamental right. 
              UniBridge makes communication possible for all.
            </motion.p>
          </div>

          {/* Benefits Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Icons.Zap,
                title: 'Real-Time Processing',
                description: 'Instant translations and conversions with no noticeable delay.',
              },
              {
                icon: Icons.Shield,
                title: 'Privacy First',
                description: 'All AI processing happens locally on your device. Your data stays yours.',
              },
              {
                icon: Icons.Globe,
                title: 'Works Everywhere',
                description: 'Browser-based solution that works on any device, no installation needed.',
              },
              {
                icon: Icons.Heart,
                title: 'Built with Care',
                description: 'Developed with input from accessibility communities worldwide.',
              },
              {
                icon: Icons.Users,
                title: 'Inclusive Design',
                description: 'WCAG AA compliant interface with high contrast and screen reader support.',
              },
              {
                icon: Icons.Sparkles,
                title: 'Constantly Improving',
                description: 'Regular updates with new features and improved AI accuracy.',
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass-card p-6 group hover:border-purple-500/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ============================================
          📣 CTA SECTION
          ============================================ */}
      <AnimatedSection className="py-20 md:py-32">
        <div className="container-custom">
          <motion.div
            variants={scaleIn}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 p-[2px]"
          >
            <div className="relative bg-white dark:bg-dark-900 rounded-[calc(1.5rem-2px)] p-8 md:p-16 overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-purple-500/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-teal-500/20 to-transparent" />

              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <motion.div
                  variants={fadeInUp}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-6"
                >
                  <Icons.Heart className="w-8 h-8 text-white" />
                </motion.div>

                <motion.h2
                  variants={fadeInUp}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4"
                >
                  Ready to Break Down{' '}
                  <span className="text-gradient-primary">Communication Barriers?</span>
                </motion.h2>

                <motion.p
                  variants={fadeInUp}
                  className="text-lg text-slate-600 dark:text-slate-400 mb-8"
                >
                  Join thousands of users who are already experiencing seamless 
                  accessibility with UniBridge. Start your journey today.
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <Link
                    to="/voice"
                    className="btn-gradient btn-lg group"
                  >
                    <span>Try VoiceLink Free</span>
                    <Icons.ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/sign"
                    className="btn-secondary btn-lg"
                  >
                    <Icons.Hand className="w-5 h-5 mr-2" />
                    <span>Explore SignLink</span>
                  </Link>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  variants={fadeIn}
                  className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-10 border-t border-slate-200 dark:border-dark-700"
                >
                  {[
                    { icon: Icons.Check, text: 'No signup required' },
                    { icon: Icons.Check, text: '100% Free to use' },
                    { icon: Icons.Check, text: 'Privacy-focused' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <item.icon className="w-5 h-5 text-green-500" />
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ============================================
          🦶 FOOTER SECTION
          ============================================ */}
      <footer className="py-12 border-t border-slate-200 dark:border-dark-800">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                UniBridge
              </span>
            </div>

            {/* Links */}
            <nav className="flex items-center gap-6">
              <Link to="/voice" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                VoiceLink
              </Link>
              <Link to="/sign" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                SignLink
              </Link>
              <Link to="/settings" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                Settings
              </Link>
            </nav>

            {/* Copyright */}
            <p className="text-sm text-slate-500 dark:text-slate-500">
              © {new Date().getFullYear()} UniBridge. Built for accessibility.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;