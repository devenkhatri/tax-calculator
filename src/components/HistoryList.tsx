import { History, Trash2, ArrowRight } from 'lucide-react';
import { HistoryItem } from '../utils/history';

interface HistoryListProps {
    history: HistoryItem[];
    onClear: () => void;
}

export const HistoryList = ({ history, onClear }: HistoryListProps) => {
    if (history.length === 0) {
        return null;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 h-full">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <History className="text-blue-600 dark:text-blue-400" size={20} />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        History
                    </h2>
                </div>
                <button
                    onClick={onClear}
                    className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex items-center gap-1 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                    <Trash2 size={14} />
                    Clear
                </button>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {history.map((item) => (
                    <div
                        key={item.id}
                        className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                                <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    {item.mode === 'forward' ? (
                                        <>
                                            Base <ArrowRight size={12} /> Total
                                        </>
                                    ) : (
                                        <>
                                            Total <ArrowRight size={12} /> Base
                                        </>
                                    )}
                                </span>
                            </div>
                            <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                {item.taxRate}% GST
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Base</p>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                    {item.currencySymbol}{item.baseAmount.toFixed(2)}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                                <p className="font-bold text-gray-900 dark:text-white">
                                    {item.currencySymbol}{item.totalAmount.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Tax Amount</span>
                            <span className="text-sm font-medium text-red-600 dark:text-red-400">
                                +{item.currencySymbol}{item.taxAmount.toFixed(2)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
