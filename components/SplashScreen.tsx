import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const SplashScreen = () => (
  <View style={styles.container}>
    <Image
      source={require('../assets/images/plex-logo.png')}
      style={styles.logo}
      resizeMode="contain"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111', // nearly black
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 120,
  },
});

export default SplashScreen;
