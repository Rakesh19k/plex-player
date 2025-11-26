import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { StatusBar } from 'expo-status-bar';
// Simple auth state management
export default function Layout() {
  

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#000" translucent={false} />
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }} />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
