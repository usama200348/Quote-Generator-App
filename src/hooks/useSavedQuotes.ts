import {
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SavedQuote,
} from '../types';

const STORAGE_KEY =
  '@quote_generator_saved_quotes';

export function useSavedQuotes() {
  const [quotes, setQuotes] =
    useState<SavedQuote[]>([]);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      const data =
        await AsyncStorage.getItem(
          STORAGE_KEY,
        );

      if (data) {
        setQuotes(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveQuote = async (
    quote: SavedQuote,
  ) => {
    const updated = [
      quote,
      ...quotes,
    ];

    setQuotes(updated);

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated),
    );
  };

  const deleteQuote = async (
    id: string,
  ) => {
    const updated =
      quotes.filter(
        quote => quote.id !== id,
      );

    setQuotes(updated);

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated),
    );
  };

  return {
    quotes,
    saveQuote,
    deleteQuote,
    reload: loadQuotes,
  };
}