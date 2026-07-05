import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../../src/components/button/AppButton";
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
      <View style={styles.container}>
        <Text style={styles.title}>
          Welcome to Smart Parking 🚗
        </Text>

        <AppButton
          title="Logout"
          onPress={handleLogout}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 32,
    textAlign: "center",
  },
});