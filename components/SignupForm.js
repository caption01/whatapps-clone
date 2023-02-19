import React, { Fragment, useReducer, useCallback, useState, useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';

import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';
import { signup } from '../utils/actions/authActions';
import colors from '../constants/colors';

const initialState = {
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  inputValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  formIsValid: false,
};

const SignupForm = () => {
  const dispath = useDispatch();

  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

      const action = signup({
        firstName: formState.inputValues.firstName,
        lastName: formState.inputValues.lastName,
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
      {isLoading ? (
        <ActivityIndicator size={'small'} color={colors.primary} style={{ marginTop: 10 }} />
      ) : (
        <SubmitButton
          title="Sign up"
          disabled={!formState.formIsValid}
          onPress={authHandler}
          style={{ marginTop: 20 }}
        />
      )}
    </Fragment>
  );
};

export default SignupForm;
