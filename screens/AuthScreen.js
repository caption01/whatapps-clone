import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PageContainer from '../components/PageContainer';
import SignupForm from '../components/SignupForm';
import SigninForm from '../components/SigninForm';
import colors from '../constants/colors';

import logo from '../assets/images/logo.png';

const AuthScreen = (props) => {
  const [isSignup, setIsSignup] = useState(true);

  const onSubmitPress = () => {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <ScrollView>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' && 'height'}
            keyboardVerticalOffset={100}
          >
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={logo} resizeMode="contain" />
            </View>
            {isSignup ? (
              <SignupForm onSubmitPress={onSubmitPress} />
            ) : (
              <SigninForm onSubmitPress={onSubmitPress} />
            )}
            <TouchableOpacity style={styles.linkContainer} onPress={() => setIsSignup(!isSignup)}>
              <Text style={styles.link}>{`Switch to ${isSignup ? 'sign in' : 'sign up'}`}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  link: {
    color: colors.blue,
    fontFamily: 'medium',
    letterSpacing: 0.3,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '50%',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default AuthScreen;
