import { Pressable, StyleSheet, Text, View } from "react-native";

interface ParkingSpotCardProps {
  spotNumber: string;
  status: string;
  onPress?: () => void;
}

export function ParkingSpotCard({
  spotNumber,
  status,
  onPress,
}: ParkingSpotCardProps) {
  const isAvailable = status === "available";

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.label}>Spot</Text>
        <Text style={styles.spotNumber}>{spotNumber}</Text>
      </View>

      <View
        style={[
          styles.badge,
          isAvailable ? styles.availableBadge : styles.occupiedBadge,
        ]}
      >
        <Text
          style={[
            styles.badgeText,
            isAvailable ? styles.availableText : styles.occupiedText,
          ]}
        >
          {isAvailable ? "Available" : "Occupied"}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: "#64748B",
    fontSize: 12,
    marginBottom: 4,
  },
  spotNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  availableBadge: {
    backgroundColor: "#DCFCE7",
  },
  occupiedBadge: {
    backgroundColor: "#FEE2E2",
  },
  badgeText: {
    fontWeight: "700",
    fontSize: 13,
  },
  availableText: {
    color: "#16A34A",
  },
  occupiedText: {
    color: "#DC2626",
  },
});