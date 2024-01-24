import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    try {
      const token = AsyncStorage.getItem("authToken");
      console.log(token);
      if (token) {
        navigation.replace("main");
      }
    } catch (error) {
      console.log("err message ", error);
    }
  }, []);

  const handleLogin = async () => {
    try {
      await axios
        .post("http://localhost:8000/api/user/login", {
          email,
          password,
        })
        .then((res) => {
          const token = res.data;
          AsyncStorage.setItem("authToken", token);
          navigation.navigate("main");
        });
    } catch (error) {
      Alert.alert("Login Error", "please check");
    }
  };
  return (
    <SafeAreaView className="flex-1 items-center">
      <View className="mt-10">
        <Text className=" text-4xl font-bold">AFL-e-com</Text>
        <Text className=" text-lg font-semibold mt-10">
          Login in to your Account
        </Text>
      </View>

      {/* input feilds */}
      <View className="">
        <View className="mt-20 flex-row items-center space-x-2 bg-slate-300 w-[400px] p-3 rounded-lg">
          <Entypo name="mail" size={24} color="black" />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
            className=" text-sm"
          />
        </View>
        <View className="mt-10 flex-row items-center space-x-2 bg-slate-300 w-[400px] p-3 rounded-lg">
          <AntDesign name="lock" size={24} color="black" />
          <TextInput
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            placeholder="Enter your password"
            className=" text-sm"
          />
        </View>
      </View>
      <View className=" text-lg font-semibold flex-row items-center space-x-20 mt-[50px] p-5">
        <Text>Keep me logged in</Text>
        <Text className=" text-blue-500">Forget Password</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={handleLogin}
          className=" bg-blue-500 w-[150px] p-3 mt-[100px] rounded-lg">
          <Text className=" text-center text-white text-lg font-semibold">
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <Pressable
        onPress={() => navigation.navigate("register")}
        className=" mt-4">
        <Text className=" text-sm text-gray-600">
          Don't have an account? Sign Up
        </Text>
      </Pressable>
    </SafeAreaView>
    // <SafeAreaView>
    //   <View className=" flex items-center justify-center">
    //     <View className="mt-10">
    //       <Text className=" text-4xl font-bold">AFL-e-com</Text>
    //       <Text className=" text-lg font-semibold mt-10">
    //         Login in to your Account
    //       </Text>
    //     </View>
    //     {/* input feild */}
    //     <View className=" flex-col items-center gap-10 mt-[100px]">
    //       <View className=" flex-row items-center rounded-lg space-x-3 w-[300px] bg-slate-300 p-2 ">
    //         <Entypo name="mail" size={24} color="black" />
    //         <TextInput placeholder="Enter your email" />
    //       </View>
    //       <View className=" flex-row items-center rounded-lg space-x-3 w-[300px] bg-slate-300 p-2 ">
    //         <AntDesign name="lock" size={24} color="black" />
    //         <TextInput secureTextEntry={true} placeholder="Enter your email" />
    //       </View>
    //     </View>

    //     <View className="  font-semibold flex-row items-center gap-[150px] p-5">
    //       <Text>Keep me logged in</Text>
    //       <Text className=" text-blue-500">Forget Password</Text>
    //     </View>
    //   </View>
    // </SafeAreaView>
  );
}
