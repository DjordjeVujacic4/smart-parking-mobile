import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";

import { Pressable } from "react-native";
import { AppScreen } from "../../src/components/screen/AppScreen";
import { VehicleForm } from "../../src/components/vehicle/VehicleForm";
import {
    editVehicle,
    fetchVehicle,
    removeVehicle,
} from "../../src/services/vehicle.service";
import { UpdateVehicleDto, Vehicle } from "../../src/types/vehicle";


export default function EditVehicleScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadVehicle();
    }, []);

    async function loadVehicle() {
        try {
            const data = await fetchVehicle(Number(id));
            setVehicle(data);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(data: UpdateVehicleDto) {
        await editVehicle(Number(id), data);
        router.back();
    }
    async function handleDelete() {
        await removeVehicle(Number(id));
        router.back();
    }

    if (loading) {
        return (
            <AppScreen>
                <ActivityIndicator />
            </AppScreen>
        );
    }

    if (!vehicle) {
        return (
            <AppScreen>
                <Text>Vehicle not found.</Text>
            </AppScreen>
        );
    }

    return (
        <AppScreen>
            <Text style={styles.title}>Edit Vehicle</Text>

            <VehicleForm
                initialValues={vehicle}
                buttonTitle="Update Vehicle"
                onSubmit={handleSubmit}
            />
            <Pressable style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteText}>Delete Vehicle</Text>
            </Pressable>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: "#0F172A",
        marginTop: 24,
        marginBottom: 24,
    },
    deleteButton: {
        marginTop: 24,
        alignItems: "center",
    },

    deleteText: {
        color: "#DC2626",
        fontWeight: "700",
        fontSize: 16,
    },
});