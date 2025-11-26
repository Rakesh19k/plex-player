import LoginMethod from '@/hoc/CommonLoginMethod/LoginMethod';
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

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleCreateAccount = () => {
    if (validateForm()) {
      console.log('Create account');
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

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Create Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Create Password must be at least 6 characters';
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
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors(prev => ({ ...prev, email: '' }));
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        <TextInput
           style={[styles.input, errors.password ? styles.inputError : null]}
          placeholder="Create Password"
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors(prev => ({ ...prev, password: '' }));
          }}
          secureTextEntry
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}


        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={handleCreateAccount}
        >
          <Text style={styles.createAccountButtonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.redirectButton}
          onPress={() => router.push('/auth/sign-in')}
        >
          <Text style={styles.redirectText}>
            Already have an account? Sign In
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
  createAccountButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  createAccountButtonText: {
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

export default SignUp; 