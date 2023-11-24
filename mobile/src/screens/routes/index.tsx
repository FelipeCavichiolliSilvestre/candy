import React from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { Text } from "react-native-paper";
import SplashScreen from "../SplashScreen";
import AuthRoutes from "./AuthRoutes";

const Tab = createMaterialBottomTabNavigator();

const Products = () => <Text>Products</Text>;
const Orders = () => <Text>Orders</Text>;
const Cart = () => <Text>Cart</Text>;

export default function Routes() {
  const isLoading = false;
  const isAuthenticated = true;

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return <AuthRoutes />;
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Products" component={Products} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
}
