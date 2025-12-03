import { ArrowRight, ArrowLeftRight } from 'lucide-react';

interface ToggleModeProps {
  mode: 'forward' | 'reverse';
  onChange: (mode: 'forward' | 'reverse') => void;
}

export const ToggleMode = ({ mode, onChange }: ToggleModeProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Calculation Mode
      </label>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange('forward')}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
            mode === 'forward'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <ArrowRight size={18} />
          <span>Add Tax</span>
        </button>
        <button
          type="button"
          onClick={() => onChange('reverse')}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
            mode === 'reverse'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <ArrowLeftRight size={18} />
          <span>Extract Tax</span>
        </button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {mode === 'forward'
          ? 'Calculate total price by adding tax to base amount'
          : 'Extract base price and tax from tax-inclusive amount'}
      </p>
    </div>
  );
};
