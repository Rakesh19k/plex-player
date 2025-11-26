import { convertMinutesToHours, truncateTitle } from "@/utils/constant";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Card({ image, title, subtitle, style, year, number, release, onPress, onLongPress, isActive }: any) {
  const isChannelGuide = title === "Channel Guide";

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[
          styles.card,
          isChannelGuide && styles.channelGuideCard,
          isActive && { opacity: 0.7 } // Optional: visual feedback when dragging
        ]}
        onPress={onPress}
        onLongPress={onLongPress}
        delayLongPress={150} // Optional: tweak as needed
      >
        {image && <Image source={image} style={styles.image} />}
        {isChannelGuide && <Text style={styles.title}>{title}</Text>}
      </TouchableOpacity>
      {!isChannelGuide && (
        <View style={styles.textContainer}>
          <Text style={styles.title}>{truncateTitle(title, number)}</Text>
          {subtitle && <Text style={styles.subtitle}>{convertMinutesToHours(subtitle)}</Text>}
          {year && <Text style={styles.subtitle}>{year}</Text>}
          {release && <Text style={styles.subtitle}>{release}</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1, // Ensure the container fills available space
  },
  card: {
    backgroundColor: "#222",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    // flex: 1, // Ensure the touchable fills the container
  },
  channelGuideCard: {
    width: '100%',
    height: '100%',
  },
  image: { 
    width: "100%", 
    height: '100%', 
    borderRadius: 12 
  },
  textContainer: {
    bottom: 0,
    left: 0,
  },
  title: { 
    color: "#fff", 
    fontWeight: "bold", 
    marginTop: 8,
    // marginBottom: 8
  },
  subtitle: { 
    color: "#ccc", 
    fontSize: 12 
  },
});
