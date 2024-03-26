import React, { useEffect, useState } from "react";
import Product from "./product";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (data && data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.log("this is the error", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div id="img">
        <img
          src="https://i0.wp.com/dorkygeekynerdy.com/wp-content/uploads/2019/02/board-game-933165_1280-e1549489798633.jpg?fit=1280%2C313&ssl=1"
          alt=""
          style={{ width: "100%" }}
        />
      </div>
      <div className="flex flex-wrap -m-1">

        {products.map((product) => {
          return <Product product={product} />;
        })}
      </div>
    </div>
  );
};

export default Shop;
