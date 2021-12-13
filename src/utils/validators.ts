export const validatePasswordMinimumLength = (password: string) => password.length >= 8;
export const validatePasswordUppercase = (password: string) => /.*[A-Z].*/.test(password);
export const validatePasswordNumericality = (password: string) => /.*[1-9].*/.test(password);

export const getPasswordValidators = () =>
  Object.freeze([
    {
      id: 'user.registration.password.length',
      validator: validatePasswordMinimumLength,
    },
    {
      id: 'user.registration.password.oneUpper',
      validator: validatePasswordUppercase,
    },
    {
      id: 'user.registration.password.oneNumber',
      validator: validatePasswordNumericality,
    },
  ]);
