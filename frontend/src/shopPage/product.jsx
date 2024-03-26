import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const [productDetails, setProductDetails] = useState(null);

  // useEffect(() => {
  //   // Simulated fetch from database using productId
  //   const fetchProductDetails = async () => {
  //     try {
  //       // Replace this with actual fetch call to your backend
  //       const response = await fetch(`/api/products/${product.id}`);
  //       const data = await response.json();
  //       setProductDetails(data); // Update product details state with fetched data
  //     } catch (error) {
  //       console.error("Error fetching product details:", error);
  //     }
  //   };

  //   fetchProductDetails();
  // }, [product.id]);

  return (
    <div className="lg:w-1/4 md:w-1/5 p-5 w-full h-full">
      {console.log("product", product)}
      <Link
        to={`/product/${product.id}`}
        className="block relative h-48 rounded overflow-hidden"
      >
        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full"
          src={product.image}
        />
      </Link>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {product.category}
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">
          {product.name}
        </h2>
        <p className="mt-1">{product.price}</p>
        {productDetails && (
          <div>
            <h2 className="text-gray-900 title-font text-lg font-medium">
              {productDetails.name}
            </h2>
            <span>{productDetails.category}</span>
            <p className="leading-relaxed">{productDetails.description}</p>
            <div className="flex mb-4">
              <span>{productDetails.stock} in stock</span>
            </div>
            <div className="flex mb-4">
              <span>{productDetails.rating}/5</span>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">{`$${productDetails.price}`}</span>
              <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Button
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
