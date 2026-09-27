import {
  useEffect,
  useState,
} from 'react';

export function useCurrencyRates(
  baseCurrency = 'USD',
) {
  const [rates, setRates] =
    useState<Record<string, number>>({});

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    let mounted = true;

    const loadRates = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://open.er-api.com/v6/latest/${baseCurrency}`,
        );

        const data =
          await response.json();

        if (mounted && data?.rates) {
          setRates(data.rates);
        }
      } catch (error) {
        console.log(
          'Currency rate error:',
          error,
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadRates();

    return () => {
      mounted = false;
    };
  }, [baseCurrency]);

  return {
    rates,
    loading,
  };
}