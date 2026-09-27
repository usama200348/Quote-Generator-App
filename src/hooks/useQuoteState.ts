import { useMemo, useState } from 'react';

import { QuoteState, Room } from '../types';
import { getCurrency } from '../lib/currencies';


export function useQuoteState() {

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
    },
  ],
  currency: getCurrency('USD'),
  discount: 0,
  tax: 0,
  notes: '',
};

  const [quote, setQuote] =
    useState<QuoteState>(initialQuote);

  const updateQuote = (
    updates: Partial<QuoteState>,
  ) => {
    setQuote(current => ({
      ...current,
      ...updates,
    }));
  };

  const updateGuests = (
    updates: Partial<QuoteState['guests']>,
  ) => {
    setQuote(current => ({
      ...current,
      guests: {
        ...current.guests,
        ...updates,
      },
    }));
  };

  const addRoom = () => {
    const newRoom: Room = {
      id: Date.now().toString(),
      name: 'Standard Room',
      rate: 100,
      quantity: 1,
      pricingType: 'perRoom',
    };

    setQuote(current => ({
      ...current,
      rooms: [
        ...current.rooms,
        newRoom,
      ],
    }));
  };

  const updateRoom = (
    id: string,
    updates: Partial<Room>,
  ) => {
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
  };

  const removeRoom = (id: string) => {
    setQuote(current => ({
      ...current,
      rooms: current.rooms.filter(
        room => room.id !== id,
      ),
    }));
  };

  const resetQuote = () => {
    setQuote({
      ...initialQuote,
      rooms: [
        {
          ...initialQuote.rooms[0],
          id: Date.now().toString(),
        },
      ],
    });
  };

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
    [quote],
  );
}