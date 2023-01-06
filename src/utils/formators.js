export const formatPhoneNumber = (phoneNumber = '') => {
  const number10Digits = phoneNumber.slice(-10);
  const countryCode = phoneNumber.slice(0, -10);
  const group1 = number10Digits.slice(0, 3);
  const group2 = number10Digits.slice(3, 6);
  const group3 = number10Digits.slice(6);
  return `${countryCode} ${group1} ${group2} ${group3}`;
};
