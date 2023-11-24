import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../LoginScreen";
import SignUpScreen from "../SignUpScreen";

const Stack = createStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: "Sign Up" }}
      />
    </Stack.Navigator>
  );
}
