import { loginAction } from '@/store/actions/userActions';
import { useAppDispatch } from '@/store/hooks';
import { FontAwesome } from '@expo/vector-icons';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LoginMethod = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  // Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '396283007309-7v3aipgf9bf6u1f0278cnte83ra42vgu.apps.googleusercontent.com.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // You can now use authentication.accessToken
      console.log('Google Auth Success:', authentication);
    }
  }, [response]);

  const handleGoogleSignIn = () => {
    promptAsync();
  };

  const handleAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      dispatch(loginAction(credential))
      router.push("/homescreen")
      // credential contains user info and identityToken
      console.log('Apple Auth Success:', credential);
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'ERR_CANCELED') {
        // User cancelled the sign-in flow
      } else {
        // Handle other errors
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.socialButtonsContainer}>
      <TouchableOpacity
        style={styles.socialButton}
        onPress={handleGoogleSignIn}
        disabled={!request}
      >
        <View style={styles.buttonContent}>
          <FontAwesome name="google" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </View>
      </TouchableOpacity>

      {Platform.OS === 'ios' && (
        <TouchableOpacity
          style={styles.socialButton}
          onPress={handleAppleSignIn}
        >
          <View style={styles.buttonContent}>
            <FontAwesome name="apple" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    socialButtonsContainer: {
        gap: 15,
        width: "100%"
    },
    socialButton: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 10,
    },
    socialButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
})

export default LoginMethod;
