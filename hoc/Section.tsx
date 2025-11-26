import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface SectionProps {
  title: string;
  children: ReactNode;
  streamType: string;
}

export default function Section({ title, children, streamType }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.stream}>{streamType}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginVertical: 12 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 3 },
  stream: {
    color: "gray",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
