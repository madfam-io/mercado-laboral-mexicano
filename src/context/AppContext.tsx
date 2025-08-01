import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppContextType, Theme, Language, Currency } from '../types';
import { translations } from '../data/translations';

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('es');
  const [currency, setCurrency] = useState<Currency>('MXN');
  const [exchangeRate] = useState<number>(18.85);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Get translation based on current language
  const t = translations[language];

  const value: AppContextType = {
    theme,
    setTheme,
    language,
    setLanguage,
    currency,
    setCurrency,
    exchangeRate,
    t,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};