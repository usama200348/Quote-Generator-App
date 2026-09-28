export type PricingType = 'perRoom' | 'perGuest';

export type GuestCounts = {
  adults: number;
  children: number;
  infants: number;
};

export type Room = {
  id: string;
  name: string;
  rate: number;
  quantity: number;
  pricingType: PricingType;
};

export type Currency = {
  code: string;
  name: string;
  symbol: string;
};

export type QuoteState = {
  destination: string;
  checkIn: string;
  checkOut: string;

  guests: GuestCounts;

  rooms: Room[];

  currency: Currency;
  discount: number;
  tax: number;
  notes: string;
};

export type QuoteTotals = {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
};

export type SavedQuote = {
  id: string;
  createdAt: string;
  quote: QuoteState;
  totals: QuoteTotals;
};