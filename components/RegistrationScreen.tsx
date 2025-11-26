// app/components/RegistrationScreen.js
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function RegistrationScreen() {
  const  count  = useAppSelector((state: RootState) => state.authReducer)
  const router = useRouter();
  console.log(count)
  return (
    <LinearGradient
      colors={['#7b224f', '#1a0a1f']}
      style={styles.container}
      start={{ x: 0.1, y: 1 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.logoContainer}>
        <Image
            source={require('../assets/images/plex-logo.png')}
            style={styles.logo}
            resizeMode="contain"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/auth/sign-in')}>
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={() => router.push('/auth/sign-up')}>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bottomText}>
        By creating an account or continuing to use a Plex application, website, or software, you acknowledge and agree that you have accepted the Terms of Service and have reviewed the Privacy Policy
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  logoContainer: {
    position: 'absolute',
    top: '35%',
    alignSelf: 'center',
  },
  logo: {
    width: 300,
    height: 120,
  },
  buttonContainer: {
    width: "80%",      // Responsive width for small screens
    maxWidth: 400,     // Never exceed 300px
    marginBottom: 24,
  },
  signInButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 12,
    alignItems: 'center',
  },
  signInText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
  signUpButton: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  signUpText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
  bottomText: {
    color: '#fff',
    opacity: 0.7,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 18,
    paddingHorizontal: 16,
  },
});