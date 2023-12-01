import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../LoginScreen";
import SignUpScreen from "../SignUpScreen";

const Stack = createStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
