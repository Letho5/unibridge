import { Router } from 'express';
import { z } from 'zod';
import prisma from '../config/database.js';
import { authenticate, optionalAuth } from '../middleware/authenticate.js';
import { validate } from '../middleware/validate.js';
import { rateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Validation schema
const translationSchema = z.object({
  type: z.enum(['sign-to-text', 'text-to-sign', 'voice-to-text', 'text-to-voice']),
  input: z.string().min(1).max(5000),
  output: z.string().min(1).max(5000),
  confidence: z.number().min(0).max(1).optional(),
  language: z.string().default('ASL'),
});

// Save translation (auth optional - works for anonymous users too)
router.post('/', rateLimiter.translation, optionalAuth, validate(translationSchema), async (req, res, next) => {
  try {
    const { type, input, output, confidence, language } = req.body;

    const translation = await prisma.translation.create({
      data: {
        type,
        input,
        output,
        confidence,
        language,
        userId: req.user?.id || null,
      },
    });

    res.status(201).json(translation);
  } catch (error) {
    next(error);
  }
});

// Get user's translations (requires auth)
router.get('/', authenticate, async (req, res, next) => {
  try {
    const { limit = 50, offset = 0, type } = req.query;

    const where = {
      userId: req.user.id,
    };

    if (type) {
      where.type = type;
    }

    const [translations, total] = await Promise.all([
      prisma.translation.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: parseInt(limit),
        skip: parseInt(offset),
      }),
      prisma.translation.count({ where }),
    ]);

    res.json({
      data: translations,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: parseInt(offset) + translations.length < total,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Get single translation
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const translation = await prisma.translation.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!translation) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Translation not found',
        },
      });
    }

    res.json(translation);
  } catch (error) {
    next(error);
  }
});

// Delete single translation
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    await prisma.translation.deleteMany({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    res.json({ message: 'Translation deleted' });
  } catch (error) {
    next(error);
  }
});

// Clear all translations
router.delete('/', authenticate, async (req, res, next) => {
  try {
    await prisma.translation.deleteMany({
      where: { userId: req.user.id },
    });

    res.json({ message: 'All translations cleared' });
  } catch (error) {
    next(error);
  }
});

export default router;