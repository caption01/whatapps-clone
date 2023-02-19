import { validatePassword, validateEmail, validateString } from '../validationConstrains';

export const validateInput = (inputId, inputValue) => {
  if (['firstName', 'lastName'].includes(inputId)) {
    return validateString(inputId, inputValue);
  }

  if (['email'].includes(inputId)) {
    return validateEmail(inputId, inputValue);
  }

  if (['password'].includes(inputId)) {
    return validatePassword(inputId, inputValue);
  }
};
