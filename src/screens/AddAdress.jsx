import { View, Text, Pressable, TextInput, SafeAreaView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";

export default function AddAdress() {
  const navigation = useNavigation();
  const { userId } = useSelector((state) => state.user);
  const [address, setAddress] = useState([]);
  console.log(userId);

  useEffect(() => {
    fetchAddress();
  }, []);
  const fetchAddress = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/user/address/${userId}`
      );
      setAddress(data);
    } catch (error) {
      console.log("getAddress", error);
    }
  };

  //refresh the addresses when the component comes to the focus ie basically when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddress();
    }, [])
  );

  return (
    <SafeAreaView>
      <View className=" bg-blue-400 p-5 ">
        <Pressable className="  flex-row justify-between items-center space-x-3  ">
          <View className=" flex-1 flex-row space-x-3 bg-white p-2 rounded-lg">
            <EvilIcons name="search" size={24} color="black" />
            <TextInput placeholder="Search Products" />
          </View>
          <Feather name="mic" size={24} color="black" />
        </Pressable>
      </View>
      <View className=" m-5">
        <Text className=" font-bold text-xl">Your Address</Text>
        <Pressable
          onPress={() => navigation.navigate("add")}
          className=" flex-row items-center justify-between mt-5">
          <Text>Add a new Address </Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <Pressable>
          {address?.map((item) => (
            <Pressable className=" flex-col gap-1 justify-center border border-gray-300 p-1 mt-5">
              <View className="flex-row items-center gap-3">
                <Text className=" font-bold text-lg">{item.name}</Text>
                <Entypo name="location-pin" size={24} color="red" />
              </View>
              <Text>
                #{item.houseNo} , {item.landMark}
              </Text>
              <Text>{item.streat}</Text>
              <Text>Mobile No : {item.mobileNo}</Text>
              <Text>pin code : {item.postalCode}</Text>

              <View className=" flex-row items-center space-x-2  ">
                <Pressable className="bg-slate-200 rounded-lg mt-2">
                  <Text className="p-2 uppercase font-semibold">Edit</Text>
                </Pressable>
                <Pressable className="bg-slate-200 rounded-lg mt-2">
                  <Text className="p-2 uppercase font-semibold">Remove</Text>
                </Pressable>
                <Pressable className="bg-slate-200 rounded-lg mt-2">
                  <Text className="p-2 uppercase font-semibold">
                    set as default
                  </Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
