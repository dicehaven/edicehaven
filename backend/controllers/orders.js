import mongoose from 'mongoose'; // Ensure you have mongoose imported to use transactions
import CartModel from "../models/cart.js";
import OrderModel from "../models/order.js";

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
      status: "toDeliver",
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
    console.log('errr', err);

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

export { postCompleteOrderAndPayment };
