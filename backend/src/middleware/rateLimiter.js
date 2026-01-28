import rateLimit from 'express-rate-limit';

export const rateLimiter = {
  // General API rate limit
  general: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: {
      error: {
        code: 'RATE_LIMITED',
        message: 'Too many requests. Please try again later.',
      },
    },
    standardHeaders: true,
    legacyHeaders: false,
  }),

  // Strict rate limit for auth endpoints
  auth: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: {
      error: {
        code: 'RATE_LIMITED',
        message: 'Too many login attempts. Please try again in 15 minutes.',
      },
    },
    standardHeaders: true,
    legacyHeaders: false,
  }),

  // Rate limit for translation endpoints
  translation: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60,
    message: {
      error: {
        code: 'RATE_LIMITED',
        message: 'Too many translation requests. Please slow down.',
      },
    },
    standardHeaders: true,
    legacyHeaders: false,
  }),
};