import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { cleanCart } from "../../redux/cartSlice";

export default function Confirmation() {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order summary" },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [address, setAddress] = useState([]);
  const [select, setSelect] = useState(null);
  const { userId } = useSelector((state) => state.user);
  const { totel, cart } = useSelector((state) => state.cart);
  const [secoundSelect, setSecoundSelect] = useState(false);
  const [paymentSelect, setPaymentSelect] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleOrder = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/order/sendorder`,
        {
          userId,
          cart,
          select,
          totel,
          payment: paymentSelect,
        }
      );

      if (data === "order created successfully!") {
        dispatch(cleanCart());
        navigation.navigate("order");
      }
    } catch (error) {
      console.log("order", error);
    }
  };

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

  return (
    <ScrollView className="mt-[60]">
      <View className=" flex-row items-center justify-around">
        {steps?.map((item, index) => (
          <>
            <View>
              <View
                onPress={() => setCurrentIndex(index)}
                className={`bg-gray-300 w-12 h-12 rounded-full flex-row items-center justify-center ${
                  index < currentIndex && "bg-green-700"
                }`}>
                {index < currentIndex ? (
                  <Ionicons name="checkmark" size={24} color="white" />
                ) : (
                  <Text className="text-lg">{index + 1}</Text>
                )}
              </View>
              <View>
                <Text>{item.title}</Text>
              </View>
            </View>
          </>
        ))}
      </View>
      {currentIndex == 0 && (
        <View>
          <Text className=" text-xl font-bold mt-5 p-2">
            Select Delivery Address
          </Text>
          {
            <Pressable className="  p-5">
              {address?.map((item) => (
                <Pressable className=" flex-col gap-1 justify-center border border-gray-300 p-2 mt-5">
                  {select && select._id === item._id ? (
                    <FontAwesome5 name="dot-circle" size={24} color="green" />
                  ) : (
                    <Entypo
                      onPress={() => setSelect(item)}
                      name="circle"
                      size={24}
                      color="black"
                    />
                  )}
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
                      <Text className="p-2 uppercase font-semibold">
                        Remove
                      </Text>
                    </Pressable>
                    <Pressable className="bg-slate-200 rounded-lg mt-2">
                      <Text className="p-2 uppercase font-semibold">
                        set as default
                      </Text>
                    </Pressable>
                  </View>
                  {select && select._id === item._id && (
                    <Pressable
                      onPress={() => setCurrentIndex(1)}
                      className=" bg-blue-600 p-2 rounded-full">
                      <Text className=" text-white text-center">
                        Deliver to this Address
                      </Text>
                    </Pressable>
                  )}
                </Pressable>
              ))}
            </Pressable>
          }
        </View>
      )}
      {/* step 1 */}
      {currentIndex == 1 && (
        <View className="mt-5 p-2">
          <Text className=" text-xl font-bold">
            Choose your delivery options
          </Text>
          <View className="flex-row items-center gap-3 border border-gray-200 bg-slate-200 mt-4 p-2">
            {secoundSelect && secoundSelect ? (
              <FontAwesome5 name="dot-circle" size={24} color="green" />
            ) : (
              <Entypo
                onPress={() => setSecoundSelect(true)}
                name="circle"
                size={24}
                color="black"
              />
            )}

            <View>
              <Text className="text-green-600 font-semibold">
                Tomorrow by 10Am -
                <Text className="text-black">
                  FREE delivery with your prime membership
                </Text>
              </Text>
            </View>
          </View>
          {secoundSelect && (
            <Pressable
              onPress={() => setCurrentIndex(2)}
              className=" bg-yellow-500 p-2 rounded-full w-[350] mx-auto mt-3">
              <Text className=" text-center">Continue</Text>
            </Pressable>
          )}
        </View>
      )}

      {/* step 2 */}
      {currentIndex == 2 && (
        <View className="mt-4 p-2">
          <Text className=" text-xl font-bold">Select Your Payment Method</Text>
          <View className="bg-slate-200 mt-2 p-3">
            <View className="flex-row items-center gap-3 border border-gray-200 ">
              {paymentSelect === "cash" ? (
                <FontAwesome5 name="dot-circle" size={24} color="green" />
              ) : (
                <Entypo
                  onPress={() => setPaymentSelect("cash")}
                  name="circle"
                  size={24}
                  color="black"
                />
              )}

              <View>
                <Text className="text-black text-lg">Cash On Delivery</Text>
              </View>
            </View>
          </View>
          <View className="bg-slate-200 mt-2 p-3">
            <View className="flex-row items-center gap-3 border border-gray-200 ">
              {paymentSelect === "card" ? (
                <FontAwesome5 name="dot-circle" size={24} color="green" />
              ) : (
                <Entypo
                  onPress={() => setPaymentSelect("card")}
                  name="circle"
                  size={24}
                  color="black"
                />
              )}

              <View>
                <Text className="text-black text-lg">Credit or Debit card</Text>
              </View>
            </View>
          </View>
          {paymentSelect.length > 0 && (
            <Pressable
              onPress={() => setCurrentIndex(3)}
              className=" bg-yellow-500 p-2 rounded-full w-[350] mx-auto mt-3">
              <Text className=" text-center">Continue</Text>
            </Pressable>
          )}
        </View>
      )}

      {/* step 3 */}
      {currentIndex == 3 && (
        <View className="mt-5 p-2">
          <Text className=" text-xl font-bold">Order Now</Text>
          <View className="flex-row items-center justify-between gap-3 border border-gray-200 bg-slate-200 mt-4 p-2">
            <View>
              <Text className=" font-bold text-lg">
                Save 5% and never run out
              </Text>
              <Text className="text-black">Turn on auto deliveries</Text>
            </View>
            <SimpleLineIcons name="arrow-right" size={24} color="black" />
          </View>

          <View className=" border border-gray-200 bg-slate-200 mt-4 p-2">
            <View className="flex-col gap-3 justify-center">
              <Text className=" font-semibold ">
                Shipping to <Text>{select.name}</Text>
              </Text>

              <View className=" flex-row items-center justify-between">
                <Text>Items</Text>
                <Text className=" font-bold">${totel}</Text>
              </View>

              <View className=" flex-row items-center justify-between">
                <Text>Delivery</Text>
                <Text className=" font-bold">${"0"}</Text>
              </View>

              <View className=" flex-row items-center justify-between">
                <Text>Order Totel</Text>
                <Text className=" font-bold text-red-800">${totel}</Text>
              </View>
            </View>
          </View>

          <View className=" border border-gray-200 bg-slate-200 mt-4 p-2">
            <View>
              <Text className="mb-2">Pay with</Text>
              <Text className=" font-bold ">
                Pay on delivery ({paymentSelect})
              </Text>
            </View>
          </View>
          <Pressable
            onPress={handleOrder}
            className=" bg-yellow-500 p-2 rounded-full w-[350] mx-auto mt-3">
            <Text className=" text-center">Place your order</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
