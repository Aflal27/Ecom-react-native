import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const { userId } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/user/getuser/${userId}`
        );
        setUserData(data);
      } catch (error) {
        console.log("user", error);
      }
    };
    fetchData();
  }, []);
  return (
    <View className="bg-blue-400 w-full h-[120]">
      <SafeAreaView className="flex-row items-center justify-between">
        <Text className=" text-2xl font-bold ml-3">AFL-Ecom</Text>
        <View className="flex-row items-center gap-2 mr-3">
          <AntDesign name="search1" size={24} color="black" />
          <AntDesign name="bells" size={24} color="black" />
        </View>
      </SafeAreaView>
      <View className="p-3">
        <Text className=" text-xl font-semibold ">
          Welcome <Text className=" text-2xl font-bold">{userData?.name}</Text>
        </Text>
      </View>
      <View className="flex-row items-center justify-between mx-4">
        <View className=" bg-slate-300 w-[150] p-2 rounded-full">
          <Text className=" text-center text-lg font-semibold">Your Order</Text>
        </View>
        <View className=" bg-slate-300 w-[150] p-2 rounded-full">
          <Text className=" text-center text-lg font-semibold">
            Your Account
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between mx-4 mt-8">
        <View className=" bg-slate-300 w-[150] p-2 rounded-full">
          <Text className=" text-center text-lg font-semibold">Buy Again</Text>
        </View>
        <Pressable
          onPress={logout}
          className=" bg-slate-300 w-[150] p-2 rounded-full">
          <Text className=" text-center text-lg font-semibold">Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}
