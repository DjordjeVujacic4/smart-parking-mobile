import { StyleSheet, Text, View } from "react-native";

import { Reservation } from "../../types/reservation";
import { AppButton } from "../button/AppButton";

interface ActiveReservationCardProps {
  reservation: Reservation;
  remainingTime: string;
  onCancel: () => void;
  onCheckIn: () => void;
  onCheckOut: () => void;
  isParked: boolean;
}

export function ActiveReservationCard({
  reservation,
  remainingTime,
  onCancel,
  onCheckIn,
  onCheckOut,
  isParked,
}: ActiveReservationCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>🚗 Active Reservation</Text>

      <Text style={styles.vehicle}>
        {reservation.vehicle.make} {reservation.vehicle.model}
      </Text>

      <Text style={styles.plate}>
        {reservation.vehicle.license_plate}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.info}>
          📍 {reservation.parking_spot.location.name}
        </Text>

        <Text style={styles.info}>
          🅿 Spot {reservation.parking_spot.spot_number}
        </Text>
      </View>

      <Text style={styles.label}>Status</Text>

      <Text style={styles.status}>
        {reservation.status.toUpperCase()}
      </Text>

      <Text style={styles.label}>Time Remaining</Text>

      <Text style={styles.remaining}>
        {remainingTime}
      </Text>

      <AppButton
        title={isParked ? "Check Out" : "Check In"}
        onPress={isParked ? onCheckOut : onCheckIn}
      />

      <View style={{ height: 12 }} />

      <AppButton
        title="Cancel Reservation"
        onPress={onCancel}
      />
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
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 18,
  },

  vehicle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },

  plate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2563EB",
    marginTop: 4,
  },

  infoContainer: {
    marginTop: 18,
    marginBottom: 8,
    gap: 6,
  },

  info: {
    fontSize: 15,
    color: "#475569",
  },

  label: {
    marginTop: 14,
    color: "#64748B",
    fontSize: 13,
  },

  status: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "800",
    color: "#16A34A",
  },

  remaining: {
    marginTop: 4,
    marginBottom: 20,
    fontSize: 26,
    fontWeight: "800",
    color: "#2563EB",
  },
});