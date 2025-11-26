import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Image, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useRouter } from 'expo-router';
import slide1Image from '../assets/images/kalank.jpg';
// import slide2Image from '../assets/images/slide2.png';

const slides = [
  {
    title: 'Your new Plex experience has arrived.',
    subtitle: '',
    image: slide1Image
  },
  {
    title: 'And left room for you to make it your own.',
    subtitle: 'May the settings be with you.',
    image: slide1Image
  },
  {
    title: 'We made exploring easy',
    subtitle: 'So long, hamburger menu.',
    image: slide1Image
  },
];

export default function Slider() {
  const router = useRouter()
  const [current, setCurrent] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;
  const SWIPE_THRESHOLD = 10;

  const [isTransitioning, setIsTransitioning] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isTransitioning,
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 10,
      
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x }],
        { useNativeDriver: false }
      ),

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD && current > 0) {
          // Swipe right
          setIsTransitioning(true);
          Animated.spring(pan.x, {
            toValue: width,
            useNativeDriver: false,
          }).start(() => {
            prev(); // Move to previous slide
            pan.x.setValue(0);
            setIsTransitioning(false);
          });

        } else if (gesture.dx < -SWIPE_THRESHOLD && current < slides.length - 1) {
          // Swipe left
          setIsTransitioning(true);
          Animated.spring(pan.x, {
            toValue: -width,
            useNativeDriver: false,
          }).start(() => {
            next(); // Move to next slide
            pan.x.setValue(0);
            setIsTransitioning(false);
          });

        } else {
          // Snap back
          Animated.spring(pan.x, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      }
    })
  ).current;


  const next = () => setCurrent((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  const prev = () => setCurrent((prev) => (prev > 0 ? prev - 1 : prev));

  return (
    <LinearGradient
      colors={['#07136b', '#6a0080']}
      style={styles.container}
      start={{ x: -1, y: 0.4 }}
      end={{ x: 0.8, y: 0.9 }}
    >
      <Animated.View
        style={[
          styles.slideContainer,
          {
            transform: [{ translateX: pan.x }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        {/* Top Image */}
        <Image
          source={slides[current]?.image}
          style={styles.topImage}
          resizeMode="contain"
        />
        

        {/* Slide Content */}
        <View style={styles.slide}>
          <Text style={styles.title}>{slides[current].title}</Text>
          {slides[current].subtitle ? (
            <Text style={styles.subtitle}>{slides[current].subtitle}</Text>
          ) : null}
        </View>
      </Animated.View>
      <View style={styles.bottomContainer}>
        <View style={styles.dots}>
          {slides.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                { backgroundColor: idx === current ? '#fff' : '#888' },
              ]}
            />
          ))}
        </View>
        <View style={styles.actions}>
          {current < slides.length - 1 ? (
            <TouchableOpacity onPress={next}>
              <Text style={styles.actionText}>Skip</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => router.push("/homescreen")}>
              <Text style={styles.actionText}>Let&apos;s Go</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      
    </LinearGradient>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  topImage: {
    width: '100%',
    height: 450,
    marginBottom: 20,
    marginTop: 30,
  },
  slide: {
    width: width - 40,
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
  actions: {
    marginLeft: 'auto',
  },
  actionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  slideContainer: {
    width: '100%',
    alignItems: 'center',
  },
});