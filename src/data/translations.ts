import { Translation, Language } from '../types';

export const translations: Record<Language, Translation> = {
  es: {
    title: "Análisis de Salarios México 2025",
    subtitle: "Guía completa del mercado laboral mexicano",
    nav: {
      overview: "Resumen",
      salaries: "Salarios",
      careers: "Carreras",
      regions: "Regiones",
      industries: "Industrias",
      calculator: "Calculadora"
    },
    stats: {
      avgSalary: "Salario Promedio Anual",
      techRange: "Rango Tecnología",
      regionalVar: "Variación Regional",
      taxBurden: "Carga Fiscal Total"
    },
    currency: {
      mxn: "MXN",
      usd: "USD",
      rate: "Tipo de cambio"
    },
    calculator: {
      grossSalary: "Salario Anual Bruto",
      netSalary: "Salario Neto (aprox)",
      monthlySalary: "Salario Mensual Neto",
      placeholder: "Ej: 500000"
    },
    charts: {
      industriesTitle: "💰 Salarios por Industria",
      regionsTitle: "🗺️ Análisis Regional",
      careersTitle: "🚀 Progresión en Tecnología",
      educationTitle: "🎓 Impacto de la Educación",
      calculatorTitle: "🧮 Calculadora de Salario Neto"
    }
  },
  en: {
    title: "Mexico Salary Analysis 2025",
    subtitle: "Complete Mexican job market guide",
    nav: {
      overview: "Overview",
      salaries: "Salaries",
      careers: "Careers",
      regions: "Regions",
      industries: "Industries",
      calculator: "Calculator"
    },
    stats: {
      avgSalary: "Average Annual Salary",
      techRange: "Tech Range",
      regionalVar: "Regional Variation",
      taxBurden: "Total Tax Burden"
    },
    currency: {
      mxn: "MXN",
      usd: "USD",
      rate: "Exchange rate"
    },
    calculator: {
      grossSalary: "Gross Annual Salary",
      netSalary: "Net Salary (approx)",
      monthlySalary: "Monthly Net Salary",
      placeholder: "Ex: 500000"
    },
    charts: {
      industriesTitle: "💰 Salaries by Industry",
      regionsTitle: "🗺️ Regional Analysis",
      careersTitle: "🚀 Tech Career Progression",
      educationTitle: "🎓 Education Impact",
      calculatorTitle: "🧮 Net Salary Calculator"
    }
  }
};