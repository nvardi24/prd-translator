import { Header } from '../Header';

export const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <Header />
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {children}
    </main>
  </div>
); 