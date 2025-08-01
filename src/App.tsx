import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { SalaryCalculator } from './components/sections/SalaryCalculator';
import { ChartContainer } from './components/charts/ChartContainer';
import { IndustryChart } from './components/charts/IndustryChart';
import { RegionalChart } from './components/charts/RegionalChart';
import { TechCareerChart } from './components/charts/TechCareerChart';
import { EducationChart } from './components/charts/EducationChart';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { useApp } from './context/AppContext';

const AppContent: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Navigation />
      
      <main>
        <ErrorBoundary>
          <HeroSection />
        </ErrorBoundary>

        <ErrorBoundary>
          <ChartContainer title={t.charts.industriesTitle}>
            <IndustryChart />
          </ChartContainer>
        </ErrorBoundary>

        <ErrorBoundary>
          <ChartContainer title={t.charts.regionsTitle}>
            <RegionalChart />
          </ChartContainer>
        </ErrorBoundary>

        <ErrorBoundary>
          <ChartContainer title={t.charts.careersTitle}>
            <TechCareerChart />
          </ChartContainer>
        </ErrorBoundary>

        <ErrorBoundary>
          <ChartContainer title={t.charts.educationTitle}>
            <EducationChart />
          </ChartContainer>
        </ErrorBoundary>

        <ErrorBoundary>
          <SalaryCalculator />
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;