import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import OrderListScreen from "./admin/OrderListScreen";
import reportWebVitals from "./reportWebVitals";
import Profile from "./profile/ProfilePage";

import "swiper/css";

// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// fonts and icons
import "././assets/css/icofont.min.css";
import "././assets/css/animate.css";
import "././assets/css/style.min.css";
import ProductEditScreen from "./admin/ProductEditScreen";
import ProductListScreen from "./admin/ProductListScreen";
import UserEditScreen from "./admin/UserEditScreen";
import UserListScreen from "./admin/UserListScreen";
import RequireAdminRole from "./components/RequireAdminRole";
import ProductAddScreen from "./admin/ProductAddScreen";
import PaymentPage from "./paymentPage/PaymentPage";

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
      { path: "/product/:id", element: <IndividualProduct /> },
      { path: "/shop", element: <Shop /> },
      { path: "/profile", element: <Profile /> },
      { path: "/payment", element: <PaymentPage /> },
      {
        path: "/admin/order",
        element: (
          <RequireAdminRole>
            <OrderListScreen />
          </RequireAdminRole>
        ),
      },
      {
        path: "/admin/editproduct",
        element: (
          <RequireAdminRole>
            <ProductEditScreen />
          </RequireAdminRole>
        ),
      },
      {
        path: "/admin/listproduct",
        element: (
          <RequireAdminRole>
            <ProductListScreen />
          </RequireAdminRole>
        ),
      },
      {
        path: "/admin/edituser",
        element: (
          <RequireAdminRole>
            <UserEditScreen />
          </RequireAdminRole>
        ),
      },
      {
        path: "/admin/listuser",
        element: (
          <RequireAdminRole>
            <UserListScreen />
          </RequireAdminRole>
        ),
      },
      {
        path: "/admin/createproduct",
        element: (
          <RequireAdminRole>
            <ProductAddScreen />
          </RequireAdminRole>
        ),
      },
    ],
  },
]);

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
reportWebVitals();
