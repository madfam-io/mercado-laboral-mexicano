import React, { useState } from 'react';
import { Moon, Sun, Globe, DollarSign, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';

export const Navigation: React.FC = () => {
  const { theme, setTheme, language, setLanguage, currency, setCurrency, t } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const toggleCurrency = () => {
    setCurrency(currency === 'MXN' ? 'USD' : 'MXN');
  };

  const navItems = [
    { key: 'overview', label: t.nav.overview },
    { key: 'industries', label: t.nav.industries },
    { key: 'regions', label: t.nav.regions },
    { key: 'careers', label: t.nav.careers },
    { key: 'salaries', label: t.nav.salaries },
    { key: 'calculator', label: t.nav.calculator },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              <span className="hidden sm:inline">💼 {t.title}</span>
              <span className="sm:hidden">💼 Salarios MX</span>
            </h1>
            
            <div className="hidden md:flex space-x-6">
              {navItems.map(({ key, label }) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-500 transition-colors font-medium"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleCurrency}
              icon={<DollarSign className="w-4 h-4" />}
              className="bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-200 dark:bg-purple-500/20 dark:hover:bg-purple-500/30 dark:text-purple-300 dark:border-purple-500/30"
            >
              {currency}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              icon={<Globe className="w-4 h-4" />}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:hover:bg-blue-500/30 dark:text-blue-300 dark:border-blue-500/30"
            >
              {language.toUpperCase()}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              icon={theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            />

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                icon={mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              {navItems.map(({ key, label }) => (
                <a
                  key={key}
                  href={`#${key}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};