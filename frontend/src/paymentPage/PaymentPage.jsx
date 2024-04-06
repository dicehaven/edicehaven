import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import PageHeader from "../components/PageHeader";

const PaymentPage = () => {
  // Callback function triggered when the order is created
  const handleCreateOrder = (data, actions) => {
    // Perform any necessary actions to create the order
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "10.00",
          },
        },
      ],
    });
  };

  // Callback function triggered when the payment is approved
  const handleApprovePayment = (data, actions) => {
    // Perform any necessary actions when the payment is approved
    alert("Your order has been paid!");
  };

  // Callback function triggered when an error occurs during payment processing
  const handlePaymentError = (error) => {
    // Handle payment error
    console.error("An error occurred during payment:", error);
    alert("An error occurred during payment. Please try again later.");
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AeKXJa2-zP8ct6wxzlNDr_kvurbYZe--rMJR1qRbEgX8Wx5EE_gjJm78JXAXzTCkTDsOuSpBTnqJxxPP",
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
