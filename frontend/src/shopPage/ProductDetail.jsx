import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const { name, price, image, category, rating, brand, countInStock, numReviews, description } = product;

  return (
    <section className="text-gray-600 body-font overflow-hidden" style={{ width: "100vw", height: "100vh" }}>
      <div className="container px-10 py-48 mx-auto flex justify-center items-center h-full">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={name}
            className="lg:w-1/2 w-full lg:h-auto h-128 object-cover object-center rounded"
            src={image}
          />
          <div className="lg:w-1/2 w-full lg:pl-20 lg:py-12 mt-12 lg:mt-0">
            <h2 className="text-lg title-font text-gray-500 tracking-widest">{brand}</h2>
            <span className="text-gray-600 ml-3 text-xl">{category}</span>
            <h1 className="text-gray-900 text-5xl title-font font-medium mb-4">{name}</h1>
            <div className="flex mb-8">
              <span className="flex items-center text-xl">
                <span className="text-gray-600 ml-3">{rating}/10</span>
                <span className="text-gray-600 ml-3">{numReviews} Reviews</span>
              </span>
            </div>
            <span className="text-gray-600 ml-3 text-xl">{countInStock} in stock</span>
            <p className="leading-relaxed text-xl">{description}</p>
            <div className="flex mt-12 items-center pb-10 border-b-4 border-gray-100 mb-10">
              {/* Additional content */}
            </div>
            <div className="flex">
              <span className="title-font font-medium text-4xl text-gray-900">{price}</span>
              <button className="flex ml-auto text-white bg-indigo-500 border-0 py-4 px-12 focus:outline-none hover:bg-indigo-600 rounded">
                Add to cart {/* please add this to add cart button Alex, Queny !!*/}
              </button>
              {/* Shopping cart button */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
