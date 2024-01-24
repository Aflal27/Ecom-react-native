import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { UserType } from "../../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { userSuccess } from "../../redux/userSlice";

export default function Address() {
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [streat, setStreat] = useState("");
  const [landMark, setLandMark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
      dispatch(userSuccess(userId));
    };

    fetchUser();
  }, []);
  const handleAddress = () => {
    try {
      const address = {
        name,
        mobileNo,
        houseNo,
        streat,
        landMark,
        postalCode,
      };
      axios
        .post("http://localhost:8000/api/user/address", { userId, address })
        .then((res) => {
          Alert.alert("Success", "Addresses added successfully");
          setName("");
          setMobileNo("");
          setHouseNo("");
          setLandMark("");
          setHouseNo("");
          setPostalCode("");
        });

      setTimeout(() => {
        navigation.goBack();
      }, 500);
    } catch (error) {
      Alert.alert("Error", "Failed to add address");
      console.log("address", error);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="bg-blue-400 p-8"></View>

        <View className="m-4 ">
          <Text className=" font-bold text-lg mb-2">Add a new Address</Text>
          <TextInput
            placeholder="srilanka"
            className=" border border-gray-400 p-3 w-[400] rounded-md"
          />
        </View>

        <View className="m-4 ">
          <Text className=" font-bold text-lg mb-2">
            Full Name (First and Last name)
          </Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Enter your name"
            className=" border border-gray-400 p-3 w-[400] rounded-md"
          />
        </View>

        <View className="m-4 ">
          <Text className=" font-bold text-lg mb-2">Mobile Number</Text>
          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            placeholder="Mobile No"
            keyboardType="numeric"
            className=" border border-gray-400 p-3 w-[400] rounded-md"
          />
        </View>

        <View className="m-4 ">
          <Text className=" font-bold text-lg mb-2">
            Flat,House No,Building,Company
          </Text>
          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            placeholder=""
            className=" border border-gray-400 p-3 w-[400] rounded-md"
          />
        </View>

        <View className="m-4 ">
          <Text className=" font-bold text-lg mb-2">
            Area,Streat,Sector,Village
          </Text>
          <TextInput
            value={streat}
            onChangeText={(text) => setStreat(text)}
            placeholder="srilanka"
            className=" border border-gray-400 p-3 w-[400] rounded-md"
          />
        </View>

        <View className="m-4 ">
          <Text className=" font-bold text-lg mb-2">Landmark</Text>
          <TextInput
            value={landMark}
            onChangeText={(text) => setLandMark(text)}
            placeholder="Eg:- Eravur Clock Tower"
            className=" border border-gray-400 p-3 w-[400] rounded-md"
          />
        </View>

        <View className="m-4 ">
          <Text className=" font-bold text-lg mb-2">Pincode</Text>
          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            placeholder="Enter pincode"
            className=" border border-gray-400 p-3 w-[400] rounded-md"
          />
        </View>

        <Pressable
          onPress={handleAddress}
          className=" bg-yellow-500 p-4 rounded-lg m-4  ">
          <Text className=" text-center font-bold text-lg">Add Address</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
