import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const Header = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <header className="sticky top-0 z-50 bg-background-primary border-b border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
              Groww Pulse
            </h1>
            <p className="text-xs font-medium text-text-tertiary">
              Weekly Review Insights
            </p>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-background-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-text-secondary" />
            ) : (
              <Sun className="w-5 h-5 text-text-secondary" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
