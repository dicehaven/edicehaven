import { isAuthenticated, isAdmin } from "../helpers/auth.js";
import { getOrders, postCompleteOrderAndPayment, deleteOrder, updateStatus } from "../controllers/orders.js";

const orders = (router) => {
  // Add/Modifiy product to/in cart
  router.get("/orders", isAuthenticated(), isAdmin(), getOrders());
  router.post("/orders", isAuthenticated(), isAdmin(), postCompleteOrderAndPayment());
  router.put('/orders/:orderId/updateStatus', isAuthenticated(), isAdmin(), updateStatus())
  router.delete("/orders/:id", isAuthenticated(), isAdmin(), deleteOrder());
}


export default orders;