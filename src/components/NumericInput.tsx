import { useState } from 'react';

interface NumericInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  prefix?: string;
  error?: string;
}

export const NumericInput = ({
  label,
  value,
  onChange,
  placeholder = '0.00',
  prefix,
  error,
}: NumericInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div
        className={`flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 rounded-lg transition-all ${
          error
            ? 'border-red-500'
            : isFocused
            ? 'border-blue-500'
            : 'border-gray-200 dark:border-gray-700'
        }`}
      >
        {prefix && (
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {prefix}
          </span>
        )}
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-lg font-medium outline-none text-gray-900 dark:text-white"
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
