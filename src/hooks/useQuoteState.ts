import { useCallback, useMemo, useState } from 'react';

import { QuoteState, Room } from '../types';
import { getCurrency } from '../lib/currencies';

const initialQuote: QuoteState = {
  destination: '',
  checkIn: '',
  checkOut: '',
  guests: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  rooms: [
    {
      id: '1',
      name: 'Standard Room',
      rate: 100,
      quantity: 1,
      pricingType: 'perRoom',
      displayNumber: 1,
    },
  ],
  currency: getCurrency('USD'),
  discount: 0,
  tax: 0,
  notes: '',
};

export function useQuoteState() {
  const [quote, setQuote] = useState<QuoteState>(initialQuote);

  const updateQuote = useCallback((updates: Partial<QuoteState>) => {
    setQuote(current => ({
      ...current,
      ...updates,
    }));
  }, []);

  const updateGuests = useCallback((updates: Partial<QuoteState['guests']>) => {
    setQuote(current => ({
      ...current,
      guests: {
        ...current.guests,
        ...updates,
      },
    }));
  }, []);

  const addRoom = useCallback(() => {
    setQuote(current => {
      const maxDisplayNumber = current.rooms.reduce(
        (max, r) => Math.max(max, r.displayNumber ?? 1),
        0
      );
      
   const newRoom: Room = {
  id: `room_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
  name: 'Standard Room',
  rate: 100,
  quantity: 1,
  pricingType: 'perRoom',
  packageType: 'Bed & Breakfast',
  displayNumber: maxDisplayNumber + 1,
};

      return {
        ...current,
        rooms: [
          newRoom,
          ...current.rooms,
        ],
      };
    });
  }, []);

  const updateRoom = useCallback((id: string, updates: Partial<Room>) => {
    setQuote(current => ({
      ...current,
      rooms: current.rooms.map(room =>
        room.id === id
          ? {
              ...room,
              ...updates,
            }
          : room,
      ),
    }));
  }, []);

  const removeRoom = useCallback((id: string) => {
    setQuote(current => ({
      ...current,
      rooms: current.rooms.filter(room => room.id !== id),
    }));
  }, []);

  const resetQuote = useCallback(() => {
    setQuote({
      ...initialQuote,
      rooms: [
        {
          ...initialQuote.rooms[0],
          id: `room_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          displayNumber: 1,
        },
      ],
    });
  }, []);

  return useMemo(
    () => ({
      quote,
      updateQuote,
      updateGuests,
      addRoom,
      updateRoom,
      removeRoom,
      resetQuote,
    }),
    [quote, updateQuote, updateGuests, addRoom, updateRoom, removeRoom, resetQuote],
  );
}