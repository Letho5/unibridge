/* ============================================================
   🌉 UNIBRIDGE - 404 NOT FOUND PAGE
   Beautiful, Helpful Error Page
   ============================================================ */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ============================================
   🎨 ICON COMPONENTS
   ============================================ */

const Icons = {
  Home: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),

  ArrowLeft: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  ),

  Search: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
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

  Settings: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
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

const floatAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

/* ============================================
   🎯 NOT FOUND COMPONENT
   ============================================ */

const NotFound = () => {
  // Quick links for navigation
  const quickLinks = [
    { to: '/', icon: Icons.Home, label: 'Home', color: 'purple' },
    { to: '/voice', icon: Icons.Microphone, label: 'VoiceLink', color: 'purple' },
    { to: '/sign', icon: Icons.Hand, label: 'SignLink', color: 'teal' },
    { to: '/sound', icon: Icons.Bell, label: 'SoundAlert', color: 'pink' },
    { to: '/ocr', icon: Icons.FileText, label: 'TextVision', color: 'blue' },
    { to: '/settings', icon: Icons.Settings, label: 'Settings', color: 'slate' },
  ];

  const colorClasses = {
    purple: 'bg-purple-500/10 text-purple-500 hover:bg-purple-500 hover:text-white',
    teal: 'bg-teal-500/10 text-teal-500 hover:bg-teal-500 hover:text-white',
    pink: 'bg-pink-500/10 text-pink-500 hover:bg-pink-500 hover:text-white',
    blue: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white',
    slate: 'bg-slate-500/10 text-slate-500 hover:bg-slate-500 hover:text-white',
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          animate={floatAnimation}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            ...floatAnimation,
            transition: { ...floatAnimation.transition, delay: 2 }
          }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            ...floatAnimation,
            transition: { ...floatAnimation.transition, delay: 4 }
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl"
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-20" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* 404 Number */}
          <motion.div
            variants={fadeInUp}
            className="relative mb-8"
          >
            {/* Glowing Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-teal-500/30 rounded-full blur-3xl" />
            </div>
            
            {/* 404 Text */}
            <motion.h1
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(139, 92, 246, 0.5)',
                  '0 0 60px rgba(139, 92, 246, 0.3)',
                  '0 0 20px rgba(139, 92, 246, 0.5)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative text-[150px] md:text-[200px] font-black leading-none text-gradient-primary select-none"
            >
              404
            </motion.h1>
          </motion.div>

          {/* Message */}
          <motion.div variants={fadeInUp} className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md mx-auto">
              The page you're looking for seems to have wandered off. 
              Let's get you back on track.
            </p>
          </motion.div>

          {/* Search Illustration */}
          <motion.div
            variants={fadeInUp}
            className="flex justify-center mb-10"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30"
            >
              <Icons.Search className="w-10 h-10 text-white" />
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              to="/"
              className="btn-primary btn-lg group w-full sm:w-auto justify-center"
            >
              <Icons.Home className="w-5 h-5 mr-2" />
              <span>Back to Home</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-secondary btn-lg group w-full sm:w-auto justify-center"
            >
              <Icons.ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span>Go Back</span>
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">
              Or jump to one of these pages:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl
                    text-sm font-medium
                    transition-all duration-300
                    ${colorClasses[link.color]}
                  `}
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Fun Fact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-16 p-4 rounded-2xl bg-slate-100/50 dark:bg-dark-800/50 backdrop-blur-sm"
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-purple-600 dark:text-purple-400">Fun fact:</span>{' '}
            The term "404" comes from the HTTP status code meaning "Not Found". 
            It was named after room 404 at CERN where the original web servers were located! 🌐
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;