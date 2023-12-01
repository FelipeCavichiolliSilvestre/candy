import React, { useState } from "react";
import {
  Avatar,
  Button,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login, selectAuthStatus } from "../features/auth/auth-slice";
import { AppDispatch } from "../features/store";
import { Link } from "@react-navigation/native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();

  const dispatch: AppDispatch = useDispatch();
  const isAuthenticating = useSelector(selectAuthStatus) === "authenticating";

  async function onLoginButtonPress() {
    await dispatch(login({ email, password })).unwrap();
  }

  return (
    <Surface mode="flat" style={styles.surface}>
      <View style={styles.iconContainer}>
        <Avatar.Icon size={58} icon="lock-outline" />
      </View>

      <Text style={styles.title}>Entrar</Text>

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        mode="outlined"
        label="Senha"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
      />

      <Link to="/SignUp" style={styles.link}>
        <Text
          style={{
            color: theme.colors.primary,
            textDecorationLine: "underline",
          }}>
          Não possui uma conta?
        </Text>
      </Link>

      <Button
        mode="contained"
        loading={isAuthenticating}
        disabled={isAuthenticating}
        onPress={onLoginButtonPress}
        style={styles.button}>
        Entrar
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 16,
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  },
  link: {
    alignSelf: "flex-end",
  },
});
