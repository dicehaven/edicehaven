import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BASE_URL from '../config/index.ts';

const TopProduct = () => {
  const [displayedProducts, setDisplayedProducts] = useState([]);


  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products?sortBy='rating'&sortOrder='desc'`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data && data.success) {
          setDisplayedProducts(data.products.slice(0,4));
        }
      }
      catch (err) {
        alert(err.message)
      }

    };

    getAllProducts();

  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h3>
          <i className="fas fa-fire" style={{
            background: "linear-gradient(to right, #ff0000, #ff7f00, #ffff00)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block"
          }}></i> TOP PRODUCTS
        </h3>

        <div className="flex flex-wrap -m-4">
          {displayedProducts.map(product => (
            <div key={product._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Link to={`/product/${product._id}`} className="block relative h-48 rounded overflow-hidden">
                <img
                  alt={product.name}
                  className="object-cover object-center w-full h-full block"
                  src={product.image}
                />
              </Link>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {product.category}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{product.name}</h2>
                <p className="mt-1">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopProduct;
