import { Currency, Language } from '../types';

export const convertCurrency = (amount: number, currency: Currency, exchangeRate: number): number => {
  if (currency === 'USD') {
    return amount / exchangeRate;
  }
  return amount;
};

export const formatCurrency = (
  amount: number, 
  currency: Currency, 
  language: Language, 
  exchangeRate: number
): string => {
  const convertedAmount = convertCurrency(amount, currency, exchangeRate);
  
  return new Intl.NumberFormat(language === 'es' ? 'es-MX' : 'en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(convertedAmount);
};

export const validateSalaryInput = (input: string): { isValid: boolean; value: number; error?: string } => {
  const numValue = parseFloat(input);
  
  if (isNaN(numValue)) {
    return { isValid: false, value: 0, error: 'Invalid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, value: 0, error: 'Salary cannot be negative' };
  }
  
  if (numValue > 10000000) {
    return { isValid: false, value: 0, error: 'Salary too high' };
  }
  
  return { isValid: true, value: numValue };
};