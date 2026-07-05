import { SafeAreaView, StyleSheet, View } from "react-native";

interface AppScreenProps {
  children: React.ReactNode;
}

export function AppScreen({ children }: AppScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  container: {
    flex: 1,
    padding: 24,
  },
});