import React, { useEffect, useState } from "react";
import Rating from "../rating/Rating";
import PageHeader from "../components/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { getUserId } from "../helpers/auth";

function IndividualProduct() {
  const { id } = useParams();
  const [individualProduct, setIndividualProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIndividualProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/product/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log('data', data);
        if (data && data.success) {
          setIndividualProduct(data.product);
        } else {
          alert(data.message)
        }
      } catch (err) {
        console.log("this is the error", err);
      }
    };

    fetchIndividualProduct();
  }, []);

  const handleAddToCart = async () => {
    try {
      console.log('id --->', getUserId)
      const response = await fetch('http://localhost:5000/api/cart', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: individualProduct._id,
          quantity: 1,
          price: individualProduct.price,
          userId: getUserId()
        })
      });

      const data = await response.json();
      console.log('data', data);
      if (data && data.success) {
        alert("Product added to cart!");
        navigate("/shop", {replace: true });
      } else {
        alert(data.message)
      }
    } catch (err) {
      console.log("this is the error", err);
    }
  };

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
            <button
              style={{
                backgroundColor: "#ffc107",
                borderColor: "#ffc107",
                color: "#000",
              }}
              className="btn btn-primary btn-lg"
              disabled={individualProduct.countInStock === 0}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualProduct;
