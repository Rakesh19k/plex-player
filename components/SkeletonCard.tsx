import React from "react";
import { View } from "react-native";

export default function SkeletonCard({ style }: { style?: any }) {
  return (
    <View
      style={[
        {
          backgroundColor: "#e0e0e0",
          borderRadius: 8,
          marginRight: 16,
          marginBottom: 40,
        },
        style,
      ]}
    />
  );
}