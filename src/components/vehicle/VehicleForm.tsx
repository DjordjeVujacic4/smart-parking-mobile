import { useState } from "react";
import { StyleSheet, Text } from "react-native";

import { AppButton } from "../button/AppButton";
import { AppInput } from "../input/AppInput";

interface VehicleFormProps {
  initialValues?: {
    license_plate: string;
    make: string;
    model: string;
  };

  buttonTitle: string;

  loading?: boolean;

  onSubmit: (data: {
    license_plate: string;
    make: string;
    model: string;
  }) => Promise<void>;
}

export function VehicleForm({
  initialValues,
  buttonTitle,
  loading = false,
  onSubmit,
}: VehicleFormProps) {
  const [licensePlate, setLicensePlate] = useState(
    initialValues?.license_plate ?? ""
  );

  const [make, setMake] = useState(
    initialValues?.make ?? ""
  );

  const [model, setModel] = useState(
    initialValues?.model ?? ""
  );

  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");

    if (!licensePlate || !make || !model) {
      setError("Please fill in all fields.");
      return;
    }

    await onSubmit({
      license_plate: licensePlate,
      make,
      model,
    });
  }

  return (
    <>
      <AppInput
        label="License Plate"
        value={licensePlate}
        onChangeText={setLicensePlate}
        autoCapitalize="characters"
      />

      <AppInput
        label="Make"
        value={make}
        onChangeText={setMake}
      />

      <AppInput
        label="Model"
        value={model}
        onChangeText={setModel}
      />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      <AppButton
        title={buttonTitle}
        loading={loading}
        onPress={handleSubmit}
      />
    </>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "#DC2626",
    marginBottom: 12,
    textAlign: "center",
    fontWeight: "600",
  },
});