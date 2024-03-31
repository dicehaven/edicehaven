import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Table } from "react-bootstrap";
import PageHeader from "../components/PageHeader";

function OrderListScreen() {
  // Define state variables for order details
  const [customerName, setCustomerName] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [orderItems, setOrderItems] = useState([]);

  // Function to handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
  };

  return (
    <div>
      <PageHeader title={"Manage Order"} curPage={"Order Details"} />
      <Form onSubmit={submitHandler} className="m-5">
        {/* Add form fields for order details */}
        <Form.Group controlId="customerName" className="mb-4">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="orderStatus" className="mb-4">
          <Form.Label>Order Status</Form.Label>
          <Form.Control
            as="select"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </Form.Control>
        </Form.Group>

        {/* Table to display order items */}
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button
          type="submit"
          variant="primary"
          style={{
            marginTop: "15px",
            backgroundColor: "#ffc107",
            borderColor: "#ffc107",
            color: "#000",
          }}
          className="btn btn-primary"
        >
          Update Order
        </Button>
      </Form>
    </div>
  );
}

export default OrderListScreen;
