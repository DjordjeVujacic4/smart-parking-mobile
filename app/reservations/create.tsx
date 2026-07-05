import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";

import { AppButton } from "../../src/components/button/AppButton";
import { AppScreen } from "../../src/components/screen/AppScreen";
import { addReservation } from "../../src/services/reservation.service";
import { fetchVehicles } from "../../src/services/vehicle.service";
import { Vehicle } from "../../src/types/vehicle";


export default function CreateReservationScreen() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const { spotId, locationId } = useLocalSearchParams<{
        spotId: string;
        locationId: string;
    }>();

    useEffect(() => {
        loadVehicles();
    }, []);

    async function loadVehicles() {
        const data = await fetchVehicles();

        setVehicles(data);

        if (data.length > 0) {
            setSelectedVehicleId(data[0].id);
        }
    }

    async function handleReserve() {
        if (!selectedVehicleId) {
            Alert.alert("Please select a vehicle.");
            return;
        }

        try {
            setLoading(true);

            await addReservation({
                vehicle_id: selectedVehicleId,
                spot_id: Number(spotId),
            });

            Alert.alert("Reservation created successfully.");

            router.replace("/(tabs)");
        } finally {
            setLoading(false);
        }
    }


    return (
        <AppScreen>
            <Text style={styles.title}>Reserve Spot</Text>
            <Text style={styles.subtitle}>Choose vehicle for this reservation</Text>

            {vehicles.map((vehicle) => (
                <Text
                    key={vehicle.id}
                    style={[
                        styles.vehicleCard,
                        selectedVehicleId === vehicle.id && styles.selectedVehicle,
                    ]}
                    onPress={() => setSelectedVehicleId(vehicle.id)}
                >
                    {vehicle.license_plate} - {vehicle.make} {vehicle.model}
                </Text>
            ))}

            <AppButton
                title="Reserve Spot"
                loading={loading}
                onPress={handleReserve}
            />
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
    vehicleCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 18,
        marginBottom: 12,
        fontSize: 16,
        fontWeight: "600",
        color: "#0F172A",
    },
    selectedVehicle: {
        borderWidth: 2,
        borderColor: "#2563EB",
    },
});