import React from "react";
import { Link } from "react-router-dom";

const Shop = ({ products }) => {
  console.log('Products:', products); // Log the products array here
  
  return (
    <div>
     
     <div style={{ position: 'relative' }}>
  <img
    src="https://i0.wp.com/dorkygeekynerdy.com/wp-content/uploads/2019/02/board-game-933165_1280-e1549489798633.jpg?fit=1280%2C313&ssl=1"
    alt=""
    style={{ width: "100%" }}
  />
  <div className="text-center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
  <h1 style={{ color: "white", fontSize: "80px" }}>Shop</h1>
<span style={{ color: "white", fontSize: "200%" }}>Buy with the best in the game!</span>


  </div>
</div>

      <div style={{ padding: '100px'}}>
 

      <div style={{ fontSize: "300%", marginBottom: "20px" }}><u>Hot Deals</u></div>


  <div className="flex flex-wrap -m-4">
    {products.map((product) => (
      <div key={product.id} className="product-card lg:w-1/4 md:w-1/2 p-4 w-full">
        <Link to={`/product/${product.id}`} className="block relative h-48 rounded overflow-hidden">
          <img src={product.image} alt={product.name} className="object-cover object-center w-full h-full block" />
        </Link>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{product.name}</h2>
          <p className="mt-1">{product.price}</p>
        </div>
      </div>
    ))}
  </div>
</div>


    </div>
  );
};

export default Shop;
