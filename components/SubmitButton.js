import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';

const SubmitButton = ({ disabled, color, title, onPress, style }) => {
  const enabledBgColor = color || colors.primary;
  const disableBgColor = colors.lightGrey;

  const bgColor = disabled ? disableBgColor : enabledBgColor;

  return (
    <TouchableOpacity
      style={{ ...styles.button, ...style, backgroundColor: bgColor }}
      onPress={disabled ? () => {} : onPress}
    >
      <Text style={{ color: disabled ? colors.grey : 'white' }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SubmitButton;
