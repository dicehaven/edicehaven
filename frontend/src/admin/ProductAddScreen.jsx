import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import PageHeader from "../components/PageHeader";
import { useLocation, useNavigate } from "react-router-dom";

function ProductAddScreen() {
  // Define state variables
  const location = useLocation();
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: 0,
    image: "",
    brand: "",
    category: "",
    countInStock: 0,
    description: "",
  })
  const [loadingUpdate, setLoadingUpdate] = useState(false); // Define loadingUpdate state variable
  const [loadingUpload, setLoadingUpload] = useState(false); // Define loadingUpload state variable
  const [isLoading, setIsLoading] = useState(false); // Define isLoading state variable
  const [error, setError] = useState(null); // Define error state variable

  // Define submitHandler function
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/product`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...productInfo, numReviews: 0 })
      })

      const data = await response.json();

      console.log('data0', data);

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

  const handleChange = (e, key) => {
    setProductInfo((prevState) => ({ ...prevState, [key]: e.target.value }))
  }

  return (
    <div>
      <PageHeader title={"Edit Product"} curPage={"Edit Product"} />
      <div className="container">
        <h3>Create Product</h3>
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
                value={productInfo.name}
                onChange={(e) => handleChange(e, "name")}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={productInfo.price}
                onChange={(e) => handleChange(e, "price")}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Enter image url"
                value={productInfo.image}
                onChange={(e) => handleChange(e, "image")}
              ></Form.Control>
              <div>
                <div>Preview</div>
                {productInfo.image && <img src={productInfo.image} width={250} alt={`${productInfo.name} pic not available`} />}
              </div>
              {loadingUpload && <div>Loading Upload...</div>}
            </Form.Group>

            <Form.Group controlId="brand" className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={productInfo.brand}
                onChange={(e) => handleChange(e, "brand")}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock" className="mb-3">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={productInfo.countInStock}
                onChange={(e) => handleChange(e, "countInStock")}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={productInfo.category}
                onChange={(e) => handleChange(e, "category")}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={productInfo.description}
                onChange={(e) => handleChange(e, "description")}
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
              Create
            </Button>
          </Form>
        )}
    </div>
    </div >
  );
}

export default ProductAddScreen;
