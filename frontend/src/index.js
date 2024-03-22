import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import './index.css';
import App from './App';
import Home from './home/Home'
import About from './aboutPage/About'
import Contact from './contactPage/Contact'
import Login from './signinPage/signin';
import CreateAccount from './createaacountPage/createAccount'
import reportWebVitals from './reportWebVitals';
import Shop from "./shopPage/shop";
import ProductPage from "./shopPage/product";

// bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// fonts and icons
import '././assets/css/icofont.min.css';
import '././assets/css/animate.css';
import '././assets/css/style.min.css';

// Define your product data here
const products = [
  { id: 1, name: "The Catalyzer", price: "$16.00", image: "https://dummyimage.com/420x260", category: "Category 1", rating: 4 },
  { id: 2, name: "Shooting Stars", price: "$21.15", image: "https://dummyimage.com/421x261", category: "Category 2", rating: 4 },
  { id: 3, name: "Another Product", price: "$10.00", image: "https://dummyimage.com/420x260", category: "Category 3", rating: 4 },
  { id: 4, name: "New Stars", price: "$18.99", image: "https://dummyimage.com/421x261", category: "Category 4", rating: 4 },
];

// Render the Shop component with the products prop
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/sign-up" element={<CreateAccount/>} />
          {/* Ensure you are passing the products array to the Shop component */}
          <Route path="/shop" element={<Shop products={products} />} />
          <Route path="/product/:id" element={<ProductPage products={products} />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
