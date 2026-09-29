import { useState, useEffect } from 'react';
import { Currency } from '../types';

export const FALLBACK_CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
];

const CURRENCY_API_URL = 'https://restcountries.com/v3.1/all?fields=currencies';

export function useCurrencies() {
  const [data, setData] = useState<Currency[]>(FALLBACK_CURRENCIES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCurrencies = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(CURRENCY_API_URL);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        const currencyMap = new Map<string, Currency>();

        if (Array.isArray(result)) {
          result.forEach((country: any) => {
            if (country.currencies) {
              Object.keys(country.currencies).forEach(code => {
                if (!currencyMap.has(code)) {
                  currencyMap.set(code, {
                    code,
                    name: country.currencies[code].name || code,
                    symbol: country.currencies[code].symbol || code,
                  });
                }
              });
            }
          });
        }

        const newCurrencies = Array.from(currencyMap.values()).sort((a, b) =>
          a.code.localeCompare(b.code),
        );

        if (newCurrencies.length > 0 && isMounted) {
          setData(newCurrencies);
        } else if (isMounted) {
          setData(FALLBACK_CURRENCIES);
        }
      } catch (err) {
        if (isMounted) {
          setData(FALLBACK_CURRENCIES);
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCurrencies();

    return () => {
      isMounted = false;
    };
  }, []);

  return { currencies: data, loading, error };
} 