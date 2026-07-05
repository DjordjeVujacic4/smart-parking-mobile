import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "../../src/components/screen/AppScreen";
import { fetchLocations } from "../../src/services/location.service";
import { Location } from "../../src/types/location";

export default function ParkingScreen() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadLocations() {
    try {
      const data = await fetchLocations();
      setLocations(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLocations();
  }, []);

  return (
    <AppScreen>
      <Text style={styles.title}>Parking Locations</Text>
      <Text style={styles.subtitle}>Choose a parking location</Text>

      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : locations.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyIcon}>🅿️</Text>
          <Text style={styles.emptyTitle}>No locations found</Text>
        </View>
      ) : (
        locations.map((location) => (
          <Pressable
            key={location.id}
            style={styles.locationCard}
            onPress={() =>
              router.push({
                pathname: "/locations/[id]" as any,
                params: { id: String(location.id) },
              })
            }
          >
            <Text style={styles.locationIcon}>📍</Text>
            <View style={styles.locationContent}>
              <Text style={styles.locationName}>{location.name}</Text>
              <Text style={styles.locationAddress}>{location.address}</Text>
            </View>
          </Pressable>
        ))
      )}
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
  locationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    gap: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
  },
  locationIcon: {
    fontSize: 32,
  },
  locationContent: {
    flex: 1,
  },
  locationName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  locationAddress: {
    marginTop: 4,
    color: "#64748B",
  },
});