import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { AppButton } from "../../src/components/button/AppButton";
import { AppScreen } from "../../src/components/screen/AppScreen";
import { removeToken } from "../../src/services/auth.service";
import { fetchCurrentUser } from "../../src/services/user.service";
import { User } from "../../src/types/user";

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const data = await fetchCurrentUser();
      setUser(data);
    } catch {
      Alert.alert("Error", "Failed to load profile.");
    }
  }

  async function handleLogout() {
    await removeToken();
    router.replace("/login");
  }

  return (
    <AppScreen>
      <View style={styles.card}>
        <Text style={styles.title}>👤 Profile</Text>

        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.value}>{user?.full_name ?? "-"}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email ?? "-"}</Text>

        <View style={styles.buttonContainer}>
          <AppButton title="Logout" onPress={handleLogout} />
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 12,
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 30,
  },
});