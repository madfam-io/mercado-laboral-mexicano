import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { useChartData } from '../../hooks/useChartData';
import { formatCurrency } from '../../utils/currency';

export const EducationChart: React.FC = () => {
  const { theme, currency, language, exchangeRate } = useApp();
  const { educationData } = useChartData();

  const formatValue = (value: number) => 
    formatCurrency(value, currency, language, exchangeRate);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart 
        data={educationData} 
        margin={{ top: 20, right: 20, bottom: 60, left: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis 
          dataKey="level" 
          angle={-25} 
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
          formatter={(value: number) => [formatValue(value), language === 'es' ? 'Salario Anual' : 'Annual Salary']}
          contentStyle={{ 
            backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF', 
            borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
            borderRadius: '8px'
          }} 
        />
        <Line 
          type="monotone" 
          dataKey="annual" 
          stroke="#8b5cf6" 
          strokeWidth={3} 
          dot={{ r: 6, fill: '#8b5cf6' }} 
          activeDot={{ r: 8, fill: '#8b5cf6' }} 
          name={language === 'es' ? 'Salario Anual' : 'Annual Salary'} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};