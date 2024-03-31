import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import PageHeader from "../components/PageHeader";

function ProductEditScreen() {
  // Define state variables
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [loadingUpdate, setLoadingUpdate] = useState(false); // Define loadingUpdate state variable
  const [loadingUpload, setLoadingUpload] = useState(false); // Define loadingUpload state variable
  const [isLoading, setIsLoading] = useState(false); // Define isLoading state variable
  const [error, setError] = useState(null); // Define error state variable

  // Define submitHandler function
  const submitHandler = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
  };

  // Define uploadFileHandler function
  const uploadFileHandler = async (e) => {
    // Add logic to handle file upload
  };

  useEffect(() => {
    // Fetch product details or any other necessary data
  }, []);

  return (
    <div>
      <PageHeader title={"Edit Product"} curPage={"Edit Product"} />
      <div className="container">
        <h3>Edit Product</h3>
        {loadingUpdate && <div>Loading Update...</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <Form onSubmit={submitHandler} className="m-3">
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label="Choose File"
                onChange={uploadFileHandler}
                type="file"
              ></Form.Control>
              {loadingUpload && <div>Loading Upload...</div>}
            </Form.Group>

            <Form.Group controlId="brand" className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock" className="mb-3">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

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
              Update
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
}

export default ProductEditScreen;
