import React, { useEffect, useState } from "react";
import axios from "axios";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";


export default function Cart() {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Cart data:", res.data);
      setCart(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
    window.addEventListener("cartUpdated", fetchCart);
  };


  const updateQty = async (productId, qty) => {
    if (qty < 1) return;

    await axios.put(
      `http://localhost:5000/api/cart/${productId}`,
      { quantity: qty },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = async (productId) => {
    await axios.delete(
      `http://localhost:5000/api/cart/${productId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const freeShippingLimit = 100;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.prod_price * item.Quantity,
    0
  );

  const remaining = Math.max(0, freeShippingLimit - subtotal);
  const progressPercent = Math.min(
    100,
    (subtotal / freeShippingLimit) * 100
  );

  return (
    <>
      <style>
        {`
          .wishlist-header {
            height: 165px;
            background: url("../images/Main-Header.webp") center/cover no-repeat;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            text-align: center;
          }

          /* Progress bar */
          .free-ship-bar {
            width: 100%;
            height: 6px;
            background: #e6e6e6;
            border-radius: 20px;
            position: relative;
            overflow: visible;
          }

          /* Filled part */
          .free-ship-progress {
            height: 6px;
            background: repeating-linear-gradient(
              45deg,
              #b08968,
              #b08968 6px,
              #c29a78 6px,
              #c29a78 12px
            );
            border-radius: 20px;
            position: relative;
            transition: width 0.4s ease;
          }

          /* Circle container */
          .truck-wrapper {
            position: absolute;
            right: -14px;
            top: 50%;
            transform: translateY(-50%);
            width: 28px;
            height: 28px;
            background: #b08968;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 0 3px #fff;
          }

          /* White truck icon */
          .truck-icon {
            font-size: 16px !important;
            color: #fff;
          }


          .wishlist-header::after {
            content: "";
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0.35);
          }

          .wishlist-header-content {
            position: relative;
            z-index: 1;
          }

          .breadcrumb-text {
            letter-spacing: 2px;
            font-size: 14px;
            margin-bottom: 10px;
          }

          .wishlist-header h1 {
            font-family: "Playfair Display", serif;
            font-size: 48px;
          }

          h5 a {
            text-align: center;
            font-size: 18px;
            font-weight: 500;
            color: black;
          }

          .cart-wrapper {
            padding: 60px 80px;
          }

          .free-ship {
            text-align: center;
            margin-bottom: 40px;
          }

          .progress-bar {
            height: 6px;
            background: #eee;
            margin: 10px auto;
            border-radius: 5px;
          }

          .progress-bar span {
            height: 100%;
            background: #b08b6f;
            display: block;
            border-radius: 5px;
            transition: width 0.4s ease; /* nice animation */
          }

          .cart-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 40px;
          }

          .cart-head {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            font-weight: 600;
            padding-bottom: 15px;
            border-bottom: 1px solid #ddd;
          }

          .cart-item {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            padding: 30px 0;
            border-bottom: 1px solid #eee;
          }

          .product-info {
            display: flex;
            gap: 20px;
          }

          .product-info img {
            width: 80px;
          }

          .price {
            color: #b08b6f;
          }

          .qty-control {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .qty-control button {
            border: 1px solid #ddd;
            background: none;
            padding: 5px 10px;
          }

          .delete-btn {
            border: none;
            background: none;
            cursor: pointer;
          }

          .item-total {
            text-align: right;
            color: #b08b6f;
          }

          .cart-right {
            background: #faf6f2;
            padding: 35px;
            width: 100%;
            top: 120px;
            align-self: flex-start;
          }

          .cart-right h2 {
            color: #b08b6f;
          }

          .checkout-btn {
            width: 100%;
            background: #b08b6f;
            color: white;
            padding: 15px;
            border: none;
            margin-top: 20px;
          }

          .checkout-btn a{
            color: white;
          }

          .cart-bottom {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
            margin-bottom: 30px;
          }

          .discount-box {
            display: flex;
          }

          .discount-box input {
            padding: 10px;
            border: 1px solid #ddd;
          }

          .discount-box button {
            background: #b08b6f;
            color: white;
            border: none;
            padding: 10px 15px;
          }

          .return-btn {
            background: #b08b6f;
            color: white;
            border: none;
            padding: 12px 25px;
          }

          .return-btn a{
            color: white;
          }

          .instructions textarea {
            width: 100%;
            height: 120px;
            margin-top: 10px;
            border: 1px solid #ddd;
            padding: 10px;
          }

          .product-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .product-text h4 {
            font-size: 18px;
            margin: 0 0 6px;
            font-weight: 500;
          }

          .product-text .price {
            font-size: 15px;
            color: #b08b6f;
            margin-bottom: 6px;
          }

          .product-text .color {
            font-size: 14px;
            color: #000;
          }

          .qty-control button:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }
        `}
      </style>
      {/* HEADER */}
      <section className="wishlist-header">
        <div className="wishlist-header-content">
          <div className="breadcrumb-text">HOME - YOUR SHOPPING CART</div>
          <h1>Your Shopping Cart</h1>
        </div>
      </section>

      {/* EMPTY CART */}
      {cart.length === 0 ? (
        <h5 style={{padding: "5% 40% 5%"}}>Your cart is empty <a href="/">return to store</a></h5>
      ) : (
        <div className="container cart-wrapper">

            {/* FREE SHIPPING BAR */}
            <div className="free-ship">
              <p>
                {remaining > 0
                  ? `SPEND RS. ${remaining.toFixed(2)} MORE AND GET FREE SHIPPING!`
                  : "YOU GOT FREE SHIPPING 🎉"}
              </p>
              <div className="free-ship-bar">
                <div
                  className="free-ship-progress"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="truck-wrapper">
                    <LocalShippingIcon className="truck-icon" />
                  </div>
                </div>
              </div>

            </div>

            <div className="cart-grid">
                
                {/* LEFT: CART ITEMS */}
                <div className="cart-left">
                <div className="cart-head">
                    <span>Product</span>
                    <span>Quantity</span>
                    <span style={{textAlign: "right"}}>Total</span>
                </div>

                {cart.map((item) => (
                    <div className="cart-item" key={item.ProductID}>

                        {/* PRODUCT COLUMN */}
                        <div className="product-info">
                        <img
                            src={`http://localhost:5000/images/Jewelry/${item.prod_image}`}
                            alt={item.prod_title}
                        />

                        <div className="product-text">
                            <h4>{item.prod_title}</h4>
                            <p className="price">Rs. {Number(item.prod_price).toFixed(2)}</p>
                            <p className="color">Color: Gold</p>
                        </div>
                        </div>

                        {/* QUANTITY COLUMN */}
                        <div className="qty-control">
                        <button disabled={item.Quantity === 1} onClick={() => updateQty(item.ProductID, item.Quantity - 1)}>
                            -
                        </button>

                        <span>{item.Quantity}</span>

                        <button onClick={() => updateQty(item.ProductID, item.Quantity + 1)}>
                            +
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() => removeItem(item.ProductID)}
                        >
                            🗑
                        </button>
                        </div>

                        {/* TOTAL COLUMN */}
                        <div className="item-total">
                          Rs. {(Number(item.prod_price) * Number(item.Quantity)).toFixed(2)}
                        </div>
                    </div>
                ))}

                {/* DISCOUNT + NOTE */}
                <div className="cart-bottom">
                    <div className="discount-box">
                    <input type="text" placeholder="Discount code" />
                    <button>→</button>
                    </div>

                    <button className="return-btn"><a href="/">RETURN TO STORE</a></button>
                </div>

                <div className="instructions">
                    <h4>Order special instructions</h4>
                    <textarea placeholder="Order special instructions"></textarea>
                </div>
                </div>

                {/* RIGHT: SUMMARY */}
                <div className="cart-right">
                <h3>Subtotal</h3>
                <h2>Rs. {subtotal.toFixed(2)}</h2>
                <p>Taxes, discounts and shipping calculated at checkout.</p>
                <button className="checkout-btn"><a href="/Checkout">CHECKOUT</a></button>
                </div>

            </div>
        </div>
      )}
    </>
  );
}
