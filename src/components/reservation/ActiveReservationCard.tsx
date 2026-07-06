import { StyleSheet, Text, View } from "react-native";

import { Reservation } from "../../types/reservation";
import { AppButton } from "../button/AppButton";

interface ActiveReservationCardProps {
  reservation: Reservation;
  remainingTime: string;
  onCancel: () => void;
}

export function ActiveReservationCard({
  reservation,
  remainingTime,
  onCancel,
}: ActiveReservationCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>🚗 Active Reservation</Text>

      <Text style={styles.label}>Status</Text>
      <Text style={styles.status}>{reservation.status.toUpperCase()}</Text>

      <Text style={styles.label}>Time Remaining</Text>
      <Text style={styles.remaining}>{remainingTime}</Text>

      <AppButton title="Cancel Reservation" onPress={onCancel} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 10,
  },
  label: {
    marginTop: 14,
    color: "#64748B",
    fontSize: 13,
  },
  status: {
    marginTop: 4,
    fontWeight: "800",
    color: "#16A34A",
    fontSize: 16,
  },
  remaining: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2563EB",
    marginTop: 4,
    marginBottom: 20,
  },
});