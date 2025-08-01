export type Language = 'es' | 'en';
export type Currency = 'MXN' | 'USD';
export type Theme = 'light' | 'dark';

export interface SalaryRange {
  min: number;
  max: number;
}

export interface Industry {
  name: string;
  nameSp: string;
  avg?: number;
  min?: number;
  max?: number;
  color: string;
}

export interface City {
  city: string;
  monthly: number;
  premium: number;
}

export interface TechLevel {
  level: string;
  levelSp: string;
  min: number;
  max: number;
  years: string;
}

export interface EducationLevel {
  level: string;
  levelSp: string;
  quarterly: number;
}

export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export interface SalaryData {
  national: {
    average: number;
  };
  byIndustry: Industry[];
  byCity: City[];
  techSalaries: TechLevel[];
  education: EducationLevel[];
  taxStructure: {
    taxBrackets: TaxBracket[];
  };
}

export interface Translation {
  title: string;
  subtitle: string;
  nav: {
    overview: string;
    salaries: string;
    careers: string;
    regions: string;
    industries: string;
    calculator: string;
  };
  stats: {
    avgSalary: string;
    techRange: string;
    regionalVar: string;
    taxBurden: string;
  };
  currency: {
    mxn: string;
    usd: string;
    rate: string;
  };
  calculator: {
    grossSalary: string;
    netSalary: string;
    monthlySalary: string;
    placeholder: string;
  };
  charts: {
    industriesTitle: string;
    regionsTitle: string;
    careersTitle: string;
    educationTitle: string;
    calculatorTitle: string;
  };
}

export interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  exchangeRate: number;
  t: Translation;
}

export interface ChartDataPoint {
  [key: string]: string | number;
}