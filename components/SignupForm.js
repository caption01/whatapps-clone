import React, { Fragment, useReducer, useCallback } from 'react';
import { FontAwesome, Feather } from '@expo/vector-icons';

import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';

import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';

const initialState = {
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignupForm = ({ onSubmitPress }) => {
  const [formState, dispatch] = useReducer(reducer, initialState);

  const inputChangeHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatch({ inputId, validationResult: result });
    },
    [dispatch]
  );

  return (
    <Fragment>
      <Input
        id="firstName"
        label="First name"
        icon="user-o"
        autoCapitalize="none"
        iconPack={FontAwesome}
        onInputChange={inputChangeHandler}
        errorText={formState.inputValidities['firstName']}
      />
      <Input
        id="lastName"
        label="Last name"
        icon="user-o"
        autoCapitalize="none"
        iconPack={FontAwesome}
        onInputChange={inputChangeHandler}
        errorText={formState.inputValidities['lastName']}
      />
      <Input
        id="email"
        label="Email"
        icon="mail"
        autoCapitalize="none"
        keyboardType="email-address"
        iconPack={Feather}
        onInputChange={inputChangeHandler}
        errorText={formState.inputValidities['email']}
      />
      <Input
        id="password"
        label="Password"
        icon="lock"
        autoCapitalize="none"
        secureTextEntry
        iconPack={Feather}
        onInputChange={inputChangeHandler}
        errorText={formState.inputValidities['password']}
      />
      <SubmitButton
        title="Sign up"
        disabled={!formState.formIsValid}
        onPress={onSubmitPress}
        style={{ marginTop: 20 }}
      />
    </Fragment>
  );
};

export default SignupForm;
