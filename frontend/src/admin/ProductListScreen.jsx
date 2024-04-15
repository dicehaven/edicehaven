import React, { useState, useEffect } from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import { getUserToken } from "../helpers/auth";

function ProductListScreen() {
  const [data, setData] = useState({ products: [] });
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    // Fetch cart items from database
    const getAllProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getUserToken()}`
          },
        });

        const data = await response.json();

        if (data && data.success) {
          setData((prevState) => ({ ...prevState, products: data.products }));
        }
      }
      catch (err) {
        alert(err.message)
      }

    };

    getAllProducts();

  }, [fetchAgain]);

  const deleteHandler = async (e, productId) => {
    e.preventDefault();
    // Delete product from database
    try {
      const response = await fetch(`http://localhost:5000/api/product/${productId}`, {
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

  return (
    <div>
      <PageHeader title={"List Of Product"} curPage={"List Of Product"} />
      <Row className="align-items-center m-2">
        <Col>
          <h4>Products</h4>
        </Col>
        <Col className="text-end">
          <Link to="/admin/createproduct">
            <Button
              variant="primary"
              style={{
                marginTop: "15px",
                backgroundColor: "#ffc107",
                borderColor: "#ffc107",
                color: "#000",
              }}
              className="btn btn-primary my-3"
            >
              Create Product
            </Button>
          </Link>
        </Col>
      </Row>
        <div className="mx-4">
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/editproduct`} state={{...product}}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={(e) => deleteHandler(e, product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
    </div>
  );
}

export default ProductListScreen;
