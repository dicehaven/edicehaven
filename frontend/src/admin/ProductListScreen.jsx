import React, { useState, useEffect } from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";

function ProductListScreen() {
  // Define state variables
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ products: [], pages: 0, page: 0 }); // Define data state variable

  useEffect(() => {
    // Fetch cart items from local storage
    const getAllProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        console.log('data', data)

        if (data && data.success) {
          setData((prevState) => ({ ...prevState, products: data.products }));
        }
      }
      catch (err) {
        alert(err.message)
      }

    };

    getAllProducts();

  }, []);

  // TODO
  const deleteHandler = (productId) => {
    // Add logic to handle deleting a product
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

      {loadingCreate && <div>Loading create...</div>}
      {loadingDelete && <div>Loading delete...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
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
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default ProductListScreen;
