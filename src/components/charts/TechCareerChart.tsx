import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { useChartData } from '../../hooks/useChartData';
import { formatCurrency } from '../../utils/currency';

export const TechCareerChart: React.FC = () => {
  const { theme, currency, language, exchangeRate } = useApp();
  const { techLevelData } = useChartData();

  const formatValue = (value: number) => 
    formatCurrency(value, currency, language, exchangeRate);

  const customTooltipFormatter = (value: number, name: string) => {
    const label = language === 'es' 
      ? (name === 'min' ? 'Mínimo' : 'Máximo')
      : (name === 'min' ? 'Minimum' : 'Maximum');
    return [formatValue(value), label];
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart 
        data={techLevelData} 
        margin={{ top: 20, right: 20, bottom: 20, left: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis 
          dataKey="level" 
          tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#4B5563' }} 
        />
        <YAxis 
          tickFormatter={formatValue}
          tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#4B5563' }} 
        />
        <Tooltip 
          formatter={customTooltipFormatter}
          contentStyle={{ 
            backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF', 
            borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
            borderRadius: '8px'
          }} 
        />
        <Legend />
        <Area 
          type="monotone" 
          dataKey="min" 
          stackId="1" 
          stroke="#3b82f6" 
          fill="#3b82f6" 
          fillOpacity={0.3} 
          name={language === 'es' ? 'Mínimo' : 'Minimum'} 
        />
        <Area 
          type="monotone" 
          dataKey="max" 
          stackId="1" 
          stroke="#10b981" 
          fill="#10b981" 
          fillOpacity={0.3} 
          name={language === 'es' ? 'Máximo' : 'Maximum'} 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};