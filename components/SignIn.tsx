import LoginMethod from '@/hoc/CommonLoginMethod/LoginMethod';
import { loginAction } from '@/store/actions/userActions';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import MainContainer from './MainContainer';


const SignIn = () => {
  const dispatch = useAppDispatch()
  const router = useRouter();
  const [form, setForm] = useState({email: "", password: ""});
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  

  const handleEmailSignIn = () => {
    if (validateForm()) {
      // Implement Email Sign In
      console.log('Email Sign In');
      dispatch(loginAction(form))
      // After successful login, navigate to watch history screen
      router.replace('/watch-history');
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: ''
    };

    if (!form.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <MainContainer>
      <LoginMethod />
      <View style={styles.formContainer}>
        <TextInput
          style={[styles.input, errors.email ? styles.inputError : null]}
          placeholder="Email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={form.email}
          onChangeText={(text) => {
            setForm({...form, email: text});
            setErrors(prev => ({ ...prev, email: '' }));
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        <TextInput
          style={[styles.input, errors.password ? styles.inputError : null]}
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={form.password}
          onChangeText={(text) => {
            setForm({...form, password: text});
            setErrors(prev => ({ ...prev, password: '' }));
          }}
          secureTextEntry
        />

        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleEmailSignIn}
        >
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.redirectButton}
          onPress={() => router.push('/auth/sign-up')}
        >
          <Text style={styles.redirectText}>
            Don&apos;t have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 30,
    gap: 15,
    width: "100%"
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#fff',
  },
  inputError: {
    borderColor: '#ff4444',
  },
  signInButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  redirectButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  redirectText: {
    color: '#fff',
    fontSize: 14,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
  },
});

export default SignIn; 