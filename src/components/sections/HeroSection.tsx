import React from 'react';
import { DollarSign, Cpu, MapPin, Calculator } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../ui/StatCard';
import { formatCurrency } from '../../utils/currency';
import { salaryData } from '../../data/salaryData';

export const HeroSection: React.FC = () => {
  const { language, currency, exchangeRate, t } = useApp();

  const formatValue = (value: number) => 
    formatCurrency(value, currency, language, exchangeRate);

  return (
    <section id="overview" className="relative overflow-hidden py-20 text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-blue-600/10 dark:from-purple-600/20 dark:via-pink-600/20 dark:to-blue-600/20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
          {t.subtitle}
        </h2>
        
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-12">
          {language === 'es' ? 'Datos actualizados para 2025' : 'Updated data for 2025'}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<DollarSign className="w-8 h-8" />}
            title={t.stats.avgSalary}
            value={formatValue(salaryData.national.average)}
            color="text-green-500"
          />
          
          <StatCard
            icon={<Cpu className="w-8 h-8" />}
            title={t.stats.techRange}
            value={`${formatValue(500000)} - ${formatValue(1500000)}+`}
            color="text-blue-500"
          />
          
          <StatCard
            icon={<MapPin className="w-8 h-8" />}
            title={t.stats.regionalVar}
            value="40-90%"
            color="text-purple-500"
          />
          
          <StatCard
            icon={<Calculator className="w-8 h-8" />}
            title={t.stats.taxBurden}
            value="26-43%"
            color="text-red-500"
          />
        </div>
      </div>
    </section>
  );
};