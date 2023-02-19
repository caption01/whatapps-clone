import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { child, getDatabase, set, ref } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { authenticate, logout } from '../../store/authSlice';
import { getUserData } from './userActions';
import { getFirebaseApp } from '../firebaseHelper';

let timer;

export const signup = ({ firstName, lastName, email, passsword }) => {
  return async (dispatch) => {
    const app = getFirebaseApp();
    const auth = await getAuth(app);

    try {
      const result = await createUserWithEmailAndPassword(auth, email, passsword);
      const { uid, stsTokenManager } = result.user;
      const { accessToken, expirationTime } = stsTokenManager;

      const expiryDate = new Date(expirationTime);
      const timeNow = new Date();
      const milliSecondUnitlExpiry = expiryDate - timeNow;

      const userData = await createUser(firstName, lastName, email, uid);

      dispatch(authenticate({ token: accessToken, userData }));
      saveDataToStorage(accessToken, uid, expiryDate);

      timer = setTimeout(() => {
        dispatch(userLogout());
      }, 3000);
    } catch (error) {
      const errorCode = error.code;

      console.log({ error });

      let message = 'something went wrong';

      if (errorCode === 'auth/email-already-in-use') {
        message = 'This email has already used';
      }

      throw new Error(message);
    }
  };
};

export const signin = ({ email, passsword }) => {
  return async (dispatch) => {
    const app = getFirebaseApp();
    const auth = await getAuth(app);

    try {
      const result = await signInWithEmailAndPassword(auth, email, passsword);
      const { uid, stsTokenManager } = result.user;
      const { accessToken, expirationTime } = stsTokenManager;

      const expiryDate = new Date(expirationTime);
      const timeNow = new Date();
      const milliSecondUnitlExpiry = expiryDate - timeNow;

      const userData = await getUserData(uid);

      dispatch(authenticate({ token: accessToken, userData }));
      saveDataToStorage(accessToken, uid, expiryDate);

      timer = setTimeout(() => {
        dispatch(userLogout());
      }, milliSecondUnitlExpiry);
    } catch (error) {
      const errorCode = error.code;

      let message = 'something went wrong';

      if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
        message = 'username or password was incorrect';
      }

      throw new Error(message);
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    AsyncStorage.clear();
    clearTimeout(timer);
    dispatch(logout());
  };
};

const createUser = async (firstName, lastName, email, userId) => {
  const firstLast = `${firstName} ${lastName}`.toLocaleLowerCase();
  const userData = {
    firstName,
    lastName,
    firstLast,
    email,
    userId,
    signUpDate: new Date().toISOString(),
  };

  const dbRef = ref(getDatabase());

  const childRef = child(dbRef, `users/${userId}`);

  await set(childRef, userData);

  return userData;
};

const saveDataToStorage = (token, userId, expiryDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate: expiryDate.toISOString(),
    })
  );
};
