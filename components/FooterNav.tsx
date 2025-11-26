import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type IconName = "home" | "tv" | "film-outline" | "compass-outline";

export default function FooterNav({ active = "Home" }: any) {
  const router = useRouter()
  const tabs: { key: string; icon: IconName, path: string }[] = [
    { key: "Home", icon: "home", path: "/homescreen" },
    { key: "Live TV", icon: "tv", path: "/liveTv" },
    { key: "On Demand", icon: "film-outline", path: "/ondemand" },
    { key: "Discover", icon: "compass-outline", path: "/discover" },
  ];
  return (
    <View style={styles.footer}>
      {tabs.map((tab: any) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.btn}
          onPress={() => router.push(tab.path)}
          disabled={active === tab.key}
        >
          <Ionicons
            size={24}
            name={tab.icon}
            color={active === tab.key ? "#ffb300" : "#fff"}
          />
          <Text style={[styles.text, active === tab.key && styles.textActive]}>
            {tab.key}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    backgroundColor: "#000",
    paddingVertical: 8,
    justifyContent: "space-around",
    alignItems: "center",
  },
  btn: { alignItems: "center", flex: 1 },
  text: { color: "#fff", fontSize: 12, marginTop: 2 },
  textActive: { color: "#ffb300", fontWeight: "bold" },
});
