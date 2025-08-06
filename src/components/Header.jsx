import { FileText, ArrowRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
              <FileText className="w-8 h-8" />
              <ArrowRight className="w-5 h-5" />
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                PRD Translator
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Transform complex PRDs into structured connector prompts
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}; 