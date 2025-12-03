export interface TaxCalculationResult {
  baseAmount: number;
  taxAmount: number;
  totalAmount: number;
  taxRate: number;
  mode: 'forward' | 'reverse';
  formula: string;
}

export const calculateForwardTax = (
  baseAmount: number,
  taxRate: number
): TaxCalculationResult => {
  const taxAmount = baseAmount * (taxRate / 100);
  const totalAmount = baseAmount + taxAmount;

  return {
    baseAmount,
    taxAmount,
    totalAmount,
    taxRate,
    mode: 'forward',
    formula: `Tax = ${baseAmount} × (${taxRate}/100) = ${taxAmount.toFixed(2)}`,
  };
};

export const calculateReverseTax = (
  totalAmount: number,
  taxRate: number
): TaxCalculationResult => {
  const baseAmount = totalAmount / (1 + taxRate / 100);
  const taxAmount = totalAmount - baseAmount;

  return {
    baseAmount,
    taxAmount,
    totalAmount,
    taxRate,
    mode: 'reverse',
    formula: `Base = ${totalAmount} / (1 + ${taxRate}/100) = ${baseAmount.toFixed(2)}`,
  };
};

export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const validateInput = (value: string): boolean => {
  if (value.trim() === '') return false;
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0;
};

const ones = [
  '',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
];
const teens = [
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen',
];
const tens = [
  '',
  '',
  'Twenty',
  'Thirty',
  'Forty',
  'Fifty',
  'Sixty',
  'Seventy',
  'Eighty',
  'Ninety',
];

const convertTwoDigits = (num: number): string => {
  if (num === 0) return '';
  if (num < 10) return ones[num];
  if (num < 20) return teens[num - 10];
  return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + ones[num % 10] : '');
};

export const numberToWords = (num: number): string => {
  if (num === 0) return 'Zero';

  const parts: string[] = [];

  const crores = Math.floor(num / 10000000);
  if (crores > 0) {
    parts.push(convertTwoDigits(crores) + ' Crore');
    num %= 10000000;
  }

  const lakhs = Math.floor(num / 100000);
  if (lakhs > 0) {
    parts.push(convertTwoDigits(lakhs) + ' Lakh');
    num %= 100000;
  }

  const thousands = Math.floor(num / 1000);
  if (thousands > 0) {
    parts.push(convertTwoDigits(thousands) + ' Thousand');
    num %= 1000;
  }

  const hundreds = Math.floor(num / 100);
  if (hundreds > 0) {
    parts.push(convertTwoDigits(hundreds) + ' Hundred');
    num %= 100;
  }

  if (num > 0) {
    parts.push(convertTwoDigits(num));
  }

  return parts.join(' ').trim();
};
