import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-dark-surface border-t border-light-border dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for accessibility</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">
              Privacy
            </a>
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">
              Terms
            </a>
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">
              Contact
            </a>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 UniBridge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}