import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleResister = async () => {
    try {
      await axios
        .post(`http://localhost:8000/api/user/register`, {
          name,
          email,
          password,
        })
        .then((res) => {
          Alert.alert(
            "Register Successfully!",
            "you have register successfully"
          );
          setEmail("");
          setName("");
          setPassword("");
        });
    } catch (error) {
      console.log("regsiter error ", error);
    }
  };
  return (
    <SafeAreaView className="flex-1 items-center">
      <View className="mt-10">
        <Text className=" text-4xl font-bold">AFL-e-com</Text>
        <Text className=" text-lg font-semibold mt-10">
          Register to your Account
        </Text>
      </View>

      {/* input feilds */}
      <View className=" flex-col gap-10 items-center mt-10">
        <View className=" flex-row items-center space-x-2 bg-slate-300 w-[400px] p-3 rounded-lg">
          <FontAwesome name="user-o" size={24} color="black" />
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Enter your name"
            className=" text-sm"
          />
        </View>
        <View className=" flex-row items-center space-x-2 bg-slate-300 w-[400px] p-3 rounded-lg">
          <Entypo name="mail" size={24} color="black" />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="enter your Email"
          />
        </View>

        <View className=" flex-row items-center space-x-2 bg-slate-300 w-[400px] p-3 rounded-lg">
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
          onPress={handleResister}
          className=" bg-blue-500 w-[150px] p-3 mt-[100px] rounded-lg">
          <Text className=" uppercase text-center text-white text-lg font-semibold">
            register
          </Text>
        </TouchableOpacity>
      </View>

      <Pressable onPress={() => navigation.goBack()} className=" mt-4">
        <Text className=" text-sm text-gray-600">
          Don't have an account? Sign Up
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
