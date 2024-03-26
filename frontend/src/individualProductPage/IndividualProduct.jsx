import React from "react";
import Rating from "../rating/Rating";
import PageHeader from "../components/PageHeader";
function IndividualProduct() {
  // Product details
  const product = {
    name: "Monopoly Classic Edition",
    image: "/images/monopoly.jpg",
    description:
      "Classic family board game of buying and trading properties with an aim to monopolize the board and bankrupt opponents.",
    brand: "Hasbro",
    category: "Games",
    price: 19.99,
    countInStock: 20,
    rating: 4.6,
    numReviews: 150,
  };

  return (
    <div>
      <PageHeader title={"Explore Our Product"} curPage={"Product Details"} />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-5">
            <img src={product.image} alt={product.name} className="img-fluid" />
          </div>
          <div className="col-md-7">
            <h2>{product.name}</h2>
            <Rating
              className="img-fluid"
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
            <h4 className="mt-3">
              Price:{" "}
              <span
                style={{
                  color: "#ffc107",
                }}
              >
                ${product.price}
              </span>
            </h4>
            <p>{product.description}</p>
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p
              className={
                product.countInStock > 0 ? "text-success" : "text-danger"
              }
            >
              {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <button
              style={{
                backgroundColor: "#ffc107",
                borderColor: "#ffc107",
                color: "#000",
              }}
              className="btn btn-primary btn-lg"
              disabled={product.countInStock === 0}
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
