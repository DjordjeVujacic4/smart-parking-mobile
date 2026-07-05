import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { ParkingSpotCard } from "../../src/components/parking/ParkingSpotCard";
import { AppScreen } from "../../src/components/screen/AppScreen";
import {
    fetchLocation,
    fetchLocationSpots,
    fetchLocationStatistics,
} from "../../src/services/location.service";
import { Location, LocationStatistics, ParkingSpot } from "../../src/types/location";

export default function LocationDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const [location, setLocation] = useState<Location | null>(null);
    const [statistics, setStatistics] = useState<LocationStatistics | null>(null);
    const [spots, setSpots] = useState<ParkingSpot[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadDetails() {
        try {
            const locationId = Number(id);

            const [locationData, statisticsData, spotsData] = await Promise.all([
                fetchLocation(locationId),
                fetchLocationStatistics(locationId),
                fetchLocationSpots(locationId),
            ]);

            setLocation(locationData);
            setStatistics(statisticsData);
            setSpots(spotsData);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadDetails();
    }, []);

    if (loading) {
        return (
            <AppScreen>
                <ActivityIndicator style={{ marginTop: 40 }} />
            </AppScreen>
        );
    }

    if (!location) {
        return (
            <AppScreen>
                <Text>Location not found.</Text>
            </AppScreen>
        );
    }

    return (
        <AppScreen>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>{location.name}</Text>
                <Text style={styles.address}>{location.address}</Text>

                {statistics && (
                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>{statistics.total_spots}</Text>
                            <Text style={styles.statLabel}>Total</Text>
                        </View>

                        <View style={styles.statCard}>
                            <Text style={styles.available}>{statistics.available_spots}</Text>
                            <Text style={styles.statLabel}>Available</Text>
                        </View>

                        <View style={styles.statCard}>
                            <Text style={styles.occupied}>{statistics.occupied_spots}</Text>
                            <Text style={styles.statLabel}>Occupied</Text>
                        </View>
                    </View>
                )}

                <Text style={styles.sectionTitle}>Parking spots</Text>

                {spots.map((spot) => (
                    <ParkingSpotCard
                        key={spot.id}
                        spotNumber={spot.spot_number}
                        status={spot.status}
                        onPress={() => {
                            if (spot.status !== "available") return;

                            router.push({
                                pathname: "/reservations/create" as any,
                                params: {
                                    spotId: String(spot.id),
                                    locationId: String(id),
                                },
                            });
                        }}
                    />
                ))}
            </ScrollView>
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
    address: {
        color: "#64748B",
        marginTop: 6,
        marginBottom: 24,
    },
    statsRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 28,
    },
    statCard: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 16,
        alignItems: "center",
    },
    statNumber: {
        fontSize: 24,
        fontWeight: "800",
        color: "#0F172A",
    },
    available: {
        fontSize: 24,
        fontWeight: "800",
        color: "#16A34A",
    },
    occupied: {
        fontSize: 24,
        fontWeight: "800",
        color: "#DC2626",
    },
    statLabel: {
        marginTop: 4,
        color: "#64748B",
        fontSize: 13,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: "#0F172A",
        marginBottom: 14,
    },
});