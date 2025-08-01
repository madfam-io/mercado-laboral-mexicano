import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Input } from '../ui/Input';
import { validateSalaryInput } from '../../utils/currency';
import { calculateTaxBreakdown } from '../../utils/taxCalculator';
import { formatCurrency } from '../../utils/currency';
import { salaryData } from '../../data/salaryData';

export const SalaryCalculator: React.FC = () => {
  const { language, currency, exchangeRate, t } = useApp();
  const [salaryInput, setSalaryInput] = useState('');
  const [inputError, setInputError] = useState('');

  const validation = useMemo(() => {
    if (!salaryInput) return { isValid: true, value: 0 };
    return validateSalaryInput(salaryInput);
  }, [salaryInput]);

  const taxBreakdown = useMemo(() => {
    if (!validation.isValid || validation.value === 0) {
      return null;
    }
    return calculateTaxBreakdown(validation.value, salaryData.taxStructure.taxBrackets);
  }, [validation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSalaryInput(value);
    
    if (value && !validateSalaryInput(value).isValid) {
      setInputError(language === 'es' ? 'Ingrese un salario válido' : 'Please enter a valid salary');
    } else {
      setInputError('');
    }
  };

  const formatValue = (value: number) => 
    formatCurrency(value, currency, language, exchangeRate);

  return (
    <section id="calculator" className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          {t.charts.calculatorTitle}
        </h2>
        
        <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
          <Input
            type="number"
            label={t.calculator.grossSalary}
            value={salaryInput}
            onChange={handleInputChange}
            placeholder={t.calculator.placeholder}
            error={inputError}
            min="0"
            max="10000000"
          />
          
          {taxBreakdown && (
            <div className="space-y-4 mt-8">
              <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">
                    {language === 'es' ? 'Salario Bruto:' : 'Gross Salary:'}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {formatValue(validation.value)}
                  </span>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-red-700 dark:text-red-400">
                      {language === 'es' ? 'Impuesto sobre la renta:' : 'Income Tax:'}
                    </span>
                    <span className="text-red-700 dark:text-red-400">
                      -{formatValue(taxBreakdown.incomeTax)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-red-700 dark:text-red-400">
                      {language === 'es' ? 'Seguridad Social (6.25%):' : 'Social Security (6.25%):'}
                    </span>
                    <span className="text-red-700 dark:text-red-400">
                      -{formatValue(taxBreakdown.socialSecurity)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center font-medium pt-2 border-t border-red-200 dark:border-red-800">
                    <span className="text-red-700 dark:text-red-400">
                      {language === 'es' ? 'Total Deducciones:' : 'Total Deductions:'}
                    </span>
                    <span className="text-red-700 dark:text-red-400">
                      -{formatValue(taxBreakdown.totalDeductions)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                <div className="flex justify-between items-center">
                  <span className="text-green-700 dark:text-green-400 font-medium">
                    {t.calculator.netSalary}:
                  </span>
                  <span className="font-bold text-xl text-green-700 dark:text-green-400">
                    {formatValue(taxBreakdown.netSalary)}
                  </span>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="flex justify-between items-center">
                  <span className="text-blue-700 dark:text-blue-400">
                    {t.calculator.monthlySalary}:
                  </span>
                  <span className="font-bold text-blue-700 dark:text-blue-400">
                    {formatValue(taxBreakdown.netSalary / 12)}
                  </span>
                </div>
              </div>
              
              <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                {language === 'es' 
                  ? `Tasa efectiva: ${taxBreakdown.effectiveRate.toFixed(1)}%`
                  : `Effective rate: ${taxBreakdown.effectiveRate.toFixed(1)}%`
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};