import React, { ReactNode } from 'react';
import { ErrorBoundary } from '../ui/ErrorBoundary';

interface ChartContainerProps {
  title: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

const ChartFallback = () => (
  <div className="flex flex-col items-center justify-center h-96 text-center">
    <div className="text-4xl mb-4">📊</div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      Chart loading error
    </h3>
    <p className="text-gray-600 dark:text-gray-400">
      Unable to display chart data at this time.
    </p>
  </div>
);

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  children,
  className = '',
  id
}) => {
  return (
    <section id={id} className={`py-16 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          {title}
        </h2>
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
          <ErrorBoundary fallback={<ChartFallback />}>
            {children}
          </ErrorBoundary>
        </div>
      </div>
    </section>
  );
};