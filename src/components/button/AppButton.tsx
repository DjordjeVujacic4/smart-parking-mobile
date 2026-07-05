import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

interface AppButtonProps {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export function AppButton({ title, loading, disabled, onPress, style }: AppButtonProps) {
  return (
    <Pressable
      style={[styles.button, (disabled || loading) && styles.disabled, style]}
      disabled={disabled || loading}
      onPress={onPress}
    >
      <Text style={styles.text}>{loading ? "Please wait..." : title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});