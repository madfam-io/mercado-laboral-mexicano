import React, { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  color = 'text-gray-500'
}) => {
  return (
    <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/50 dark:bg-white/10 shadow-lg hover:shadow-xl transition-shadow">
      <div className={`w-8 h-8 mb-2 ${color}`}>
        {icon}
      </div>
      <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">
        {title}
      </h3>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
};