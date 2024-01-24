import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import {
  decrementQuantity,
  incrementQuantity,
  removeCart,
  totelPrice,
} from "../../redux/cartSlice";
import { useNavigation } from "@react-navigation/native";

export default function Cart() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const totel = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  useEffect(() => {
    if (totel) {
      dispatch(totelPrice(totel));
    }
  }, [totel]);

  const incressQty = (item) => {
    dispatch(incrementQuantity(item));
  };

  const decressQty = (item) => {
    dispatch(decrementQuantity(item));
  };

  const deleteCart = (item) => {
    dispatch(removeCart(item));
  };

  return (
    <ScrollView className=" mt-[50]">
      <View className=" bg-blue-400 p-5 mb">
        <Pressable className="  flex-row justify-between items-center space-x-3  ">
          <View className=" flex-1 flex-row space-x-3 bg-white p-2 rounded-lg">
            <EvilIcons name="search" size={24} color="black" />
            <TextInput placeholder="Search Products" />
          </View>
          <Feather name="mic" size={24} color="black" />
        </Pressable>
      </View>

      <View className=" m-2 flex-row items-center">
        <Text className=" text-lg">Subtotal : </Text>
        <Text className=" font-bold text-lg">{totel}</Text>
      </View>
      <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text>
      <Pressable
        disabled={!cart.length}
        onPress={() => {
          navigation.navigate("confirm");
        }}
        className={` bg-yellow-400 w-[350] mx-auto mt-3 rounded-sm ${
          !cart.length && "bg-gray-300"
        }`}>
        <Text className="p-2 text-center">
          Process to Buy ({cart.length}) items
        </Text>
      </Pressable>
      {!cart.length && (
        <Text className="text-rose-600 text-center mt-3">
          Products Not found!
        </Text>
      )}
      <Text
        style={{
          borderColor: "black",
          borderWidth: 0.2,
          height: 1,
          marginTop: 15,
        }}
      />
      <View className=" flex-col gap-5 mt-3 p-3 justify-center ">
        {cart.map((item) => (
          <Pressable className="">
            <View className=" flex-row items-center justify-between ">
              <Image
                source={{ uri: item?.image }}
                style={{ width: 140, height: 140, resizeMode: "contain" }}
              />
              <View>
                <Text numberOfLines={3} className=" w-[150]">
                  {item?.title}
                </Text>
                <Text className=" font-bold text-lg">{item?.price}</Text>
                <Text className=" text-green-600 font-semibold">In Stock</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3 mt-2">
              <Pressable className=" bg-red-500 p-2 rounded-sm">
                {item.quantity > 1 ? (
                  <Pressable onPress={() => decressQty(item)}>
                    <AntDesign name="minus" size={24} color="black" />
                  </Pressable>
                ) : (
                  <Pressable onPress={() => deleteCart(item)}>
                    <AntDesign name="delete" size={24} color="black" />
                  </Pressable>
                )}
              </Pressable>
              <View className=" bg-gray-300 w-10 h-10 flex-row items-center justify-center rounded-full">
                <Text className=" font-semibold text-lg">{item?.quantity}</Text>
              </View>
              <Pressable
                onPress={() => incressQty(item)}
                className=" bg-green-500 p-2 rounded-sm">
                <AntDesign name="plus" size={24} color="black" />
              </Pressable>
              <Pressable
                onPress={() => deleteCart(item)}
                className=" bg-gray-100 border border-gray-300 p-3 rounded-md">
                <Text className=" uppercase font-semibold text-red-500 ">
                  delete
                </Text>
              </Pressable>
            </View>
            <View className="flex-row items-center gap-3 mt-3">
              <Pressable className="  border border-gray-400 p-3 rounded-lg">
                <Text className="  font-semibold">Save For Later</Text>
              </Pressable>
              <Pressable className="  border border-gray-400 p-3 rounded-lg">
                <Text className="  font-semibold">See More Like This</Text>
              </Pressable>
            </View>
            <Text
              style={{
                borderColor: "black",
                borderWidth: 0.2,
                height: 1,
                marginTop: 15,
              }}
            />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
