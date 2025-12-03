import { taxRates } from '../config/currencies';

interface SelectTaxRateProps {
  value: number;
  onChange: (value: number) => void;
  useCustom: boolean;
  onToggleCustom: (useCustom: boolean) => void;
  customValue: string;
  onCustomChange: (value: string) => void;
}

export const SelectTaxRate = ({
  value,
  onChange,
  useCustom,
  onToggleCustom,
  customValue,
  onCustomChange,
}: SelectTaxRateProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Tax Rate (%)
      </label>
      <div className="flex flex-wrap gap-2">
        {taxRates.map((rate) => (
          <button
            key={rate}
            type="button"
            onClick={() => {
              onToggleCustom(false);
              onChange(rate);
            }}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
              !useCustom && value === rate
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {rate}%
          </button>
        ))}
        <button
          type="button"
          onClick={() => onToggleCustom(!useCustom)}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
            useCustom
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Custom
        </button>
      </div>
      {useCustom && (
        <input
          type="text"
          value={customValue}
          onChange={(e) => {
            const val = e.target.value;
            if (val === '' || /^\d*\.?\d*$/.test(val)) {
              onCustomChange(val);
              if (val && !isNaN(parseFloat(val))) {
                onChange(parseFloat(val));
              }
            }
          }}
          placeholder="Enter custom rate"
          className="px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-lg font-medium outline-none focus:border-blue-500 transition-all text-gray-900 dark:text-white"
        />
      )}
    </div>
  );
};
