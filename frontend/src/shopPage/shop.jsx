import React, { useEffect, useState } from "react";
import Product from "./product";

const searchAreaStyle = {
  width: "100%",
  display: "flex",
  marginTop: "3rem",
  paddingLeft: "3rem",
}

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState({
    sortBy: "",
    sortOrder: "asc",
  });
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products?qCategory=${category}&sortBy=${sort.sortBy}&sortOrder=${sort.sortOrder}`, {
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
  }, [sort, category]);

  const handleSortChange = (e) => {
    const sortOrder = e.target.value === "HighToLow" ? "desc" : "asc";
    setSort({ sortBy: "price", sortOrder });
  }

  const handleCategoryChange = (e) => {
    const category = e.target.value === "remove" ? "" : e.target.value;
    setCategory(category);
  }

  return (
    <div>
      <div id="img">
        <img
          src="https://i0.wp.com/dorkygeekynerdy.com/wp-content/uploads/2019/02/board-game-933165_1280-e1549489798633.jpg?fit=1280%2C313&ssl=1"
          alt="Board Game Collection"
          style={{ width: "100%" }}
        />
      </div>
      <div style={searchAreaStyle}>
        <div style={{ marginRight: '25px' }}>
          <div style={{ textAlign: "center", marginBottom: '10px' }}>
            Sort By Price
          </div>
          <div>
            <select onChange={handleSortChange} defaultValue="">
              <option value="" disabled style={{ display: "none" }}></option>
              <option value="HighToLow">High to Low</option>
              <option value="LowToHigh">Low to High</option>
            </select>
          </div>
        </div>
        <div>
          <div style={{ textAlign: "center", marginBottom: '10px' }}>
            Selected Category
          </div>
          <div>
            <select onChange={handleCategoryChange} defaultValue="">
              <option value="remove">No Category</option>
              <option value="Family">Family</option>
              <option value="Games">Games</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -m-1">

        {products && products.length > 0 && products.map((product) => {
          return <Product key={product._id} product={product} />;
        })}

        {(!products || (products && !products.length)) && <h3 style={{ padding: "3rem" }}>No products found</h3>}
      </div>
    </div>
  );
};

export default Shop;
