import React from "react";
import { Button, Surface } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../features/store";
import { logout } from "../features/auth/logout";

export default function ProfileScreen() {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Surface mode="flat" style={styles.surface}>
      <Button
        icon="logout"
        onPress={() => dispatch(logout())}
        mode="contained-tonal">
        Log out
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 16,
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
});
