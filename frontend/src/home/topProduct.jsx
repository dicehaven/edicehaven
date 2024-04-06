import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

const TopProduct = () => {
            /* Use this to connect it to top products -prayas
  // State to hold the products data
  const [topProduct, setProducts] = useState([]);

  // Fetching data from the database when the component mounts
  useEffect(() => {
    // Assuming you have an API endpoint to fetch top products
    fetch('api/top-products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching top products:', error));
  }, [] )*/

  // Dummy product data
  const topProducts = [
    {
      id: 1,
      name: "Dummy Product 1",
      category: "Category 1",
      price: 10.99,
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      name: "Dummy Product 2",
      category: "Category 2",
      price: 19.99,
      image: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      name: "Dummy Product 3",
      category: "Category 3",
      price: 14.99,
      image: "https://via.placeholder.com/150"
    },
    {
      id: 4,
      name: "Dummy Product 4",
      category: "Category 4",
      price: 8.99,
      image: "https://via.placeholder.com/150"
    },

    // Add more dummy products as needed
  ];

  const [displayedProducts, setDisplayedProducts] = useState(topProducts.slice(0, 4));
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    const nextIndex = displayedProducts.length + 4;
    setDisplayedProducts(topProducts.slice(0, nextIndex));
    setShowMore(nextIndex < topProducts.length);
  };

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
            <div key={product.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Link to={`/product/${product.id}`} className="block relative h-48 rounded overflow-hidden">
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
        {showMore && (
          <div className="flex justify-center mt-8">
            <button onClick={handleShowMore} className="text-gray-700 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none">
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopProduct;
