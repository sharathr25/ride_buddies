export const validateMobileNumber = (mobileNumber) => {
  if (mobileNumber === '') return 'Mobile number is required';
  if (!/^\d{10}$/.test(mobileNumber)) return 'Invalid mobile number';
};

export const validateDisplayName = (displayName) => {
  if (displayName === '') return 'Display name is required';
};
