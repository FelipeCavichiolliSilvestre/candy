import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Link } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { register, selectAuthStatus } from "../features/auth/auth-slice";
import { AppDispatch } from "../features/store";

export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();

  const dispatch: AppDispatch = useDispatch();
  const status = useSelector(selectAuthStatus);

  async function onRegisterButtonPress() {
    await dispatch(
      register({ username, email, phoneNumber, password }),
    ).unwrap();
  }

  return (
    <Surface style={styles.surface}>
      <View style={styles.iconContainer}>
        <Avatar.Icon size={58} icon="lock-outline" />
      </View>

      <Text style={styles.title}>Registrar-se</Text>

      <TextInput
        mode="outlined"
        label="Nome"
        value={username}
        onChangeText={text => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Celular"
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Senha"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
      />

      <Link to="/Login" style={styles.link}>
        <Text
          style={{
            color: theme.colors.primary,
            textDecorationLine: "underline",
          }}>
          Já possui uma conta?
        </Text>
      </Link>

      <Button
        onPress={onRegisterButtonPress}
        style={styles.button}
        mode="contained"
        disabled={status === "authenticating"}
        loading={status === "authenticating"}>
        Registrar-se
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
