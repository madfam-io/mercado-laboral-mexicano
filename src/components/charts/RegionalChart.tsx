import React from 'react';
import { 
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { useChartData } from '../../hooks/useChartData';
import { formatCurrency } from '../../utils/currency';

export const RegionalChart: React.FC = () => {
  const { theme, currency, language, exchangeRate, t } = useApp();
  const { cityChartData } = useChartData();

  const formatValue = (value: number) => 
    formatCurrency(value, currency, language, exchangeRate);

  const customTooltipFormatter = (value: number, name: string) => {
    if (name === 'premium') {
      return [`${value}%`, language === 'es' ? 'Prima vs Nacional' : 'Premium vs National'];
    }
    return [formatValue(value), language === 'es' ? 'Salario Anual' : 'Annual Salary'];
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart 
        data={cityChartData} 
        margin={{ top: 20, right: 30, bottom: 60, left: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis 
          dataKey="city" 
          angle={-45} 
          textAnchor="end" 
          interval={0} 
          tick={{ 
            fill: theme === 'dark' ? '#9CA3AF' : '#4B5563', 
            fontSize: 12 
          }} 
        />
        <YAxis 
          yAxisId="left" 
          tickFormatter={formatValue}
          tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#4B5563' }} 
        />
        <YAxis 
          yAxisId="right" 
          orientation="right" 
          tickFormatter={(value: number) => `${value}%`}
          tick={{ fill: '#ec4899' }} 
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
        <Bar 
          yAxisId="left" 
          dataKey="salary" 
          fill="#8b5cf6" 
          name={language === 'es' ? 'Salario Anual' : 'Annual Salary'} 
          radius={[8, 8, 0, 0]} 
        />
        <Line 
          yAxisId="right" 
          type="monotone" 
          dataKey="premium" 
          stroke="#ec4899" 
          strokeWidth={3} 
          name={language === 'es' ? 'Prima vs Nacional' : 'Premium vs National'} 
        />
        <ReferenceLine 
          yAxisId="right" 
          y={0} 
          stroke={theme === 'dark' ? '#666' : '#ccc'} 
          strokeDasharray="3 3" 
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};