import { validate } from 'validate.js';

export const validateString = (id, value) => {
  let constraints = {
    presence: { allowEmpty: false },
  };

  if (value !== '') {
    constraints = {
      ...constraints,
      format: {
        pattern: '[a-z]+',
        flags: 'i',
        message: 'can only contain letters',
      },
    };
  }

  const validatationsResult = validate({ [id]: value }, { [id]: constraints });

  return validatationsResult && validatationsResult[id];
};

export const validateEmail = (id, value) => {
  let constraints = {
    presence: { allowEmpty: false },
  };

  if (value !== '') {
    constraints = {
      ...constraints,
      email: true,
    };
  }

  const validatationsResult = validate({ [id]: value }, { [id]: constraints });

  return validatationsResult && validatationsResult[id];
};

export const validatePassword = (id, value) => {
  let constraints = {
    presence: { allowEmpty: false },
  };

  if (value !== '') {
    constraints = {
      ...constraints,
      length: {
        minimum: 6,
        message: 'must be at least 6 characters',
      },
    };
  }

  const validatationsResult = validate({ [id]: value }, { [id]: constraints });

  return validatationsResult && validatationsResult[id];
};
