import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell, ComposedChart, ReferenceLine
} from 'recharts';
import { 
  Moon, Sun, Globe, TrendingUp, MapPin, 
  DollarSign, Award, ChevronDown, Menu, X, 
  Calculator, Cpu, Info
} from 'lucide-react';

// Bilingual content
const content = {
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
    }
  }
};

// Real data from the research
const salaryData = {
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

const App = () => {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('es');
  const [currency, setCurrency] = useState('MXN');
  const [exchangeRate] = useState(18.85);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [salaryInput, setSalaryInput] = useState('');

  const t = content[lang];

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const convertCurrency = (amount) => {
    if (currency === 'USD') {
      return amount / exchangeRate;
    }
    return amount;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(lang === 'es' ? 'es-MX' : 'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(convertCurrency(amount));
  };

  const industryChartData = salaryData.byIndustry.map(ind => ({
    name: lang === 'es' ? ind.nameSp : ind.name,
    salary: ind.avg || ((ind.min + ind.max) / 2),
    color: ind.color
  }));

  const cityChartData = salaryData.byCity.map(city => ({
    ...city,
    salary: city.monthly * 12
  }));

  const techLevelData = salaryData.techSalaries.map(level => ({
    level: lang === 'es' ? level.levelSp : level.level,
    min: level.min,
    max: level.max,
  }));

  const educationData = salaryData.education.map(edu => ({
    level: lang === 'es' ? edu.levelSp : edu.level,
    annual: edu.quarterly * 4
  }));

  const calculateTakeHome = (grossSalary) => {
    const taxBracket = salaryData.taxStructure.taxBrackets.find(
      bracket => grossSalary >= bracket.min && grossSalary < bracket.max
    );
    const taxRate = taxBracket ? taxBracket.rate : 35;
    const socialSecurity = grossSalary * 0.0625;
    const totalDeductions = (grossSalary * taxRate / 100) + socialSecurity;
    return grossSalary - totalDeductions;
  };

  return (
    <div className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                <span className="hidden sm:inline">💼 {t.title}</span>
                <span className="sm:hidden">💼 Salarios MX</span>
              </h1>
              <div className="hidden md:flex space-x-6">
                {Object.entries(t.nav).map(([key, value]) => (
                  <a key={key} href={`#${key}`} className="text-gray-700 dark:text-gray-300 hover:text-purple-500 transition-colors">
                    {value}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Currency Toggle */}
              <button
                onClick={() => setCurrency(currency === 'MXN' ? 'USD' : 'MXN')}
                className="px-2 sm:px-3 py-1 rounded-lg transition-all text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 dark:bg-purple-500/20 dark:hover:bg-purple-500/30 dark:text-purple-300"
              >
                <DollarSign className="w-4 h-4 inline mr-1" />
                {currency}
              </button>

              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                className="px-2 sm:px-3 py-1 rounded-lg transition-all text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-500/20 dark:hover:bg-blue-500/30 dark:text-blue-300"
              >
                <Globe className="w-4 h-4 inline mr-1" />
                {lang.toUpperCase()}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-1.5 sm:p-2 rounded-lg transition-all bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                {theme === 'dark' ? <Sun className="w-4 sm:w-5 h-4 sm:h-5" /> : <Moon className="w-4 sm:w-5 h-4 sm:h-5" />}
              </button>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button onClick={() => setMobileMenu(!mobileMenu)} className="p-2">
                  {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
          {/* Mobile Menu Dropdown */}
          {mobileMenu && (
            <div className="md:hidden py-2">
              {Object.entries(t.nav).map(([key, value]) => (
                <a
                  key={key}
                  href={`#${key}`}
                  onClick={() => setMobileMenu(false)}
                  className="block px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                >
                  {value}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="overview" className="relative overflow-hidden py-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-blue-600/10 dark:from-purple-600/20 dark:via-pink-600/20 dark:to-blue-600/20" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                    {t.subtitle}
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-300">
                    {lang === 'es' ? 'Datos actualizados para 2025' : 'Updated data for 2025'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    {/* Key Stats Cards */}
                    <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/50 dark:bg-white/10 shadow-lg">
                        <DollarSign className="w-8 h-8 text-green-500 mb-2" />
                        <h3 className="text-sm text-gray-600 dark:text-gray-400">{t.stats.avgSalary}</h3>
                        <p className="text-2xl font-bold">{formatCurrency(salaryData.national.average)}</p>
                    </div>
                    <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/50 dark:bg-white/10 shadow-lg">
                        <Cpu className="w-8 h-8 text-blue-500 mb-2" />
                        <h3 className="text-sm text-gray-600 dark:text-gray-400">{t.stats.techRange}</h3>
                        <p className="text-2xl font-bold">{formatCurrency(500000)} - {formatCurrency(1500000)}+</p>
                    </div>
                    <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/50 dark:bg-white/10 shadow-lg">
                        <MapPin className="w-8 h-8 text-purple-500 mb-2" />
                        <h3 className="text-sm text-gray-600 dark:text-gray-400">{t.stats.regionalVar}</h3>
                        <p className="text-2xl font-bold">40-90%</p>
                    </div>
                    <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/50 dark:bg-white/10 shadow-lg">
                        <Calculator className="w-8 h-8 text-red-500 mb-2" />
                        <h3 className="text-sm text-gray-600 dark:text-gray-400">{t.stats.taxBurden}</h3>
                        <p className="text-2xl font-bold">26-43%</p>
                    </div>
                </div>
            </div>
        </section>
        
        {/* Sections for charts */}
        <section id="industries" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">{lang === 'es' ? '💰 Salarios por Industria' : '💰 Salaries by Industry'}</h2>
            <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={industryChartData} margin={{ top: 20, right: 20, bottom: 80, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#4B5563', fontSize: 12 }} />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#4B5563' }} />
                  <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF', borderColor: theme === 'dark' ? '#374151' : '#E5E7EB' }} />
                  <Bar dataKey="salary" radius={[8, 8, 0, 0]}>
                    {industryChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section id="regions" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">{lang === 'es' ? '🗺️ Análisis Regional' : '🗺️ Regional Analysis'}</h2>
            <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
              <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={cityChartData} margin={{ top: 20, right: 30, bottom: 60, left: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="city" angle={-45} textAnchor="end" interval={0} tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#4B5563', fontSize: 12 }} />
                      <YAxis yAxisId="left" tickFormatter={(value) => formatCurrency(value)} tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#4B5563' }} />
                      <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} tick={{ fill: '#ec4899' }} />
                      <Tooltip formatter={(value, name) => name === 'premium' ? `${value}%` : formatCurrency(value)} contentStyle={{ backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF', borderColor: theme === 'dark' ? '#374151' : '#E5E7EB' }} />
                      <Legend />
                      <Bar yAxisId="left" dataKey="salary" fill="#8b5cf6" name={lang === 'es' ? 'Salario Anual' : 'Annual Salary'} radius={[8, 8, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="premium" stroke="#ec4899" strokeWidth={3} name={lang === 'es' ? 'Prima vs Nacional' : 'Premium vs National'} />
                      <ReferenceLine yAxisId="right" y={0} stroke={theme === 'dark' ? '#666' : '#ccc'} strokeDasharray="3 3" />
                  </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section id="careers" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">{lang === 'es' ? '🚀 Progresión en Tecnología' : '🚀 Tech Career Progression'}</h2>
            <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={techLevelData} margin={{ top: 20, right: 20, bottom: 20, left: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="level" tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#4B5563' }} />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#4B5563' }} />
                  <Tooltip formatter={(value, name) => [formatCurrency(value), lang === 'es' ? (name === 'min' ? 'Mínimo' : 'Máximo') : name]} contentStyle={{ backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF', borderColor: theme === 'dark' ? '#374151' : '#E5E7EB' }} />
                  <Legend />
                  <Area type="monotone" dataKey="min" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name={lang === 'es' ? 'Mínimo' : 'Minimum'} />
                  <Area type="monotone" dataKey="max" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name={lang === 'es' ? 'Máximo' : 'Maximum'} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section id="salaries" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">{lang === 'es' ? '🎓 Impacto de la Educación' : '🎓 Education Impact'}</h2>
            <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={educationData} margin={{ top: 20, right: 20, bottom: 60, left: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="level" angle={-25} textAnchor="end" interval={0} tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#4B5563', fontSize: 12 }} />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#4B5563' }} />
                  <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF', borderColor: theme === 'dark' ? '#374151' : '#E5E7EB' }} />
                  <Line type="monotone" dataKey="annual" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} name={lang === 'es' ? 'Salario Anual' : 'Annual Salary'} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section id="calculator" className="py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">{lang === 'es' ? '🧮 Calculadora de Salario Neto' : '🧮 Net Salary Calculator'}</h2>
            <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
              <label className="block text-sm font-medium mb-2">{lang === 'es' ? 'Salario Anual Bruto' : 'Gross Annual Salary'}</label>
              <input
                type="number"
                value={salaryInput}
                onChange={(e) => setSalaryInput(e.target.value)}
                placeholder={lang === 'es' ? 'Ej: 500000' : 'Ex: 500000'}
                className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {salaryInput && (
                <div className="space-y-4 mt-6">
                  <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 flex justify-between items-center">
                    <span>{lang === 'es' ? 'Salario Bruto:' : 'Gross Salary:'}</span>
                    <span className="font-bold">{formatCurrency(Number(salaryInput))}</span>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 flex justify-between items-center">
                    <span>{lang === 'es' ? 'Salario Neto (aprox):' : 'Net Salary (approx):'}</span>
                    <span className="font-bold text-green-500">{formatCurrency(calculateTakeHome(Number(salaryInput)))}</span>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 flex justify-between items-center">
                    <span>{lang === 'es' ? 'Salario Mensual Neto:' : 'Monthly Net Salary:'}</span>
                    <span className="font-bold">{formatCurrency(calculateTakeHome(Number(salaryInput)) / 12)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {lang === 'es' ? '📊 Basado en el análisis del mercado laboral mexicano 2025' : '📊 Based on Mexican job market analysis 2025'}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {t.currency.rate}: 1 USD = {exchangeRate} MXN
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
