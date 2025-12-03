import { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';
import { NumericInput } from './components/NumericInput';
import { SelectTaxRate } from './components/SelectTaxRate';
import { ToggleMode } from './components/ToggleMode';
import { ResultCard } from './components/ResultCard';
import { CurrencySelector } from './components/CurrencySelector';
import { ThemeToggle } from './components/ThemeToggle';
import { currencies } from './config/currencies';
import {
  calculateForwardTax,
  calculateReverseTax,
  validateInput,
  TaxCalculationResult,
} from './utils/taxCalculator';
import {
  getHistory,
  saveHistory,
  clearHistory,
  HistoryItem,
} from './utils/history';
import { HistoryList } from './components/HistoryList';

function App() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState(currencies[0]);
  const [taxRate, setTaxRate] = useState(18);
  const [mode, setMode] = useState<'forward' | 'reverse'>('forward');
  const [useCustomRate, setUseCustomRate] = useState(false);
  const [customRate, setCustomRate] = useState('');
  const [result, setResult] = useState<TaxCalculationResult | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useState(() => {
    setHistory(getHistory());
  });

  const handleCalculate = () => {
    if (!validateInput(amount)) {
      setError('Please enter a valid amount');
      return;
    }

    setError('');
    const numAmount = parseFloat(amount);

    let calcResult: TaxCalculationResult;

    if (mode === 'forward') {
      calcResult = calculateForwardTax(numAmount, taxRate);
    } else {
      calcResult = calculateReverseTax(numAmount, taxRate);
    }

    setResult(calcResult);
    const newHistory = saveHistory(calcResult, currency.symbol, mode);
    setHistory(newHistory);
  };

  const handleReset = () => {
    setAmount('');
    setTaxRate(18);
    setUseCustomRate(false);
    setCustomRate('');
    setMode('forward');
    setResult(null);
    setError('');
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
              <Calculator className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                GST Calculator
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Calculate sales tax with precision
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Input Details
              </h2>

              <div className="space-y-6">
                <ToggleMode mode={mode} onChange={setMode} />

                <NumericInput
                  label={mode === 'forward' ? 'Base Amount' : 'Total Amount (Tax Included)'}
                  value={amount}
                  onChange={setAmount}
                  prefix={currency.symbol}
                  error={error}
                />

                <CurrencySelector value={currency} onChange={setCurrency} />

                <SelectTaxRate
                  value={taxRate}
                  onChange={setTaxRate}
                  useCustom={useCustomRate}
                  onToggleCustom={setUseCustomRate}
                  customValue={customRate}
                  onCustomChange={setCustomRate}
                />

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleCalculate}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30"
                  >
                    <Calculator size={18} />
                    Calculate
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                    aria-label="Reset"
                  >
                    <RotateCcw size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                How It Works
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Forward Tax Calculation
                  </h4>
                  <p className="mb-2">
                    Add tax to a base amount to get the total price.
                  </p>
                  <code className="block bg-gray-100 dark:bg-gray-900 p-3 rounded text-xs">
                    Tax = Base × (Rate / 100)
                    <br />
                    Total = Base + Tax
                  </code>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Reverse Tax Extraction
                  </h4>
                  <p className="mb-2">
                    Extract the base price and tax from a tax-inclusive amount.
                  </p>
                  <code className="block bg-gray-100 dark:bg-gray-900 p-3 rounded text-xs">
                    Base = Total / (1 + Rate/100)
                    <br />
                    Tax = Total - Base
                  </code>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <ResultCard result={result} currencySymbol={currency.symbol} />
            <HistoryList history={history} onClear={handleClearHistory} />
          </div>
        </div>


      </div>
    </div>
  );
}

export default App;
