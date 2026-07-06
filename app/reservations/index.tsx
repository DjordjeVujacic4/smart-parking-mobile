import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "../../src/components/screen/AppScreen";
import { fetchReservations } from "../../src/services/reservation.service";
import { Reservation } from "../../src/types/reservation";

export default function ReservationsScreen() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    loadReservations();
  }, []);

  async function loadReservations() {
    const data = await fetchReservations();
    setReservations(data.items);
  }

  return (
    <AppScreen>
      <Text style={styles.title}>Reservation History</Text>

      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.vehicle}>
              {item.vehicle.make} {item.vehicle.model}
            </Text>

            <Text style={styles.plate}>{item.vehicle.license_plate}</Text>

            <Text style={styles.location}>
              📍 {item.parking_spot.location.name}
            </Text>

            <Text style={styles.spot}>
              🅿 Spot {item.parking_spot.spot_number}
            </Text>

            <Text style={styles.status}>{item.status.toUpperCase()}</Text>

            <Text style={styles.date}>
              Created: {new Date(item.created_at).toLocaleString()}
            </Text>

            <Text style={styles.date}>
              Expires: {new Date(item.expires_at).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  vehicle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  plate: {
    marginTop: 4,
    color: "#2563EB",
    fontWeight: "700",
  },
  location: {
    marginTop: 12,
    color: "#475569",
  },
  spot: {
    marginTop: 6,
    color: "#475569",
  },
  status: {
    marginTop: 12,
    fontWeight: "800",
    fontSize: 16,
    color: "#16A34A",
  },
  date: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 13,
  },
});