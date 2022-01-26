export const validatePasswordMinimumLength = (password: string) => password.length >= 8;
export const validatePasswordUppercase = (password: string) => /.*[A-Z].*/.test(password);
export const validatePasswordNumericality = (password: string) => /.*[1-9].*/.test(password);
