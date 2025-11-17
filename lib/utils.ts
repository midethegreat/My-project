export function cn(...inputs: any[]): string {
  return inputs
    .flat()
    .filter((item) => typeof item === 'string' && item.trim())
    .join(' ')
    .split(' ')
    .filter((cls, idx, arr) => arr.indexOf(cls) === idx)
    .join(' ')
}
