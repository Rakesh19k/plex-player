import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface MainContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const MainContainer = ({ children, style }: MainContainerProps) => {
  return (
    <LinearGradient
      colors={['#7b224f', '#1a0a1f']}
      style={[styles.container, style]}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.contentContainer}>
        {children}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    maxWidth: 500,
    width: "100%",
    alignItems: "center",
    alignSelf: "center"
  },
});

export default MainContainer; 