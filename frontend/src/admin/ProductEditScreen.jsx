import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import PageHeader from "../components/PageHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserToken } from "../helpers/auth";

function ProductEditScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState(location.state.name);
  const [price, setPrice] = useState(location.state.price);
  const [image, setImage] = useState(location.state.image);
  const [brand, setBrand] = useState(location.state.brand);
  const [category, setCategory] = useState(location.state.category);
  const [countInStock, setCountInStock] = useState(location.state.countInStock);
  const [description, setDescription] = useState(location.state.description);
  const [error, setError] = useState(null);


  const submitHandler = async (e) => {
    e.preventDefault();
    // Updates information from product
    try {
      const response = await fetch(`http://localhost:5000/api/product/${location.state._id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${getUserToken()}`
        },
        body: JSON.stringify({ name, price, image, brand, category, countInStock, description })
      })

      const data = await response.json();
      if (data && data.success) {
        alert(data.message);
        navigate("/admin/listproduct", { replace: true })
      } else {
        alert(data.message);
      }

    } catch (err) {
      alert(err.messasge)
      console.log('this is the error', err);
    }
  };

  if (!location.state) {
    setError("Product not defined. Please try again.")
  }

  return (
    <div>
      <PageHeader title={"Edit Product"} curPage={"Edit Product"} />
      <div className="container">
        <h3>Edit Product</h3>
        {error ? (
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
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <div>
                <div>Preview</div>
                {image && <img src={image} width={250} alt={`${name} pic not available`} />}
              </div>
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
