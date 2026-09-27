export const DEFAULT_ROOM_RATE = 100;

export const ROOM_TYPES = [
  'Standard Room',
  'Deluxe Room',
  'Suite',
  'Family Room',
  'Executive Room',
];

export const getDefaultRate = (
  roomName: string,
) => {
  switch (roomName) {
    case 'Standard Room':
      return 100;

    case 'Deluxe Room':
      return 150;

    case 'Suite':
      return 250;

    case 'Family Room':
      return 180;

    case 'Executive Room':
      return 220;

    default:
      return DEFAULT_ROOM_RATE;
  }
};