import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Replace with your actual image path
const backgroundImage = require('../assets/images/watch-history-bg.jpg');


const WatchHistoryShare= () => {
  const router = useRouter()
  const onSave = () => {
    router.push("/slider")
  }
  const onViewSettings = () => {}
  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Text style={styles.title}>Share your Watch History</Text>
          <Text style={styles.subtitle}>
            Find out what your friends and family are watching, discover your next favorite binge.
          </Text>
          <View style={styles.optionRow}>
            <Text style={styles.icon}>👥</Text>
            <Text style={styles.optionText}>Share with my friends only</Text>
            <Text style={styles.arrow}>›</Text>
          </View>
          <View style={styles.optionRow}>
            <Text style={styles.icon}>✉️</Text>
            <Text style={styles.optionText}>Send me a weekly activity digest</Text>
            <Text style={styles.arrow}>›</Text>
          </View>
          <Text style={styles.infoText}>
            If you are a resident of the United States, your above Watch History setting will apply for two years. You can always withdraw your consent in your profile settings.
          </Text>
        </View>
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.secondaryButton} onPress={onViewSettings}>
            <Text style={styles.secondaryButtonText}>View all Activity Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={onSave}>
            <Text style={styles.primaryButtonText} >Save My Choices</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  safeArea: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(40, 0, 40, 0.55)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 180,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 32,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  icon: {
    fontSize: 22,
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  arrow: {
    color: '#fff',
    fontSize: 22,
    marginLeft: 8,
  },
  infoText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 24,
    opacity: 0.8,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 32,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    paddingVertical: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#2d0036',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default WatchHistoryShare; 