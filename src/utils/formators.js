export const formatPhoneNumber = (phoneNumber = '') => {
  const number10Digits = phoneNumber.slice(-10);
  const countryCode = phoneNumber.slice(0, -10);
  const group1 = number10Digits.slice(0, 3);
  const group2 = number10Digits.slice(3, 6);
  const group3 = number10Digits.slice(6);
  return `${countryCode} ${group1} ${group2} ${group3}`;
};

const BOLD_CHARS = {
  a: '𝐚',
  b: '𝐛',
  c: '𝐜',
  d: '𝐝',
  e: '𝐞',
  f: '𝐟',
  g: '𝐠',
  h: '𝐡',
  i: '𝐢',
  j: '𝐣',
  k: '𝐤',
  l: '𝐥',
  m: '𝐦',
  n: '𝐧',
  o: '𝐨',
  p: '𝐩',
  q: '𝐪',
  r: '𝐫',
  s: '𝐬',
  t: '𝐭',
  u: '𝐮',
  v: '𝐯',
  w: '𝐰',
  x: '𝐱',
  y: '𝐲',
  z: '𝐳',
  0: '𝟎',
  1: '𝟏',
  2: '𝟐',
  3: '𝟑',
  4: '𝟒',
  5: '𝟓',
  6: '𝟔',
  7: '𝟕',
  8: '𝟖',
  9: '𝟗',
};

export const boldCode = (code = '') => [...code].map((c) => BOLD_CHARS[c]).join('');

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'INR',
  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
