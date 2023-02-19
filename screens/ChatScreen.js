import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import backgroundImage from '../assets/images/droplet.jpeg';
import colors from '../constants/colors';

const ChatScreen = (props) => {
  const [message, setMessage] = useState('');

  const sendMessage = useCallback(() => {
    setMessage('');
  }, [message]);

  const onAddPress = () => {};

  const onCameraPress = () => {};

  const onChangeText = (msg) => {
    setMessage(msg);
  };

  return (
    <SafeAreaView edges={['right', 'left', 'bottom']} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' && 'padding'} //android no need this behavior
        keyboardVerticalOffset={100}
      >
        <ImageBackground style={styles.backgroundImage} source={backgroundImage}></ImageBackground>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.mediaButton} onPress={onAddPress}>
            <Feather name="plus" size={24} color={colors.blue} />
          </TouchableOpacity>
          <TextInput
            style={styles.textbox}
            onChangeText={onChangeText}
            value={message}
            onSubmitEditing={sendMessage}
          />
          {message === '' && (
            <TouchableOpacity style={styles.mediaButton} onPress={onCameraPress}>
              <Feather name="camera" size={24} color={colors.blue} />
            </TouchableOpacity>
          )}
          {message !== '' && (
            <TouchableOpacity
              style={{ ...styles.mediaButton, ...styles.sendButton }}
              onPress={sendMessage}
            >
              <Feather name="send" size={20} color={'white'} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  backgroundImage: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  textbox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.lightGrey,
    marginHorizontal: 15,
    paddingHorizontal: 12,
  },
  mediaButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
  },
  sendButton: {
    backgroundColor: colors.blue,
    borderRadius: 50,
    padding: 8,
    width: 35,
  },
  screen: {
    flex: 1,
  },
});

export default ChatScreen;
