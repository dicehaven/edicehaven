// Cart functions

import { getUserId, getUserToken } from "./auth";


const handleUpsertToCart = async (quantity, individualProduct, navigate) => {

  if (quantity.quantity < 1) {
    alert("To add to cart, you need at least one item")
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/cart', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getUserToken()}`
      },
      body: JSON.stringify({
        productId: individualProduct._id,
        quantity: quantity.quantity,
        price: individualProduct.price,
        userId: getUserId()
      })
    });

    const data = await response.json();
    if (data && data.success) {
      alert("Product added to cart!");
      if (navigate) {
        navigate("/shop", { replace: true });
      }
    } else {
      alert(data.message)
    }
  } catch (err) {
    console.log("this is the error", err);
    alert(err.message)
  }
};

const handleRemoveFromCart = async (individualProduct, navigate) => {
  try {
    const response = await fetch('http://localhost:5000/api/cart', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getUserToken()}`
      },
      body: JSON.stringify({
        productId: individualProduct._id,
        quantity: 0,
        price: individualProduct.price,
        userId: getUserId()
      })
    });

    const data = await response.json();
    if (data && data.success) {
      alert("Product removed from cart!");
      if (navigate) {
        navigate("/shop", { replace: true });
      }
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert(err.message);
  }
};

export { handleUpsertToCart, handleRemoveFromCart }