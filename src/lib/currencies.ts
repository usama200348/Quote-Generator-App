import { Currency } from '../types';

export const currencies: Currency[] = [
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
  },
  {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
  },
  {
    code: 'PKR',
    name: 'Pakistani Rupee',
    symbol: '₨',
  },
  {
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'د.إ',
  },
  {
    code: 'SAR',
    name: 'Saudi Riyal',
    symbol: '﷼',
  },
  {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'CA$',
  },
  {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'A$',
  },
];

export const getCurrency = (
  code: string,
): Currency => {
  return (
    currencies.find(item => item.code === code) ||
    currencies[0]
  );
};