import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppCard } from "../../src/components/card/AppCard";
import { AppScreen } from "../../src/components/screen/AppScreen";
import { useAuth } from "../../src/context/AuthContext";

export default function HomeScreen() {
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.replace("/(auth)/login");
  }

  return (
    <AppScreen>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back 👋</Text>
        <Text style={styles.title}>Smart Parking</Text>
      </View>

      <AppCard
        icon="🅿️"
        title="Find Parking"
        subtitle="Search available parking locations"
        onPress={() => router.push("/(tabs)/parking")}
      />

      <AppCard
        icon="🚗"
        title="My Vehicles"
        subtitle="Manage your registered vehicles"
        onPress={() => router.push("/(tabs)/vehicles")}
      />

      <AppCard
        icon="⏱️"
        title="Active Reservation"
        subtitle="No active reservation yet"
      />

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 24,
    marginBottom: 28,
  },
  greeting: {
    fontSize: 16,
    color: "#64748B",
    marginBottom: 6,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0F172A",
  },
  logoutButton: {
    marginTop: "auto",
    paddingVertical: 14,
  },
  logoutText: {
    color: "#DC2626",
    textAlign: "center",
    fontWeight: "700",
  },
});