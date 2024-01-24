import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

export default function ProductItems({ item, index }) {
  const dispatch = useDispatch();
  const [addCart, setAddCart] = useState(false);
  const { cart } = useSelector((state) => state.cart);

  const addItemToCart = (item) => {
    try {
      setAddCart(true);
      dispatch(addToCart(item));
      setTimeout(() => {
        setAddCart(false);
      }, 60000);
    } catch (error) {
      console.log("dispatch", error);
    }
  };
  return (
    <Pressable key={index} className=" mx-auto mt-5">
      <Image
        style={{ width: 150, height: 150, resizeMode: "contain" }}
        source={{ uri: item.image }}
      />
      <Text numberOfLines={1} className=" w-[150px]">
        {item?.title}
      </Text>
      <View className=" flex-row items-center justify-between mt-3">
        <Text> ${item?.price} </Text>
        <Text className="font-bold text-sm text-yellow-400">
          {item?.rating?.rate} ratings
        </Text>
      </View>
      <Pressable
        onPress={() => addItemToCart(item)}
        className=" flex-row justify-center items-center  bg-yellow-500 rounded-full p-2 mt-2">
        {addCart ? <Text>Added to Cart</Text> : <Text>Add to Cart</Text>}
      </Pressable>
    </Pressable>
  );
}
