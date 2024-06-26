import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import delImgUrl from "../assets/images/shop/del.png";
import { getUserId, getUserToken, isAuthenticated } from "../helpers/auth";
import { handleRemoveFromCart, handleUpsertToCart } from "../helpers/cart";
import BASE_URL from '../config/index.ts';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from the database
    const getProductsInCart = async () => {
      const userId = getUserId();
      if (userId) {
        try {
          const response = await fetch(
            `${BASE_URL}/api/cart/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getUserToken()}`
              },
            }
          );

          const data = await response.json();

          if (data && data.success && data.cart) {
            setCartItems([...data.cart[0].items]);
          } else {
            alert(data.message)
          }
        } catch (err) {
          alert(err.message);
        }
      }
    };

    getProductsInCart();
  }, []);

  // Calculate the total price for each item in the cart
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  // Handle quantity increase
  const handleIncrease = async (item) => {
    item.quantity += 1;
    try {
      await handleUpsertToCart({ quantity: item.quantity }, item.product, null, false)
    } catch (err) {
      alert(err.message)
    }

    setCartItems([...cartItems]);
  };

  // Handle quantity decrease
  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      try {
        await handleUpsertToCart({ quantity: item.quantity }, item.product, null, false)
      } catch (err) {
        alert(err.message)
      }

      setCartItems([...cartItems]);
    }
  };

  // Handle item removal
  const handleRemoveItem = async (item) => {
    // Filter out the item to be removed
    const updatedCart = cartItems.filter(
      (cartItem) => cartItem._id !== item._id
    );
    // Update the state with the new cart
    setCartItems(updatedCart);
    await handleRemoveFromCart({ _id: item.product._id, price: item.price });

  };


  // Calculate the cart subtotal
  const cartSubtotal = cartItems.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  // Calculate the order total
  const orderTotal = cartSubtotal;

  return (
    <>
      <PageHeader title={"Shop Cart"} curPage={"Cart Page"} />
      <div className="shop-cart padding-tb">
        <div className="container">
          {!isAuthenticated() && (
            <h1>You need to be logged in to access the cart page.</h1>
          )}
          {isAuthenticated() && (
            <div className="section-wrapper">
              {/* cart top */}
              <div className="cart-top">
                <table>
                  <thead>
                    <tr>
                      <th className="cat-product">Product</th>
                      <th className="cat-price">Price</th>
                      <th className="cat-quantity">Quantity</th>
                      <th className="cat-toprice">Total</th>
                      <th className="cat-edit">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, indx) => (
                      <tr key={indx}>
                        <td className="product-item cat-product">
                          <div className="p-thumb">
                            <Link to={`/product/${item.product._id}`}>
                              <img
                                src={`${item.product.image}`}
                                alt="thumbnail-cover-product"
                              />
                            </Link>
                          </div>
                          <div className="p-content">
                            <Link to={`/product/${item.product._id}`}>
                              {item.product.name}
                            </Link>
                          </div>
                        </td>
                        <td className="cat-price">${item.price.toFixed(2)}</td>
                        <td className="cat-quantity">
                          <div className="cart-plus-minus">
                            <div
                              className="dec qtybutton"
                              onClick={() => handleDecrease(item)}
                            >
                              -
                            </div>
                            <input
                              className="cart-plus-minus-box"
                              type="text"
                              name="qtybutton"
                              value={item.quantity}
                            />
                            <div
                              className="inc qtybutton"
                              onClick={() => handleIncrease(item)}
                            >
                              +
                            </div>
                          </div>
                        </td>
                        <td className="cat-toprice">
                          ${calculateTotalPrice(item).toFixed(2)}
                        </td>
                        <td className="cat-edit">
                          <span onClick={() => handleRemoveItem(item)}>
                            <img src={delImgUrl} alt="" />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* cart bottom */}
              <div className="cart-bottom">
                {/* checkout box */}
                <div className="cart-checkout-box">
                  <form className="coupon" action="/">
                    <input
                      type="text"
                      name="coupon"
                      placeholder="Coupon Code..."
                      className="cart-page-input-text"
                    />
                    <input type="submit" value="Apply Coupon" />
                  </form>
                  <form className="cart-checkout" action="/">
                    {/* <input type="submit" value="Update Cart" /> */}
                    <Link to={"/payment"} state={{ cartTotals: orderTotal }}>
                      <input type="submit" value="Proceed to Checkout" disabled={!orderTotal || orderTotal === 0} />
                    </Link>
                  </form>
                </div>

                {/* shopping box */}
                <div className="shiping-box">
                  <div className="row">
                    {/* shipping  */}
                    <div className="col-md-6 col-12">
                      <div className="calculate-shiping">
                        <h3>Calculate Shipping</h3>
                        <div className="outline-select">
                          <select>
                            <option value="volvo">United Kingdom (UK)</option>
                            <option value="saab">Bangladesh</option>
                            <option value="saab">Pakisthan</option>
                            <option value="saab">India</option>
                            <option value="saab">Nepal</option>
                          </select>
                          <span className="select-icon">
                            <i className="icofont-rounded-down"></i>
                          </span>
                        </div>
                        <div className="outline-select shipping-select">
                          <select>
                            <option value="volvo">State/Country</option>
                            <option value="saab">Dhaka</option>
                            <option value="saab">Benkok</option>
                            <option value="saab">Kolkata</option>
                            <option value="saab">Kapasia</option>
                          </select>
                          <span className="select-icon">
                            <i className="icofont-rounded-down"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          name="coupon"
                          placeholder="Postcode/ZIP"
                          className="cart-page-input-text"
                        />
                      </div>
                    </div>

                    {/* cart total */}
                    <div className="col-md-6 col-12">
                      <div className="cart-overview">
                        <h3>Cart Totals</h3>
                        <ul className="lab-ul">
                          <li>
                            <span className="pull-left">Cart Subtotal</span>
                            <p className="pull-right">$ {cartSubtotal}</p>
                          </li>
                          <li>
                            <span className="pull-left">
                              Shipping and Handling
                            </span>
                            <p className="pull-right">Free Shipping</p>
                          </li>
                          <li>
                            <span className="pull-left">Order Total</span>
                            <p className="pull-right">
                              $ {orderTotal.toFixed(2)}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div >
    </>
  );
};

export default CartPage;
