import { TaxBracket } from '../types';

export const calculateTakeHomeSalary = (grossSalary: number, taxBrackets: TaxBracket[]): number => {
  if (grossSalary <= 0) return 0;
  
  const taxBracket = taxBrackets.find(
    bracket => grossSalary >= bracket.min && grossSalary < bracket.max
  );
  
  const taxRate = taxBracket ? taxBracket.rate : 35;
  const socialSecurity = grossSalary * 0.0625; // 6.25% social security
  const totalDeductions = (grossSalary * taxRate / 100) + socialSecurity;
  
  return Math.max(0, grossSalary - totalDeductions);
};

export const calculateTaxBreakdown = (grossSalary: number, taxBrackets: TaxBracket[]) => {
  if (grossSalary <= 0) {
    return {
      incomeTax: 0,
      socialSecurity: 0,
      totalDeductions: 0,
      netSalary: 0,
      effectiveRate: 0
    };
  }
  
  const taxBracket = taxBrackets.find(
    bracket => grossSalary >= bracket.min && grossSalary < bracket.max
  );
  
  const taxRate = taxBracket ? taxBracket.rate : 35;
  const incomeTax = grossSalary * taxRate / 100;
  const socialSecurity = grossSalary * 0.0625;
  const totalDeductions = incomeTax + socialSecurity;
  const netSalary = grossSalary - totalDeductions;
  const effectiveRate = (totalDeductions / grossSalary) * 100;
  
  return {
    incomeTax,
    socialSecurity,
    totalDeductions,
    netSalary,
    effectiveRate
  };
};