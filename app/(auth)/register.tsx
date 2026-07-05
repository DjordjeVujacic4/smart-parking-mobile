import { Link, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { register } from "../../src/api/auth";
import { AppButton } from "../../src/components/button/AppButton";
import { AppInput } from "../../src/components/input/AppInput";
import { AppScreen } from "../../src/components/screen/AppScreen";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister() {
    setError("");

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register({
        full_name: fullName,
        email,
        password,
      });

      router.replace("/(auth)/login");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>🅿️</Text>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join Smart Parking</Text>
        </View>

        <View style={styles.card}>
          <AppInput label="Full name" value={fullName} onChangeText={setFullName} />

          <AppInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <AppInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />

          <AppInput
            label="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <AppButton title="Create account" loading={loading} onPress={handleRegister} />

          <Link href="/(auth)/login" style={styles.link}>
            Already have an account? Login
          </Link>
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  header: { alignItems: "center", marginBottom: 24 },
  logo: { fontSize: 56, marginBottom: 10 },
  title: { fontSize: 30, fontWeight: "800", color: "#0F172A" },
  subtitle: { marginTop: 8, fontSize: 16, color: "#64748B" },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
  },
  error: {
    color: "#DC2626",
    marginBottom: 12,
    textAlign: "center",
    fontWeight: "600",
  },
  link: {
    textAlign: "center",
    marginTop: 22,
    color: "#2563EB",
    fontWeight: "600",
  },
});