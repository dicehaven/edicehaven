import mongoose from 'mongoose';
import CartModel from "../models/cart.js";
import OrderModel from "../models/order.js";
import ProductModel from "../models/product.js";

const getOrders = () => async (req, res) => {
  try {
    const orders = await OrderModel.find().populate('user');

    return res.status(200).json(
      {
        success: true,
        message: "Orders found successfully",
        orders
      }
    );

  } catch (error) {
    console.log(error);
  }
}


const postCompleteOrderAndPayment = () => async (req, res) => {
  // Start a session
  const session = await mongoose.startSession();
  try {
    // Start a transaction
    session.startTransaction();

    // Get Cart Details from userId
    const cartDetails = await CartModel.find({ user: { _id: req.body.userId } }).session(session);

    // Create a new order with the cart details
    const newOrder = new OrderModel({
      ...req.body,
      user: userId,
      status: "Processing",
      totalPaid: req.body.totalPaid,
      orderDetails: cartDetails[0].items.map((elem) => ({
        quantity: elem.quantity,
        price: elem.price,
        product: elem.product,
      }))
    });

    // Adding the order total discount
    newOrder.orderTotalDiscount = cartDetails.discount;
    const savedOrder = await newOrder.save({ session });

    // Reduce amount quantity per product
    const promisesToResolve = []
    for (const item of cartDetails[0].items) {
      promisesToResolve.push(
        ProductModel.updateOne(
          { _id: item.product },
          { $inc: { stock: -item.quantity } }
        ).session(session));
    }

    await Promise.all(promisesToResolve);

    // If the order is saved successfully, delete the user's cart
    await CartModel.updateOne({ user: { _id: req.body.userId } }, { items: [] }).session(session);

    // Commit the transaction
    await session.commitTransaction();

    // Return a success response
    return res.status(201).json({
      success: true,
      message: "Order created and cart cleared successfully",
      order: savedOrder
    });
  } catch (err) {
    // Abort the transaction if there's a failure
    await session.abortTransaction();

    // Return an error response
    return res.status(500).json({
      success: false,
      message: err.message
    });
  } finally {
    // End the session
    session.endSession();
  }
};

const deleteOrder = () => async (req, res) => {
  try {
    await OrderModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Order has been deleted...",
      success: true
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: true
    });
  }
}

const updateStatus = () => async (req, res) => {
  const { orderId } = req.params; // Assuming the parameter is named 'orderId'
  const { status } = req.body;

  try {
    // Find the order by ID and update its status
    const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, { status }, { new: true });

    // Return a success response
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export { getOrders, postCompleteOrderAndPayment, deleteOrder, updateStatus };
