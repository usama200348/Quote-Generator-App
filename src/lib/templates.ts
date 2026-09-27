import {
  QuoteState,
  QuoteTotals,
} from '../types';

import { formatDate } from './dateUtils';

export function generateQuoteMessage(
  quote: QuoteState,
  totals: QuoteTotals,
): string {
  const symbol = quote.currency.symbol;

  const rooms = quote.rooms
    .map(
      room =>
        `${room.name} x${room.quantity} - ${symbol}${room.rate.toFixed(
          2,
        )}`,
    )
    .join('\n');

  return `QUOTE

Destination: ${quote.destination || 'N/A'}

Stay:
${formatDate(quote.checkIn)} - ${formatDate(
    quote.checkOut,
  )}

Guests:
Adults: ${quote.guests.adults}
Children: ${quote.guests.children}
Infants: ${quote.guests.infants}

Rooms:
${rooms || 'No rooms added'}

Subtotal: ${symbol}${totals.subtotal.toFixed(2)}
Discount: ${symbol}${totals.discount.toFixed(2)}
Tax: ${symbol}${totals.tax.toFixed(2)}

TOTAL: ${symbol}${totals.total.toFixed(2)}

${quote.notes || ''}`;
}