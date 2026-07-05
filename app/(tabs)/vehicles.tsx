import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback } from "react";
import { Pressable } from "react-native";
import { AppButton } from "../../src/components/button/AppButton";
import { AppScreen } from "../../src/components/screen/AppScreen";
import { fetchVehicles } from "../../src/services/vehicle.service";
import { Vehicle } from "../../src/types/vehicle";

export default function VehiclesScreen() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadVehicles() {
    try {
      const data = await fetchVehicles();
      setVehicles(data);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadVehicles();
    }, [])
  );
  return (
    <AppScreen>
      <Text style={styles.title}>My Vehicles</Text>
      <Text style={styles.subtitle}>Manage your registered vehicles</Text>

      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : vehicles.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyIcon}>🚗</Text>
          <Text style={styles.emptyTitle}>No vehicles yet</Text>
          <Text style={styles.emptyText}>
            Add your first vehicle to start making reservations.
          </Text>
        </View>
      ) : (
        vehicles.map((vehicle) => (
          <Pressable
            key={vehicle.id}
            style={styles.vehicleCard}
            onPress={() =>
              router.push({
                pathname: "/vehicles/[id]",
                params: { id: String(vehicle.id) },
              })
            }
          >
            <Text style={styles.plate}>{vehicle.license_plate}</Text>
            <Text style={styles.vehicleText}>
              {vehicle.make} {vehicle.model}
            </Text>
          </Pressable>
        ))
      )}

      <AppButton
        title="+ Add Vehicle"
        onPress={() => router.push("/vehicles/add")}
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
  loader: {
    marginTop: 40,
  },
  emptyBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    marginTop: 20,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },
  emptyText: {
    textAlign: "center",
    color: "#64748B",
    marginTop: 8,
  },
  vehicleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },
  plate: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  vehicleText: {
    marginTop: 4,
    color: "#64748B",
  },
  addButton: {
    marginTop: "auto",
  },
});