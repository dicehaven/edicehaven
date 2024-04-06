import { postCompleteOrderAndPayment } from "../controllers/orders.js";

const orders = (router) => {
  // Add/Modifiy product to/in cart
  router.post("/orders", postCompleteOrderAndPayment());
}


export default orders;