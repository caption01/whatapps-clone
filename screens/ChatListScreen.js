import {} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ChatListScreen = (props) => {
  const goTo = () => {
    props.navigation.navigate('ChatScreen');
  };

  return (
    <View style={styles.container}>
      <Text>Chat Screen</Text>
      <Button title="Go to ChatScreen" onPress={goTo} />
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
