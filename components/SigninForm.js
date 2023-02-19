import React, { Fragment, useCallback, useReducer } from 'react';
import { Feather } from '@expo/vector-icons';

import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';

import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';

const initialState = {
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SigninForm = ({ onSubmitPress }) => {
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
        id="email"
        label="Email"
        icon="mail"
        iconPack={Feather}
        autoCapitalize="none"
        keyboardType="email-address"
        onInputChange={inputChangeHandler}
        errorText={formState.inputValidities['email']}
      />
      <Input
        id="password"
        label="Password"
        icon="lock"
        iconPack={Feather}
        autoCapitalize="none"
        secureTextEntry
        onInputChange={inputChangeHandler}
        errorText={formState.inputValidities['password']}
      />
      <SubmitButton
        title="Sign in"
        disabled={!formState.formIsValid}
        onPress={onSubmitPress}
        style={{ marginTop: 20 }}
      />
    </Fragment>
  );
};

export default SigninForm;
