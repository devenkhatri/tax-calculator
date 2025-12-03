import { TaxCalculationResult } from './taxCalculator';

export interface HistoryItem extends TaxCalculationResult {
    id: string;
    timestamp: number;
    currencySymbol: string;
    mode: 'forward' | 'reverse';
}

const HISTORY_KEY = 'tax_calculator_history';
const MAX_HISTORY_ITEMS = 50;

export const saveHistory = (
    result: TaxCalculationResult,
    currencySymbol: string,
    mode: 'forward' | 'reverse'
): HistoryItem[] => {
    const history = getHistory();

    const newItem: HistoryItem = {
        ...result,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        currencySymbol,
        mode,
    };

    const newHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));

    return newHistory;
};

export const getHistory = (): HistoryItem[] => {
    try {
        const stored = localStorage.getItem(HISTORY_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Failed to parse history:', error);
        return [];
    }
};

export const clearHistory = (): void => {
    localStorage.removeItem(HISTORY_KEY);
};
