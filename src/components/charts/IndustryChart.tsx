import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell 
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { useChartData } from '../../hooks/useChartData';
import { formatCurrency } from '../../utils/currency';

export const IndustryChart: React.FC = () => {
  const { theme, currency, language, exchangeRate } = useApp();
  const { industryChartData } = useChartData();

  const formatValue = (value: number) => 
    formatCurrency(value, currency, language, exchangeRate);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart 
        data={industryChartData} 
        margin={{ top: 20, right: 20, bottom: 80, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis 
          dataKey="name" 
          angle={-45} 
          textAnchor="end" 
          interval={0} 
          tick={{ 
            fill: theme === 'dark' ? '#9CA3AF' : '#4B5563', 
            fontSize: 12 
          }} 
        />
        <YAxis 
          tickFormatter={formatValue}
          tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#4B5563' }} 
        />
        <Tooltip 
          formatter={(value: number) => [formatValue(value), 'Salary']}
          contentStyle={{ 
            backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF', 
            borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
            borderRadius: '8px'
          }} 
        />
        <Bar dataKey="salary" radius={[8, 8, 0, 0]}>
          {industryChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color as string} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};