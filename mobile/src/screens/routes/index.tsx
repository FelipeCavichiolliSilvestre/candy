import React, { useEffect } from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { Icon, Text } from "react-native-paper";
import { AppDispatch } from "../../features/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedUser,
  selectAuthStatus,
} from "../../features/auth/auth-slice";

import SplashScreen from "../SplashScreen";
import AuthRoutes from "./AuthRoutes";
import ProfileScreen from "../ProfileScreen";

const Tab = createMaterialBottomTabNavigator();

const Products = () => <Text>Products</Text>;
const Orders = () => <Text>Orders</Text>;
const Cart = () => <Text>Cart</Text>;

export default function Routes() {
  const status = useSelector(selectAuthStatus);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (status === "pending") {
      dispatch(fetchLoggedUser());
    }
  }, [dispatch, status]);

  if (status === "pending" || status === "disconnecting") {
    return <SplashScreen />;
  }

  if (status !== "authenticated") {
    return <AuthRoutes />;
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Products" component={Products} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icon source="account" color={color} size={26} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
