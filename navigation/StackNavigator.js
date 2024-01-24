import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../src/screens/Login";
import Register from "../src/screens/Register";
import Home from "../src/screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import ProductInfo from "../src/screens/ProductInfo";
import AddAdress from "../src/screens/AddAdress";
import Address from "../src/screens/Address";
import Profile from "../src/screens/Profile";
import Cart from "../src/screens/Cart";
import Confirmation from "../src/screens/Confirmation";
import OrderScreen from "../src/screens/OrderScreen";

export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#008E97" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome name="user" size={24} color="#008E97" />
              ) : (
                <FontAwesome name="user-o" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="cart"
          component={Cart}
          options={{
            tabBarLabel: "Cart",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="shoppingcart" size={24} color="#008E97" />
              ) : (
                <AntDesign name="shoppingcart" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="main" component={BottomTabs} />
        <Stack.Screen name="info" component={ProductInfo} />
        <Stack.Screen name="address" component={AddAdress} />
        <Stack.Screen name="add" component={Address} />
        <Stack.Screen name="confirm" component={Confirmation} />
        <Stack.Screen name="order" component={OrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
