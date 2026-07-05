import { Pressable, StyleSheet, Text, View } from "react-native";

interface AppCardProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

export function AppCard({ icon, title, subtitle, onPress }: AppCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.icon}>{icon}</Text>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
  },
  icon: {
    fontSize: 34,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748B",
  },
});