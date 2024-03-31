import React, { useState, useEffect } from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

function ProductListScreen() {
  // Define state variables
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ products: [], pages: 0, page: 0 }); // Define data state variable

  // Define createProductHandler and deleteHandler functions if they are not defined elsewhere
  const createProductHandler = () => {
    // Add logic to handle creating a product
  };

  const deleteHandler = (productId) => {
    // Add logic to handle deleting a product
  };

  useEffect(() => {
    // Fetch products data or any other necessary data
  }, []);

  return (
    <div>
      <PageHeader title={"List Of Product"} curPage={"List Of Product"} />
      <Row className="align-items-center m-2">
        <Col>
          <h4>Products</h4>
        </Col>
        <Col className="text-end">
          <Button
            variant="primary"
            style={{
              marginTop: "15px",
              backgroundColor: "#ffc107",
              borderColor: "#ffc107",
              color: "#000",
            }}
            className="btn btn-primary my-3"
            onClick={createProductHandler}
          >
            Create Product
          </Button>
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
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
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