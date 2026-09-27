import {
  QuoteState,
  QuoteTotals,
} from '../types';

import { getNights } from './dateUtils';

export function calculateQuote(
  quote: QuoteState,
  exchangeRate = 1,
): QuoteTotals {
  const nights = Math.max(
    getNights(
      quote.checkIn,
      quote.checkOut,
    ),
    1,
  );

  const guests =
    quote.guests.adults +
    quote.guests.children;

  let subtotal = 0;

  quote.rooms.forEach(room => {
    if (room.pricingType === 'perRoom') {
      subtotal +=
        room.rate *
        room.quantity *
        nights;
    } else {
      subtotal +=
        room.rate *
        guests *
        room.quantity *
        nights;
    }
  });

  subtotal *= exchangeRate;

  const discount =
    subtotal * (quote.discount / 100);

  const afterDiscount =
    subtotal - discount;

  const tax =
    afterDiscount * (quote.tax / 100);

  const total =
    afterDiscount + tax;

  return {
    subtotal,
    discount,
    tax,
    total,
  };
}