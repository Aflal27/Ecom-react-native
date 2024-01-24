import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

export default function ProductInfo() {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  console.log(cart);
  const [addCart, setAddCart] = useState(false);

  const addItemToCart = (item) => {
    try {
      setAddCart(true);
      dispatch(addToCart(item));
      setTimeout(() => {
        setAddCart(false);
      }, 60000);
    } catch (error) {
      console.log("dispatch ", error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1 mt-14">
      {/* search */}
      <View className=" bg-blue-400 p-5 mb">
        <Pressable className="  flex-row justify-between items-center space-x-3  ">
          <View className=" flex-1 flex-row space-x-3 bg-white p-2 rounded-lg">
            <EvilIcons name="search" size={24} color="black" />
            <TextInput placeholder="Search Products" />
          </View>
          <Feather name="mic" size={24} color="black" />
        </Pressable>
      </View>
      {/* product image */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground
            style={{ width, height, marginTop: 25, resizeMode: "contain" }}
            source={{ uri: item }}
            key={index}>
            <View className=" flex-row items-center justify-between m-5">
              <View className=" bg-red-500 w-12 h-12 rounded-full flex-row justify-center items-center">
                <Text className=" text-white ">20% off</Text>
              </View>
              <View className=" bg-gray-300 w-12 h-12 rounded-full flex-row items-center justify-center">
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
                />
              </View>
            </View>
            <View className=" bg-gray-300 w-12 h-12 rounded-full flex-row items-center justify-center mt-auto ml-5 mb-5">
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
      {/* description */}
      <View className=" flex-col space-y-3 m-3">
        <Text>{route?.params?.title}</Text>
        <Text className=" text-lg font-bold">${route?.params?.price}</Text>
      </View>
      {/* border */}
      <Text
        style={{
          borderColor: "black",
          borderWidth: 0.3,
          height: 1,
          marginTop: 3,
        }}
      />
      <View className=" flex-row items-center mt-5 mb-3 m-2">
        <Text> Color: </Text>
        <Text className=" font-bold">{route?.params?.color}</Text>
      </View>
      <View className=" flex-row items-center m-2">
        <Text> Size: </Text>
        <Text className=" font-bold">{route?.params?.size}</Text>
      </View>
      {/* border */}
      <Text
        style={{
          borderColor: "black",
          borderWidth: 0.3,
          height: 1,
          marginTop: 10,
        }}
      />
      <View className=" flex-row items-center mt-4 m-2">
        <Text> Totel: </Text>
        <Text className=" font-bold">${route?.params?.price}</Text>
      </View>

      <View className=" flex-row items-center space-x-3 mt-5 m-2 ">
        <Ionicons name="location" size={24} color="black" />
        <Text>Deliver to Aflal - Batticaloa 30300</Text>
      </View>

      <Text className=" text-green-700 font-bold m-4">In Stock</Text>

      <Pressable
        onPress={() => addItemToCart(route?.params?.item)}
        className=" flex-1 p-3 bg-yellow-500 rounded-full m-5">
        {addCart ? (
          <Text className=" font-semibold text-center">Added to cart</Text>
        ) : (
          <Text className=" font-semibold text-center">Add to cart</Text>
        )}
      </Pressable>
      <Pressable className=" flex-1 p-3 bg-yellow-600 rounded-full m-5">
        <Text className=" font-semibold text-center">Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
}
