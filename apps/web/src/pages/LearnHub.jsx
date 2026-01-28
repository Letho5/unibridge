import { useState } from 'react';
import { BookOpen, Play, CheckCircle, Lock, Star, Trophy } from 'lucide-react';
import { cn } from '@utils/helpers';

const lessons = [
  {
    id: 1,
    title: 'ASL Alphabet',
    description: 'Learn all 26 letters of the ASL alphabet',
    category: 'Basics',
    duration: '15 min',
    difficulty: 'Beginner',
    progress: 100,
    completed: true,
  },
  {
    id: 2,
    title: 'Numbers 1-10',
    description: 'Master counting in sign language',
    category: 'Basics',
    duration: '10 min',
    difficulty: 'Beginner',
    progress: 60,
    completed: false,
  },
  {
    id: 3,
    title: 'Common Greetings',
    description: 'Hello, goodbye, thank you, and more',
    category: 'Everyday',
    duration: '20 min',
    difficulty: 'Beginner',
    progress: 0,
    completed: false,
  },
  {
    id: 4,
    title: 'Family Signs',
    description: 'Learn signs for family members',
    category: 'Everyday',
    duration: '15 min',
    difficulty: 'Intermediate',
    progress: 0,
    completed: false,
    locked: true,
  },
  {
    id: 5,
    title: 'Emergency Phrases',
    description: 'Critical signs everyone should know',
    category: 'Essential',
    duration: '10 min',
    difficulty: 'Beginner',
    progress: 0,
    completed: false,
  },
];

const achievements = [
  { id: 1, name: 'First Sign', icon: Star, earned: true },
  { id: 2, name: 'Alphabet Master', icon: Trophy, earned: true },
  { id: 3, name: '7 Day Streak', icon: Star, earned: false },
];

export default function LearnHub() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Basics', 'Everyday', 'Essential'];

  const filteredLessons = selectedCategory === 'All'
    ? lessons
    : lessons.filter((l) => l.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">LearnHub</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Master sign language with interactive lessons
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <div className="card">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Your Progress</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Overall</span>
                  <span className="font-medium text-gray-900 dark:text-white">32%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-dark-card rounded-full overflow-hidden">
                  <div className="h-full bg-primary-600 rounded-full" style={{ width: '32%' }} />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Lessons completed</span>
                <span className="font-medium text-gray-900 dark:text-white">1/5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Current streak</span>
                <span className="font-medium text-orange-500">🔥 3 days</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="card">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Achievements</h2>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={cn(
                    'flex items-center gap-3 p-2 rounded-lg',
                    achievement.earned ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'opacity-50'
                  )}
                >
                  <achievement.icon
                    className={cn(
                      'w-6 h-6',
                      achievement.earned ? 'text-yellow-500' : 'text-gray-400'
                    )}
                  />
                  <span className={cn(
                    'text-sm font-medium',
                    achievement.earned ? 'text-gray-900 dark:text-white' : 'text-gray-500'
                  )}>
                    {achievement.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Category Filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors',
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-border'
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Lessons Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredLessons.map((lesson) => (
              <div
                key={lesson.id}
                className={cn(
                  'card hover:shadow-lg transition-shadow',
                  lesson.locked && 'opacity-60'
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={cn(
                    'px-2 py-1 rounded text-xs font-medium',
                    lesson.difficulty === 'Beginner'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                  )}>
                    {lesson.difficulty}
                  </div>
                  {lesson.completed && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {lesson.locked && (
                    <Lock className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {lesson.description}
                </p>

                {lesson.progress > 0 && !lesson.completed && (
                  <div className="mb-4">
                    <div className="h-1.5 bg-gray-200 dark:bg-dark-card rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-600 rounded-full"
                        style={{ width: `${lesson.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{lesson.progress}% complete</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{lesson.duration}</span>
                  <button
                    disabled={lesson.locked}
                    className={cn(
                      'btn text-sm',
                      lesson.locked ? 'btn-secondary' : 'btn-primary'
                    )}
                  >
                    {lesson.locked ? (
                      <>
                        <Lock className="w-4 h-4" />
                        Locked
                      </>
                    ) : lesson.completed ? (
                      <>
                        <Play className="w-4 h-4" />
                        Review
                      </>
                    ) : lesson.progress > 0 ? (
                      <>
                        <Play className="w-4 h-4" />
                        Continue
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Start
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}