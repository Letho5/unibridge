import { Router } from 'express';
import { z } from 'zod';
import prisma from '../config/database.js';
import { authenticate, optionalAuth } from '../middleware/authenticate.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// Progress schema
const progressSchema = z.object({
  lessonId: z.string(),
  score: z.number().min(0).max(100).optional(),
  completed: z.boolean().optional(),
  timeSpent: z.number().min(0).optional(),
});

// Get all lessons (public)
router.get('/lessons', async (req, res, next) => {
  try {
    const { category, difficulty } = req.query;

    const where = {};
    if (category) where.category = category;
    if (difficulty) where.difficulty = difficulty;

    const lessons = await prisma.lesson.findMany({
      where,
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    });

    res.json(lessons);
  } catch (error) {
    next(error);
  }
});

// Get single lesson
router.get('/lessons/:id', async (req, res, next) => {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.id },
    });

    if (!lesson) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Lesson not found',
        },
      });
    }

    res.json(lesson);
  } catch (error) {
    next(error);
  }
});

// Get user's progress (requires auth)
router.get('/progress', authenticate, async (req, res, next) => {
  try {
    const progress = await prisma.learningProgress.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate stats
    const stats = {
      totalLessons: await prisma.lesson.count(),
      completedLessons: progress.filter((p) => p.completed).length,
      totalTimeSpent: progress.reduce((sum, p) => sum + p.timeSpent, 0),
      averageScore: progress.length > 0
        ? progress.reduce((sum, p) => sum + (p.score || 0), 0) / progress.length
        : 0,
    };

    res.json({
      progress,
      stats,
    });
  } catch (error) {
    next(error);
  }
});

// Update progress (requires auth)
router.post('/progress', authenticate, validate(progressSchema), async (req, res, next) => {
  try {
    const { lessonId, score, completed, timeSpent } = req.body;

    // Verify lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Lesson not found',
        },
      });
    }

    const progress = await prisma.learningProgress.upsert({
      where: {
        userId_lessonId: {
          userId: req.user.id,
          lessonId,
        },
      },
      update: {
        score: score !== undefined ? score : undefined,
        completed: completed !== undefined ? completed : undefined,
        timeSpent: timeSpent !== undefined ? { increment: timeSpent } : undefined,
        attempts: { increment: 1 },
        completedAt: completed ? new Date() : undefined,
      },
      create: {
        userId: req.user.id,
        lessonId,
        score,
        completed: completed || false,
        timeSpent: timeSpent || 0,
        attempts: 1,
        completedAt: completed ? new Date() : null,
      },
    });

    res.json(progress);
  } catch (error) {
    next(error);
  }
});

// Get lesson categories
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await prisma.lesson.groupBy({
      by: ['category'],
      _count: { id: true },
    });

    res.json(
      categories.map((c) => ({
        name: c.category,
        count: c._count.id,
      }))
    );
  } catch (error) {
    next(error);
  }
});

// Reset progress for a lesson
router.delete('/progress/:lessonId', authenticate, async (req, res, next) => {
  try {
    await prisma.learningProgress.deleteMany({
      where: {
        userId: req.user.id,
        lessonId: req.params.lessonId,
      },
    });

    res.json({ message: 'Progress reset' });
  } catch (error) {
    next(error);
  }
});

// Reset all progress
router.delete('/progress', authenticate, async (req, res, next) => {
  try {
    await prisma.learningProgress.deleteMany({
      where: { userId: req.user.id },
    });

    res.json({ message: 'All progress reset' });
  } catch (error) {
    next(error);
  }
});

export default router;