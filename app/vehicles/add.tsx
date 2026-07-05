import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";

import { AppScreen } from "../../src/components/screen/AppScreen";
import { VehicleForm } from "../../src/components/vehicle/VehicleForm";
import { addVehicle } from "../../src/services/vehicle.service";
import { CreateVehicleDto } from "../../src/types/vehicle";

export default function AddVehicleScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(data: CreateVehicleDto) {
    try {
      setError("");
      setLoading(true);

      await addVehicle(data);

      router.back();
    } catch {
      setError("Failed to save vehicle.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppScreen>
      <Text style={styles.title}>Add Vehicle</Text>
      <Text style={styles.subtitle}>Register a new vehicle</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <VehicleForm
        buttonTitle="Save Vehicle"
        loading={loading}
        onSubmit={handleSubmit}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 24,
  },
  subtitle: {
    color: "#64748B",
    marginTop: 6,
    marginBottom: 24,
  },
  error: {
    color: "#DC2626",
    marginBottom: 12,
    textAlign: "center",
    fontWeight: "600",
  },
});