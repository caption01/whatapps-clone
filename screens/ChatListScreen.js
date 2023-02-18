import {} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ChatListScreen = (props) => {
  const goToSettingsScreen = () => {
    props.navigation.navigate('ChatSettings');
  };

  return (
    <View style={styles.container}>
      <Text>Chat Screen</Text>
      <Button title="Go to Setings" onPress={goToSettingsScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatListScreen;
