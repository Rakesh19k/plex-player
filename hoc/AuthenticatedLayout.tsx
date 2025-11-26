import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FooterNav from '../components/FooterNav';
import Header from '../components/Header';
import { usePathname } from 'expo-router';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const pathname = usePathname();
  let activeTab = "Home";
  if (pathname === "/liveTv") activeTab = "Live TV";
  else if (pathname === "/ondemand") activeTab = "On Demand";
  else if (pathname === "/discover") activeTab = "Discover";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Header activeTab={activeTab} />
          <View style={styles.mainContent}>
            {children}
          </View>
          <FooterNav active={activeTab} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
}); 