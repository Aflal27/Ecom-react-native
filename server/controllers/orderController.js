import User from "../models/UserModel.js";
import Order from "../models/orderModel.js";

// order
export const order = async (req, res, next) => {
  try {
    const { userId, cart, select, totel, payment } = req.body;
    console.log(userId, cart, select, totel, payment);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json("user not found");
    }

    const products = cart.map((item) => ({
      name: item?.title,
      quantity: item?.quantity,
      price: item?.price,
      image: item?.image,
    }));

    const order = new Order({
      user: userId,
      products: products,
      totelPrice: totel,
      shippingAddress: select,
      paymentMethod: payment,
    });
    await order.save();

    res.status(200).json("order created successfully!");
  } catch (error) {
    next(error);
    console.log(error);
  }
};

// get order
export const getOrder = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId });
    if (!orders || orders.length === 0) {
      return res.status(404).json("No Order found for this user");
    }
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
