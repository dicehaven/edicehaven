import React from "react";
import Product from "./product";

const Shop = ({ products }) => {
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
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
