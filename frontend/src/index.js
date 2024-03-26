
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Home from "./home/Home";
import About from "./aboutPage/About";
import Contact from "./contactPage/Contact";
import Login from "./signinPage/signin";
import CreateAccount from "./createaacountPage/createAccount";
import CartPage from "./cartPage/CartPage";
import IndividualProduct from "./individualProductPage/IndividualProduct";
  import Shop from "./shopPage/shop";
import ProductPage from "./shopPage/product";

import reportWebVitals from "./reportWebVitals";

import "swiper/css";

// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// fonts and icons
import "././assets/css/icofont.min.css";
import "././assets/css/animate.css";
import "././assets/css/style.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/login", element: <Login /> },
      { path: "/sign-up", element: <CreateAccount /> },
      { path: "/cart-page", element: <CartPage /> },
      { path: "/product", element: <IndividualProduct /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
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
