import React from 'react';
import { View, StyleSheet } from 'react-native';

const PageContainer = ({ children, style }) => {
  return <View style={{ ...styles.container, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: 'white',
  },
});

export default PageContainer;
