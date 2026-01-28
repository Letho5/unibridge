import { Router } from 'express';
import { z } from 'zod';
import prisma from '../config/database.js';
import { authenticate } from '../middleware/authenticate.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Preferences schema
const preferencesSchema = z.object({
  signLanguage: z.string().optional(),
  voiceSpeed: z.number().min(0.1).max(10).optional(),
  voicePitch: z.number().min(0).max(2).optional(),
  voiceLanguage: z.string().optional(),
  theme: z.enum(['light', 'dark', 'system']).optional(),
  highContrast: z.boolean().optional(),
  largeText: z.boolean().optional(),
  reducedMotion: z.boolean().optional(),
  soundAlerts: z.boolean().optional(),
});

// Get preferences
router.get('/preferences', async (req, res, next) => {
  try {
    let preferences = await prisma.userPreferences.findUnique({
      where: { userId: req.user.id },
    });

    // Create default preferences if not exists
    if (!preferences) {
      preferences = await prisma.userPreferences.create({
        data: { userId: req.user.id },
      });
    }

    res.json(preferences);
  } catch (error) {
    next(error);
  }
});

// Update preferences
router.put('/preferences', validate(preferencesSchema), async (req, res, next) => {
  try {
    const preferences = await prisma.userPreferences.upsert({
      where: { userId: req.user.id },
      update: req.body,
      create: {
        userId: req.user.id,
        ...req.body,
      },
    });

    res.json(preferences);
  } catch (error) {
    next(error);
  }
});

// Update profile
router.put('/profile', async (req, res, next) => {
  try {
    const { name, avatar } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { name, avatar },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Delete account
router.delete('/account', async (req, res, next) => {
  try {
    await prisma.user.delete({
      where: { id: req.user.id },
    });

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;