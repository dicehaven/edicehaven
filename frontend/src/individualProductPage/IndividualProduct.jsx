import React, { useEffect, useState } from "react";
import Rating from "../rating/Rating";
import PageHeader from "../components/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { getUserId } from "../helpers/auth";
import { handleRemoveFromCart, handleUpsertToCart } from "../helpers/cart";

function IndividualProduct() {
  const { id } = useParams();
  const [individualProduct, setIndividualProduct] = useState({});
  const [quantity, setQuantity] = useState({ isInCart: false, quantity: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/product/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (data && data.success) {
          setIndividualProduct(data.product);
        } else {
          alert(data.message)
        }
      } catch (err) {
        alert(err.message)
      }

      const userId = getUserId();
      if (!userId) {
        setQuantity({ isInCart: false, quantity: 0 })
      } else {
        try {

          const response = await fetch(`http://localhost:5000/api/cart/${userId}/product/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const productQtyResponse = await response.json();
          if (productQtyResponse && productQtyResponse.success) {
            setQuantity({ isInCart: true, quantity: productQtyResponse.product.quantity });
          } else {
            setQuantity({ isInCart: false, quantity: 0 })
          }
        } catch (err) {
          console.log("this is the error", err);
          alert(err.message)
        }
      }
    };

    fetchInitialData();
  }, []);

  const increaseQuantity = () => {
    const newQuantity = quantity.quantity + 1;
    setQuantity({ ...quantity, quantity: newQuantity });
  };

  const decreaseQuantity = () => {
    const newQuantity = quantity.quantity > 0 ? quantity.quantity - 1 : 0;
    setQuantity({ ...quantity, quantity: newQuantity });
  };

  const editCart = async () => {
    await handleUpsertToCart(quantity, individualProduct, navigate);
  }

  const deleleFromCart = async () => {
    await handleRemoveFromCart(individualProduct, navigate);
  }


  return (
    <div>
      <PageHeader title={"Explore Our Product"} curPage={"Product Details"} />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-5">
            <img src={individualProduct.image} alt={individualProduct.name} className="img-fluid" />
          </div>
          <div className="col-md-7">
            <h2>{individualProduct.name}</h2>
            <Rating
              className="img-fluid"
              value={individualProduct.rating}
              text={`${individualProduct.numReviews} reviews`}
            />
            <h4 className="mt-3">
              Price:{" "}
              <span
                style={{
                  color: "#ffc107",
                }}
              >
                ${individualProduct.price}
              </span>
            </h4>
            <p>{individualProduct.description}</p>
            <p>
              <strong>Brand:</strong> {individualProduct.brand}
            </p>
            <p>
              <strong>Category:</strong> {individualProduct.category}
            </p>
            <p
              className={
                individualProduct.countInStock > 0 ? "text-success" : "text-danger"
              }
            >
              {individualProduct.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <div className="quantity-adjuster mt-3">
              <button className="btn btn-secondary" onClick={decreaseQuantity}>-</button>
              <span className="mx-2">{quantity.quantity}</span>
              <button className="btn btn-secondary" onClick={increaseQuantity}>+</button>
            </div>
            <button
              style={{
                marginTop: '15px',
                backgroundColor: "#ffc107",
                borderColor: "#ffc107",
                color: "#000",
              }}
              className="btn btn-primary btn-lg"
              disabled={individualProduct.countInStock === 0}
              onClick={editCart}
            >
              Add to Cart
            </button>
            {
              quantity.isInCart && (
                <button
                  style={{ marginTop: "15px", marginLeft: "10px", backgroundColor: "#dc3545", borderColor: "#dc3545" }}
                  className="btn btn-danger btn-lg"
                  onClick={deleleFromCart}
                >
                  Remove from Cart
                </button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualProduct;
