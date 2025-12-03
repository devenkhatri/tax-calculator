import { currencies, Currency } from '../config/currencies';

interface CurrencySelectorProps {
  value: Currency;
  onChange: (currency: Currency) => void;
}

export const CurrencySelector = ({ value, onChange }: CurrencySelectorProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Currency
      </label>
      <select
        value={value.code}
        onChange={(e) => {
          const currency = currencies.find((c) => c.code === e.target.value);
          if (currency) onChange(currency);
        }}
        className="px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-lg font-medium outline-none focus:border-blue-500 transition-all cursor-pointer text-gray-900 dark:text-white"
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.symbol} - {currency.name}
          </option>
        ))}
      </select>
    </div>
  );
};
