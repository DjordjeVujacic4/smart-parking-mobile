import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { AppButton } from "../../src/components/button/AppButton";
import { AppCard } from "../../src/components/card/AppCard";
import { AppScreen } from "../../src/components/screen/AppScreen";
import { useAuth } from "../../src/context/AuthContext";

import { useEffect } from "react";
import { ActiveReservationCard } from "../../src/components/reservation/ActiveReservationCard";
import {
  createCheckIn,
  createCheckOut,
} from "../../src/services/parkingSession.service";
import { fetchReservations, removeReservation } from "../../src/services/reservation.service";
import { Reservation } from "../../src/types/reservation";

import { ParkingSession } from "../../src/types/parkingSession";




export default function HomeScreen() {
  const { logout } = useAuth();
  const [parkingSession, setParkingSession] =
    useState<ParkingSession | null>(null);
  const [parkingSessionId, setParkingSessionId] = useState<number | null>(null);
  const [activeReservation, setActiveReservation] = useState<Reservation | null>(null);
  const [remainingTime, setRemainingTime] = useState("--:--");
  async function handleLogout() {
    await logout();
    router.replace("/(auth)/login");
  }
  async function loadActiveReservation() {
    const data = await fetchReservations();

    const active =
      data.items.find(
        (item) => item.status === "active" || item.status === "parked"
      ) ?? null;

    setActiveReservation(active);
  }
  async function handleCancelReservation() {
    if (!activeReservation) return;

    try {
      await removeReservation(activeReservation.id);

      setActiveReservation(null);
    } catch (error) {
      console.error(error);
    }
  }
  function calculateRemainingTime(expiresAt: string) {
    const now = new Date().getTime();
    const expires = new Date(expiresAt).getTime();

    const difference = expires - now;

    if (difference <= 0) {
      return "00:00";
    }

    const minutes = Math.floor(difference / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  useFocusEffect(
    useCallback(() => {
      loadActiveReservation();
    }, [])
  );
  useEffect(() => {
    if (!activeReservation) {
      setRemainingTime("--:--");
      return;
    }

    setRemainingTime(calculateRemainingTime(activeReservation.expires_at));

    const interval = setInterval(() => {
      const time = calculateRemainingTime(activeReservation.expires_at);

      setRemainingTime(time);

      if (time === "00:00") {
        loadActiveReservation();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeReservation]);

  async function handleCheckIn() {
    const reservation = activeReservation;

    if (!reservation) return;

    try {
      const session = await createCheckIn(reservation.id);

      console.log("CHECK IN SESSION:", session);
      console.log("CHECK IN SESSION ID:", session?.id);

      setParkingSession(session);
      setParkingSessionId(session.id);

      setActiveReservation({
        ...reservation,
        status: "parked",
      });

      // NEMOJ OVO SAD:
      // await loadActiveReservation();

    } catch (error: any) {
      console.log("CHECK IN ERROR:", error.response?.status, error.response?.data);
    }
  }

  async function handleCheckOut() {
    console.log("CHECK OUT CLICKED");
    console.log("parkingSessionId:", parkingSessionId);
    console.log("parkingSession:", parkingSession);

    if (!parkingSessionId) {
      console.log("Missing parking session id");
      return;
    }

    try {
      const result = await createCheckOut(parkingSessionId);
      console.log("CHECK OUT RESPONSE:", result);

      setParkingSession(null);
      setParkingSessionId(null);
      setActiveReservation(null);
      setRemainingTime("--:--");
    } catch (error: any) {
      console.log("CHECK OUT ERROR:", error.response?.status, error.response?.data);
    }
  }


  return (
    <AppScreen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back 👋</Text>
          <Text style={styles.title}>Smart Parking</Text>
        </View>

        <AppCard
          icon="🅿️"
          title="Find Parking"
          subtitle="Search available parking locations"
          onPress={() => router.push("/(tabs)/parking")}
        />

        <AppCard
          icon="🚗"
          title="My Vehicles"
          subtitle="Manage your registered vehicles"
          onPress={() => router.push("/(tabs)/vehicles")}
        />

        {activeReservation ? (
          <ActiveReservationCard
            reservation={activeReservation}
            remainingTime={remainingTime}
            onCancel={handleCancelReservation}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
            isParked={activeReservation?.status === "parked" || parkingSessionId !== null}
          />
        ) : (
          <AppCard
            icon="⏱️"
            title="Active Reservation"
            subtitle="No active reservation yet"
          />
        )}

        <AppButton
          title="View Reservation History"
          onPress={() => router.push("/reservations" as any)}
          style={{ marginTop: 8 }}
        />

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 24,
    marginBottom: 28,
  },
  greeting: {
    fontSize: 16,
    color: "#64748B",
    marginBottom: 6,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0F172A",
  },
  logoutButton: {
    marginTop: 16,
    paddingVertical: 14,
  },
  logoutText: {
    color: "#DC2626",
    textAlign: "center",
    fontWeight: "700",
  },
  vehicle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },

  plate: {
    fontSize: 16,
    color: "#2563EB",
    marginTop: 4,
  },

  location: {
    marginTop: 16,
    fontSize: 15,
    color: "#475569",
  },

  spot: {
    marginTop: 6,
    fontSize: 15,
    color: "#475569",
  },
});