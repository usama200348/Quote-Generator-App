export function formatDate(
  date: string,
): string {
  if (!date) return '';

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return date;
  }

  return d.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function getNights(
  checkIn: string,
  checkOut: string,
): number {
  if (!checkIn || !checkOut) {
    return 0;
  }

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  const difference =
    end.getTime() - start.getTime();

  const nights = Math.ceil(
    difference / (1000 * 60 * 60 * 24),
  );

  return Math.max(0, nights);
}