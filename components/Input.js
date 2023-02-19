import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import colors from '../constants/colors';

const Input = (props) => {
  const { iconSize = 15, errorText = [], id, label, icon, onInputChange, ...restProps } = props;

  const onChangeText = (text) => {
    onInputChange?.(id, text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {props.iconPack && <props.iconPack name={icon} style={styles.icon} size={iconSize} />}
        <TextInput style={styles.input} onChangeText={onChangeText} {...restProps} />
      </View>
      {errorText.length !== 0 && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText?.[0]}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginVertical: 8,
    fontFamily: 'bold',
    letterSpacing: 0.3,
    color: colors.textColor,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: colors.nearlyWhite,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    color: colors.grey,
  },
  input: {
    color: colors.textColor,
    flex: 1,
    fontFamily: 'regular',
    letterSpacing: 0.3,
    paddingTop: 0,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    fontFamily: 'regular',
    letterSpacing: 0.3,
  },
});

export default Input;
