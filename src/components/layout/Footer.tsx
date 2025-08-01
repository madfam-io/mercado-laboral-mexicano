import React from 'react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { language, exchangeRate, t } = useApp();

  return (
    <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'es' 
            ? '📊 Basado en el análisis del mercado laboral mexicano 2025' 
            : '📊 Based on Mexican job market analysis 2025'
          }
        </p>
        <p className="mt-2 text-sm text-gray-500">
          {t.currency.rate}: 1 USD = {exchangeRate} MXN
        </p>
        <p className="mt-2 text-xs text-gray-400">
          {language === 'es'
            ? 'Creado en una cálida noche en Cuernavaca, Morelos'
            : 'Crafted on a warm evening in Cuernavaca, Morelos'
          }
        </p>
      </div>
    </footer>
  );
};