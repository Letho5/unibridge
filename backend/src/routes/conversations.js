import { Router } from 'express';
import { z } from 'zod';
import prisma from '../config/database.js';
import { authenticate } from '../middleware/authenticate.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Validation schemas
const createConversationSchema = z.object({
  title: z.string().max(200).optional(),
});

const messageSchema = z.object({
  senderType: z.enum(['signer', 'speaker', 'system']),
  content: z.string().min(1).max(5000),
  translatedTo: z.string().optional(),
  confidence: z.number().min(0).max(1).optional(),
});

// Create conversation
router.post('/', validate(createConversationSchema), async (req, res, next) => {
  try {
    const { title } = req.body;

    const conversation = await prisma.conversation.create({
      data: {
        title,
        participants: {
          create: {
            userId: req.user.id,
            role: 'both',
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: { id: true, name: true, avatar: true },
            },
          },
        },
      },
    });

    res.status(201).json(conversation);
  } catch (error) {
    next(error);
  }
});

// Get all conversations
router.get('/', async (req, res, next) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: { userId: req.user.id },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: { id: true, name: true, avatar: true },
            },
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

// Get single conversation with messages
router.get('/:id', async (req, res, next) => {
  try {
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: req.params.id,
        participants: {
          some: { userId: req.user.id },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: { id: true, name: true, avatar: true },
            },
          },
        },
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!conversation) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Conversation not found',
        },
      });
    }

    res.json(conversation);
  } catch (error) {
    next(error);
  }
});

// Add message to conversation
router.post('/:id/messages', validate(messageSchema), async (req, res, next) => {
  try {
    const { senderType, content, translatedTo, confidence } = req.body;

    // Verify user is participant
    const participant = await prisma.conversationParticipant.findFirst({
      where: {
        conversationId: req.params.id,
        userId: req.user.id,
      },
    });

    if (!participant) {
      return res.status(403).json({
        error: {
          code: 'FORBIDDEN',
          message: 'You are not a participant in this conversation',
        },
      });
    }

    const message = await prisma.message.create({
      data: {
        conversationId: req.params.id,
        senderType,
        content,
        translatedTo,
        confidence,
      },
    });

    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
});

// End conversation
router.patch('/:id/end', async (req, res, next) => {
  try {
    const conversation = await prisma.conversation.updateMany({
      where: {
        id: req.params.id,
        participants: {
          some: { userId: req.user.id },
        },
      },
      data: {
        endedAt: new Date(),
      },
    });

    res.json({ message: 'Conversation ended' });
  } catch (error) {
    next(error);
  }
});

// Delete conversation
router.delete('/:id', async (req, res, next) => {
  try {
    // Verify user is participant
    const participant = await prisma.conversationParticipant.findFirst({
      where: {
        conversationId: req.params.id,
        userId: req.user.id,
      },
    });

    if (!participant) {
      return res.status(403).json({
        error: {
          code: 'FORBIDDEN',
          message: 'You are not a participant in this conversation',
        },
      });
    }

    await prisma.conversation.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Conversation deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;