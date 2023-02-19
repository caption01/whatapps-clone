import React, { Fragment, useCallback, useReducer, useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';

import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';
import { signin } from '../utils/actions/authActions';
import colors from '../constants/colors';

const testMode = true;

const initialState = {
  inputValidities: {
    email: testMode,
    password: testMode,
  },
  inputValues: {
    email: testMode ? 'aaa@test.com' : '',
    password: testMode ? '123456' : '',
  },
  formIsValid: testMode,
};

const SigninForm = () => {
  const dispath = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  useEffect(() => {
    if (error) {
      Alert.alert(error);
    }

    setError('');
  }, [error]);

  const inputChangeHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, inputValue, validationResult: result });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    try {
      setIsLoading(true);

      const action = signin({
        email: formState.inputValues.email,
        passsword: formState.inputValues.password,
      });

      await dispath(action);
      setError('');
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

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
        value={formState.inputValues['email']}
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
        value={formState.inputValues['password']}
      />
      {isLoading ? (
        <ActivityIndicator size={'small'} color={colors.primary} style={{ marginTop: 10 }} />
      ) : (
        <SubmitButton
          title="Sign in"
          disabled={!formState.formIsValid}
          onPress={authHandler}
          style={{ marginTop: 20 }}
        />
      )}
    </Fragment>
  );
};

export default SigninForm;
