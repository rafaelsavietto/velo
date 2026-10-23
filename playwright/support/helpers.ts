const PREFIX = 'VLO';
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function randomChars(length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * CHARS.length);
    result += CHARS[index];
  }
  return result;
}

export function generateOrderCode(): string {
  return `${PREFIX}-${randomChars(6)}`;
}