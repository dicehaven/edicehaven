import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {

  return (
    <div className="lg:w-1/4 md:w-1/5 p-5 w-full h-full">
      <Link
        to={`/product/${product._id}`}
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
      </div>
    </div>
  );
};

export default Product;
