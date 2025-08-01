import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { salaryData } from '../data/salaryData';
import { ChartDataPoint, Industry, City, TechLevel, EducationLevel } from '../types';

export const useChartData = () => {
  const { language } = useApp();

  const industryChartData = useMemo((): ChartDataPoint[] => {
    return salaryData.byIndustry.map((ind: Industry) => ({
      name: language === 'es' ? ind.nameSp : ind.name,
      salary: ind.avg || ((ind.min || 0) + (ind.max || 0)) / 2,
      color: ind.color
    }));
  }, [language]);

  const cityChartData = useMemo((): ChartDataPoint[] => {
    return salaryData.byCity.map((city: City) => ({
      ...city,
      salary: city.monthly * 12
    }));
  }, []);

  const techLevelData = useMemo((): ChartDataPoint[] => {
    return salaryData.techSalaries.map((level: TechLevel) => ({
      level: language === 'es' ? level.levelSp : level.level,
      min: level.min,
      max: level.max,
      years: level.years
    }));
  }, [language]);

  const educationData = useMemo((): ChartDataPoint[] => {
    return salaryData.education.map((edu: EducationLevel) => ({
      level: language === 'es' ? edu.levelSp : edu.level,
      annual: edu.quarterly * 4
    }));
  }, [language]);

  return {
    industryChartData,
    cityChartData,
    techLevelData,
    educationData
  };
};