import { Router } from 'express';
import prisma from '../config/database.js';

const router = Router();

// Get signs with filters
router.get('/', async (req, res, next) => {
  try {
    const { category, language = 'ASL', difficulty, limit = 100, offset = 0 } = req.query;

    const where = { language };
    if (category) where.category = category;
    if (difficulty) where.difficulty = difficulty;

    const [signs, total] = await Promise.all([
      prisma.sign.findMany({
        where,
        take: parseInt(limit),
        skip: parseInt(offset),
        orderBy: { gloss: 'asc' },
      }),
      prisma.sign.count({ where }),
    ]);

    res.json({
      data: signs,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: parseInt(offset) + signs.length < total,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Search signs
router.get('/search', async (req, res, next) => {
  try {
    const { q, language = 'ASL' } = req.query;

    if (!q || q.length < 1) {
      return res.json({ data: [] });
    }

    const signs = await prisma.sign.findMany({
      where: {
        language,
        OR: [
          { gloss: { contains: q.toUpperCase() } },
          { description: { contains: q.toLowerCase() } },
        ],
      },
      take: 20,
      orderBy: { gloss: 'asc' },
    });

    res.json({ data: signs });
  } catch (error) {
    next(error);
  }
});

// Get sign categories
router.get('/categories', async (req, res, next) => {
  try {
    const { language = 'ASL' } = req.query;

    const categories = await prisma.sign.groupBy({
      by: ['category'],
      where: { language },
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

// Get single sign
router.get('/:id', async (req, res, next) => {
  try {
    const sign = await prisma.sign.findUnique({
      where: { id: req.params.id },
    });

    if (!sign) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Sign not found',
        },
      });
    }

    res.json(sign);
  } catch (error) {
    next(error);
  }
});

// Get sign by gloss and language
router.get('/lookup/:gloss', async (req, res, next) => {
  try {
    const { language = 'ASL' } = req.query;

    const sign = await prisma.sign.findUnique({
      where: {
        gloss_language: {
          gloss: req.params.gloss.toUpperCase(),
          language,
        },
      },
    });

    if (!sign) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Sign not found',
        },
      });
    }

    res.json(sign);
  } catch (error) {
    next(error);
  }
});

export default router;