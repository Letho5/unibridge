import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Seed Lessons
  const lessons = [
    {
      id: 'lesson-alphabet',
      title: 'ASL Alphabet',
      description: 'Learn all 26 letters of the ASL alphabet',
      category: 'Basics',
      difficulty: 'beginner',
      duration: 15,
      order: 1,
      content: JSON.stringify({
        signs: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      }),
    },
    {
      id: 'lesson-numbers',
      title: 'Numbers 1-10',
      description: 'Master counting in sign language',
      category: 'Basics',
      difficulty: 'beginner',
      duration: 10,
      order: 2,
      content: JSON.stringify({
        signs: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      }),
    },
    {
      id: 'lesson-greetings',
      title: 'Common Greetings',
      description: 'Hello, goodbye, thank you, and more',
      category: 'Everyday',
      difficulty: 'beginner',
      duration: 20,
      order: 3,
      content: JSON.stringify({
        signs: ['HELLO', 'GOODBYE', 'THANK-YOU', 'PLEASE', 'SORRY', 'YES', 'NO'],
      }),
    },
    {
      id: 'lesson-family',
      title: 'Family Signs',
      description: 'Learn signs for family members',
      category: 'Everyday',
      difficulty: 'intermediate',
      duration: 15,
      order: 4,
      content: JSON.stringify({
        signs: ['MOTHER', 'FATHER', 'SISTER', 'BROTHER', 'FAMILY', 'BABY'],
      }),
    },
    {
      id: 'lesson-emergency',
      title: 'Emergency Phrases',
      description: 'Critical signs everyone should know',
      category: 'Essential',
      difficulty: 'beginner',
      duration: 10,
      order: 5,
      content: JSON.stringify({
        signs: ['HELP', 'EMERGENCY', 'CALL', 'POLICE', 'HOSPITAL', 'HURT'],
      }),
    },
  ];

  for (const lesson of lessons) {
    await prisma.lesson.upsert({
      where: { id: lesson.id },
      update: lesson,
      create: lesson,
    });
  }

  console.log(`✅ Seeded ${lessons.length} lessons`);

  // Seed Signs (ASL Alphabet)
  const alphabetSigns = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => ({
    gloss: letter,
    language: 'ASL',
    category: 'alphabet',
    description: `The letter ${letter} in American Sign Language`,
    difficulty: 'easy',
  }));

  // Common words
  const commonSigns = [
    { gloss: 'HELLO', category: 'greetings', description: 'Wave hand near forehead outward', difficulty: 'easy' },
    { gloss: 'GOODBYE', category: 'greetings', description: 'Open and close hand waving', difficulty: 'easy' },
    { gloss: 'THANK-YOU', category: 'greetings', description: 'Flat hand from chin moving outward', difficulty: 'easy' },
    { gloss: 'PLEASE', category: 'greetings', description: 'Flat hand circles on chest', difficulty: 'easy' },
    { gloss: 'SORRY', category: 'greetings', description: 'Fist circles on chest', difficulty: 'easy' },
    { gloss: 'YES', category: 'common', description: 'Fist nods up and down', difficulty: 'easy' },
    { gloss: 'NO', category: 'common', description: 'Index and middle fingers snap to thumb', difficulty: 'easy' },
    { gloss: 'HELP', category: 'emergency', description: 'Thumbs up on palm, lifted up', difficulty: 'easy' },
    { gloss: 'LOVE', category: 'emotions', description: 'Cross arms over chest', difficulty: 'easy' },
    { gloss: 'FRIEND', category: 'people', description: 'Hook index fingers together', difficulty: 'easy' },
    { gloss: 'MOTHER', category: 'family', description: 'Thumb of open hand touches chin', difficulty: 'easy' },
    { gloss: 'FATHER', category: 'family', description: 'Thumb of open hand touches forehead', difficulty: 'easy' },
    { gloss: 'WATER', category: 'food', description: 'W hand taps chin', difficulty: 'easy' },
    { gloss: 'FOOD', category: 'food', description: 'Flat O hand taps mouth', difficulty: 'easy' },
    { gloss: 'HAPPY', category: 'emotions', description: 'Flat hands brush upward on chest', difficulty: 'easy' },
  ].map((sign) => ({
    ...sign,
    language: 'ASL',
  }));

  const allSigns = [...alphabetSigns, ...commonSigns];

  for (const sign of allSigns) {
    await prisma.sign.upsert({
      where: {
        gloss_language: {
          gloss: sign.gloss,
          language: sign.language,
        },
      },
      update: sign,
      create: sign,
    });
  }

  console.log(`✅ Seeded ${allSigns.length} signs`);

  console.log('🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });