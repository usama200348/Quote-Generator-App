export const GUEST_LIMITS = {
  adults: {
    min: 1,
    max: 20,
  },

  children: {
    min: 0,
    max: 20,
  },

  infants: {
    min: 0,
    max: 10,
  },
};

export function clampGuest(
  value: number,
  type: keyof typeof GUEST_LIMITS,
) {
  const limits = GUEST_LIMITS[type];

  return Math.max(
    limits.min,
    Math.min(limits.max, value),
  );
}