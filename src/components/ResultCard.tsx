import { TaxCalculationResult, formatCurrency, numberToWords } from '../utils/taxCalculator';
import { Calculator } from 'lucide-react';

interface ResultCardProps {
  result: TaxCalculationResult | null;
  currencySymbol: string;
}

export const ResultCard = ({ result, currencySymbol }: ResultCardProps) => {
  if (!result) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center justify-center gap-4 py-12 text-gray-400 dark:text-gray-600">
          <Calculator size={48} />
          <p className="text-center">Enter values and click Calculate to see results</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-900 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="text-blue-600 dark:text-blue-400" size={20} />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Calculation Result
        </h3>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center py-3 border-b border-blue-200 dark:border-gray-700">
          <div className="flex flex-col">
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              {result.mode === 'forward' ? 'Base Amount' : 'Total Price (Input)'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500 italic">
              {numberToWords(Math.floor(result.mode === 'forward' ? result.baseAmount : result.totalAmount))}
            </span>
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            {currencySymbol} {formatCurrency(result.mode === 'forward' ? result.baseAmount : result.totalAmount, 'INR')}
          </span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-blue-200 dark:border-gray-700">
          <div className="flex flex-col">
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              {result.mode === 'forward' ? 'Tax Amount' : 'Extracted Tax'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500 italic">
              {numberToWords(Math.floor(result.taxAmount))}
            </span>
          </div>
          <span className="text-lg font-semibold text-green-600 dark:text-green-400">
            {currencySymbol} {formatCurrency(result.taxAmount, 'INR')}
          </span>
        </div>

        <div className="flex justify-between items-center py-3 bg-blue-100 dark:bg-gray-700 rounded-lg px-4">
          <div className="flex flex-col">
            <span className="text-gray-800 dark:text-gray-200 font-semibold">
              {result.mode === 'forward' ? 'Total Payable' : 'Base Amount (Before Tax)'}
            </span>
            <span className="text-xs text-gray-700 dark:text-gray-300 italic">
              {numberToWords(Math.floor(result.mode === 'forward' ? result.totalAmount : result.baseAmount))}
            </span>
          </div>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {currencySymbol} {formatCurrency(result.mode === 'forward' ? result.totalAmount : result.baseAmount, 'INR')}
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-gray-700">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
          Calculation Type:{' '}
          <span className="text-blue-600 dark:text-blue-400">
            {result.mode === 'forward' ? 'Forward Tax Addition' : 'Reverse Tax Extraction'}
          </span>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 font-mono">
          {result.formula}
        </p>
      </div>
    </div>
  );
};
