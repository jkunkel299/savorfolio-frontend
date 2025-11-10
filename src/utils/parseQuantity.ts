export function parseQuantity(quantity: string): number {
  if (!quantity) return NaN;

  // If it's a simple number, parse it normally
  if (!quantity.includes('/')) return parseFloat(quantity);

  // Handle fractions like "1/2", "3/4", or "2 1/2"
  const parts = quantity.split(' ');
  if (parts.length === 2) {
    const whole = parseFloat(parts[0]);
    const [num, denom] = parts[1].split('/').map(Number);
    return whole + num / denom;
  }

  const [num, denom] = quantity.split('/').map(Number);
  return num / denom;
};