import { SalaryData } from '../types';

export const salaryData: SalaryData = {
  national: {
    average: 220908,
  },
  byIndustry: [
    { name: 'Real Estate', nameSp: 'Bienes Raíces', avg: 1639712, color: '#8b5cf6' },
    { name: 'Insurance', nameSp: 'Seguros', avg: 1519194, color: '#ec4899' },
    { name: 'Technology', nameSp: 'Tecnología', min: 500000, max: 1500000, color: '#3b82f6' },
    { name: 'Finance', nameSp: 'Finanzas', min: 400000, max: 2500000, color: '#10b981' },
    { name: 'Manufacturing', nameSp: 'Manufactura', min: 300000, max: 800000, color: '#f59e0b' }
  ],
  byCity: [
    { city: 'Ciudad de México', monthly: 19723, premium: 39 },
    { city: 'Monterrey', monthly: 19216, premium: 36 },
    { city: 'Tijuana', monthly: 18868, premium: 33 },
    { city: 'Guadalajara', monthly: 17500, premium: 24 },
    { city: 'Guerrero', monthly: 10250, premium: -27 },
    { city: 'Tlaxcala', monthly: 10844, premium: -23 }
  ],
  techSalaries: [
    { level: 'Junior', levelSp: 'Junior', min: 233280, max: 403200, years: '0-2' },
    { level: 'Mid-Level', levelSp: 'Medio', min: 493926, max: 680000, years: '3-5' },
    { level: 'Senior', levelSp: 'Senior', min: 1108186, max: 1400000, years: '6+' }
  ],
  education: [
    { level: 'Elementary', levelSp: 'Primaria', quarterly: 13514 },
    { level: 'High School', levelSp: 'Preparatoria', quarterly: 34809 },
    { level: 'Bachelor', levelSp: 'Licenciatura', quarterly: 72000 },
    { level: 'Master', levelSp: 'Maestría', quarterly: 95634 },
    { level: 'Doctorate', levelSp: 'Doctorado', quarterly: 125000 }
  ],
  taxStructure: {
    taxBrackets: [
      { min: 0, max: 7735, rate: 1.92 },
      { min: 7735, max: 65651, rate: 6.40 },
      { min: 65651, max: 115375, rate: 10.88 },
      { min: 115375, max: 134119, rate: 16.00 },
      { min: 134119, max: 160577, rate: 17.92 },
      { min: 160577, max: 323862, rate: 21.36 },
      { min: 323862, max: 510451, rate: 23.52 },
      { min: 510451, max: 974535, rate: 30.00 },
      { min: 974535, max: 1299380, rate: 32.00 },
      { min: 1299380, max: 3898140, rate: 34.00 },
      { min: 3898140, max: Infinity, rate: 35.00 }
    ]
  }
};