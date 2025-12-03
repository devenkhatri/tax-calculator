export interface Currency {
  symbol: string;
  code: string;
  name: string;
}

export const currencies: Currency[] = [
  { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
  { symbol: '$', code: 'USD', name: 'US Dollar' },
  { symbol: '£', code: 'GBP', name: 'British Pound' },
  { symbol: '€', code: 'EUR', name: 'Euro' },
];

export const taxRates = [5, 10, 12, 18, 28];
