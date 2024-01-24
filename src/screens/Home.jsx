import {
  View,
  Text,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItems from "../components/ProductItems";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { userSuccess } from "../../redux/userSlice";

export default function Home() {
  const list = [
    {
      id: "0",
      image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
      name: "Home",
    },
    {
      id: "1",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
      name: "Deals",
    },
    {
      id: "3",
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
      name: "Electronics",
    },
    {
      id: "4",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
      name: "Mobiles",
    },
    {
      id: "5",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
      name: "Music",
    },
    {
      id: "6",
      image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
      name: "Fashion",
    },
  ];
  const images = [
    "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
  ];
  const deals = [
    {
      id: "20",
      title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
      oldPrice: 25000,
      price: 19000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
        "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "30",
      title:
        "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
      oldPrice: 74000,
      price: 26000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
      ],
      color: "Cloud Navy",
      size: "8 GB RAM 128GB Storage",
    },
    {
      id: "40",
      title:
        "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
      oldPrice: 16000,
      price: 14000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
      ],
      color: "Icy Silver",
      size: "6 GB RAM 64GB Storage",
    },
    {
      id: "40",
      title:
        "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
      oldPrice: 12999,
      price: 10999,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
      ],
    },
  ];
  const offers = [
    {
      id: "0",
      title:
        "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
      offer: "72% off",
      oldPrice: 7500,
      price: 4500,
      image:
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
      ],
      color: "Green",
      size: "Normal",
    },
    {
      id: "1",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
      ],
      color: "black",
      size: "Normal",
    },
    {
      id: "2",
      title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
      carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
      color: "black",
      size: "Normal",
    },
    {
      id: "3",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 24999,
      price: 19999,
      image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
      ],
      color: "Norway Blue",
      size: "8GB RAM, 128GB Storage",
    },
  ];
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("jewelery");
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState([]);
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);
  const [selectAddress, setSelectAddress] = useState([]);
  console.log(selectAddress);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/user/address/${userId}`
        );
        setAddress(data);
      } catch (error) {
        console.log("getAddress", error);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const fatchData = async () => {
      try {
        const { data } = await axios.get("https://fakestoreapi.com/products");
        setProducts(data);
      } catch (error) {
        console.log("err meg", error);
      }
    };
    fatchData();
  }, []);

  // get token in asyncStorage
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      dispatch(userSuccess(userId));
    };

    fetchUser();
  }, []);

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  return (
    <>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 40 : 0,
          flex: 1,
          backgroundColor: "white",
        }}>
        <ScrollView>
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

          {/* loaction */}
          <Pressable className="mb-2 flex-1">
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              className=" flex-row items-center space-x-1 bg-blue-300 p-3">
              <EvilIcons name="location" size={34} color="black" />
              <View className=" flex-row items-center">
                {selectAddress ? (
                  <Text className="font-semibold text-sm">
                    {selectAddress?.name} - {selectAddress?.streat}
                  </Text>
                ) : (
                  <Text className="font-semibold text-sm">Add a Address</Text>
                )}

                <MaterialIcons name="arrow-drop-down" size={34} color="black" />
              </View>
            </Pressable>
          </Pressable>

          {/* cateogry images */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list?.map((item, index) => (
              <Pressable key={index} className=" m-5 ">
                <Image
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                  source={{ uri: item.image }}
                />
              </Pressable>
            ))}
          </ScrollView>

          {/* slide show */}
          <SliderBox
            images={images}
            autoPlay
            circleLoop
            dotColor={"#13274F"}
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{ width: "100%" }}
          />

          {/* Tranding products */}
          <View className="mt-4">
            <Text className=" text-lg font-bold ml-3">
              Tranding Deals of the week
            </Text>

            <View className="flex-wrap flex-row items-center">
              {deals.map((item, index) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate("info", {
                      id: item?.id,
                      title: item?.title,
                      offer: item?.offer,
                      oldPrice: item?.oldPrice,
                      price: item?.price,
                      image: item?.image,
                      carouselImages: item?.carouselImages,
                      color: item?.color,
                      size: item?.size,
                      item: item,
                    })
                  }
                  key={index}
                  className="">
                  <Image
                    source={{ uri: item?.image }}
                    style={{ width: 200, height: 200, resizeMode: "contain" }}
                  />
                </Pressable>
              ))}
            </View>
            {/* boarder */}
            <Text
              style={{
                borderColor: "black",
                borderWidth: 1,
                height: 1,
                marginTop: 15,
              }}
            />

            <View>
              <Text className="m-3 font-bold text-lg">Today's Delas</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {offers?.map((item, index) => (
                  <Pressable
                    onPress={() =>
                      navigation.navigate("info", {
                        id: item?.id,
                        title: item?.title,
                        offer: item?.offer,
                        oldPrice: item?.oldPrice,
                        price: item?.price,
                        image: item?.image,
                        carouselImages: item?.carouselImages,
                        color: item?.color,
                        size: item?.size,
                        item: item,
                      })
                    }
                    key={index}
                    className="m-3">
                    <Image
                      style={{ width: 150, height: 150, resizeMode: "contain" }}
                      source={{ uri: item.image }}
                    />
                    <View className="bg-red-500 p-2 rounded-lg m-2">
                      <Text className="text-sm text-center font-semibold text-white">
                        Upto {item?.offer}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>

          <Text
            style={{
              borderColor: "black",
              borderWidth: 1,
              height: 1,
              marginTop: 15,
            }}
          />

          {/* drop down menu */}
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: "45%",
              marginBottom: open ? 50 : 15,
            }}>
            <DropDownPicker
              style={{
                borderColor: "#B7B7B7",
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category} //genderValue
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
              onOpen={onGenderOpen}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <View className=" flex-row items-center flex-wrap ">
            {products
              ?.filter((item) => item.category === category)

              .map((item, index) => (
                <ProductItems item={item} key={index} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* modal */}
      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}>
        <ModalContent className="w-full h-[500]">
          <Text className=" font-bold text-lg ">Choose your location</Text>
          <Text className=" mt-2">
            Select a delivery location to see product availabilty and delivery
            options
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* alredy added address */}
            {address?.map((item) => (
              <Pressable
                className={` ${
                  selectAddress === item ? "bg-red-200" : ""
                } mr-3 w-[140] h-[140] border border-gray-400  flex-row items-center justify-center mt-5  `}>
                <Pressable
                  onPress={() => setSelectAddress(item)}
                  className="text-center">
                  <View className="flex-row items-center gap-3">
                    <Text className=" font-bold text-lg">{item.name}</Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>
                  <Text>
                    #{item.houseNo} , {item.landMark}
                  </Text>
                  <Text>{item.streat}</Text>
                </Pressable>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("address");
              }}
              className=" w-[140] h-[140] border border-gray-400  flex-row items-center justify-center mt-5 ">
              <Text className=" text-blue-500 font-semibold p-2">
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View className="mb-[100] flex-col justify-center gap-2 -ml-6">
            <View className="flex-row items-center gap-2">
              <Ionicons name="location-sharp" size={24} color="blue" />
              <Text className=" text-blue-500">Enter an Srilanka pincode</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Ionicons name="locate-sharp" size={24} color="blue" />
              <Text className=" text-blue-500">Use my current location</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <AntDesign name="earth" size={24} color="blue" />
              <Text className=" text-blue-500">Deliver outsite srilanka</Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
}
