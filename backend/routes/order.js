import { isAuthenticated, isAdmin } from "../helpers/auth.js";
import { getOrders, postCompleteOrderAndPayment, deleteOrder, updateStatus } from "../controllers/orders.js";

const orders = (router) => {
  // get all orders
  router.get("/orders", isAuthenticated(), isAdmin(), getOrders());

  // create a new order
  router.post("/orders", isAuthenticated(), postCompleteOrderAndPayment());

  // updates order status by order Id
  router.put('/orders/:orderId/updateStatus', isAuthenticated(), isAdmin(), updateStatus())

  // Deletes orders by order id
  router.delete("/orders/:id", isAuthenticated(), isAdmin(), deleteOrder());
}


export default orders;