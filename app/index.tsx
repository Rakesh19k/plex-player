import RegistrationScreen from "@/components/RegistrationScreen";
import SplashScreen from "@/components/SplashScreen";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadStoredUser } from "@/store/reducers/userReducer";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as Location from 'expo-location'; // <-- Add this import

export default function Home() {
  const [isSplashLoaded, setIsSplashLoaded] = useState(false);
  const userDetails = useAppSelector(
    (state: any) => state.authReducer.userDetails
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadStoredUser());
    const timer = setTimeout(() => setIsSplashLoaded(true), 3000); // 3s splash

    registerForPushNotificationsAsync();
    requestLocationPermission(); // <-- Add this line

    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });
    return () => subscription.remove();
  }, []);

  let content;
  if (!isSplashLoaded) {
    content = <SplashScreen />;
  } else if (userDetails) {
    content = <Redirect href="/homescreen" />;
  } else {
    content = <RegistrationScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {content}
    </GestureHandlerRootView>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Expo Push Token:', token);
  // TODO: Send this token to your backend server to send notifications to this device
}

async function requestLocationPermission() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission to access location was denied');
    return;
  }
  let location = await Location.getCurrentPositionAsync({});
  console.log('User location:', location);
  // You can use the location object as needed, or send it to your backend
}
