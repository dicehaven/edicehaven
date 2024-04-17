import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import PageHeader from "../components/PageHeader";
import { getUserId, getUserToken } from "../helpers/auth";
import { useLocation, useNavigate } from "react-router-dom"
import BASE_URL from '../config/index.ts'; 

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCreateOrder = (data, actions) => {
    // Creation of order to be paid and sent to the PayPal API
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: location.state.cartTotals.toString(),
          },
        },
      ],
    });
  };

  const handleApprovePayment = async (data, actions) => {
    // Creation of orders when payment is approved
    const { orderID, payerID, paymentID, paymentSource } = data;
    try {
      const response = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getUserToken()}`
        },
        body: JSON.stringify({
          orderId: orderID,
          payerId: payerID,
          paymentId: paymentID,
          paymentSource,
          totalPaid: location.state.cartTotals.toString(),
          userId: getUserId()
        })
      });

      const data = await response.json();
      if (data && data.success) {
        alert("Your order has been paid!");
        navigate("/", { replace: true })
      } else {
        throw new Error(data.message)
      }
    } catch (err) {
      console.log("This is the error", err);
      alert("Your order has been paid, but we have an issue with saving your order in our servers. You'll see your orders promptly")
    }
  };

  const handlePaymentError = (error) => {
    // Handle payment error
    console.error("An error occurred during payment:", error);
    alert("An error occurred during payment. Please try again later.");
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id": "AeKXJa2-zP8ct6wxzlNDr_kvurbYZe--rMJR1qRbEgX8Wx5EE_gjJm78JXAXzTCkTDsOuSpBTnqJxxPP",
        "currency": "CAD",
      }}
    >
      <PageHeader title={"Payment Page"} curPage={"Payment Information"} />
      <h4>Payment Method</h4>
      <PayPalButtons
        createOrder={handleCreateOrder}
        onApprove={handleApprovePayment}
        onError={handlePaymentError}
      />
    </PayPalScriptProvider>
  );
};

export default PaymentPage;
