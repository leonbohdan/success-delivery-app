export const requiredValidationRules = [
  (v) => {
    if (typeof v === 'number') {
      return true;
    }

    return Boolean(v?.length) || 'Field is required';
  },
];

export const maxLengthValidationRules = (max = 100) => [
  (v) => (!v) ? true : (
    (v.length === 0 || v.length <= max) || `Max length ${max} characters`
  ),
];

export const minLengthValidationRules = (min = 3) => [
  (v) => (!v) ? true : (
    (v && v.length >= min) || `Minimum ${min} characters`
  ),
];
