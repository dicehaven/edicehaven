import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Table } from "react-bootstrap";
import PageHeader from "../components/PageHeader";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getUserToken } from "../helpers/auth";

function OrderListScreen() {
  const [orders, setOrders] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getUserToken()}`
          },
        });

        const data = await response.json();

        if (data && data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        alert(err.message);
      }
    };

    getAllOrders();
  }, [fetchAgain]);

  const deleteHandler = async (e, orderId) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${getUserToken()}`
        },
      })

      const data = await response.json();
      if (data && data.success) {
        alert(data.message);
        setFetchAgain((prevState) => !prevState)
      } else {
        alert(data.message);
      }

    } catch (err) {
      alert(err.messasge)
      console.log('this is the error', err);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/updateStatus`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${getUserToken()}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();
      if (data && data.success) {
        alert(data.message);
        setFetchAgain(prevState => !prevState);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <PageHeader title={"List Of Orders"} curPage={"List Of Orders"} />
      <h4>Orders</h4>
      {orders.length > 0 ? (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>CUSTOMER NAME</th>
              <th>TOTAL PAID</th>
              <th>STATUS</th>
              <th>CREATED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.fullName}</td>
                <td>$ {order.totalPaid}</td>
                <td>
                  <Form.Control
                    as="select"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </Form.Control>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString('en-CA')}</td>
                <td>
                  <Button variant="danger" className="btn-sm" onClick={(e) => deleteHandler(e, order._id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>No orders found.</div>
      )}
    </div>
  );
}

// return (
//   <div>
//     <PageHeader title={"Manage Order"} curPage={"Order Details"} />
//     <Form onSubmit={submitHandler} className="m-5">
//       {/* Add form fields for order details */}
//       <Form.Group controlId="customerName" className="mb-4">
//         <Form.Label>Customer Name</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter customer name"
//           value={customerName}
//           onChange={(e) => setCustomerName(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group controlId="orderStatus" className="mb-4">
//         <Form.Label>Order Status</Form.Label>
//         <Form.Control
//           as="select"
//           value={orderStatus}
//           onChange={(e) => setOrderStatus(e.target.value)}
//         >
//           <option value="">Select status</option>
//           <option value="Pending">Pending</option>
//           <option value="Processing">Processing</option>
//           <option value="Shipped">Shipped</option>
//           <option value="Delivered">Delivered</option>
//         </Form.Control>
//       </Form.Group>

//       {/* Table to display order items */}
//       <Table striped bordered hover responsive className="table-sm">
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Quantity</th>
//             <th>Price</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orderItems.map((item, index) => (
//             <tr key={index}>
//               <td>{item.productName}</td>
//               <td>{item.quantity}</td>
//               <td>${item.price}</td>
//               <td>${(item.quantity * item.price).toFixed(2)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Button
//         type="submit"
//         variant="primary"
//         style={{
//           marginTop: "15px",
//           backgroundColor: "#ffc107",
//           borderColor: "#ffc107",
//           color: "#000",
//         }}
//         className="btn btn-primary"
//       >
//         Update Order
//       </Button>
//     </Form>
//   </div>
// );
// }

export default OrderListScreen;
