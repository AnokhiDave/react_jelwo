import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Checkout() {
  const [deliveryType, setDeliveryType] = useState("ship");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [cardNumber, setCardNumber] = useState("");

  const [user, setUser] = useState(null);

  // =============================
  // Safe subtotal calculation
  // =============================
  const subtotal =
    products?.reduce((acc, item) => {
      const price = item?.price || item?.prod_price || 0;
      const qty = item?.qty || item?.Quantity || 0;
      return acc + price * qty;
    }, 0) || 0;

  const taxes = subtotal * 0.18;
  const total = subtotal + taxes;

  useEffect(() => {
    fetchCart();
    fetchAddresses();
    fetchUser();
  }, []);

  // =============================
  // Fetch User
  // =============================
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      // If backend returns plain object:
      setUser(res.data?.user || res.data);

    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // =============================
  // Fetch Addresses
  // =============================
  const fetchAddresses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/addresses",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      const addressList = res.data?.addresses || res.data || [];
      setAddresses(addressList);

      // Auto select default
      const defaultAddress = addressList.find(
        (a) => a.IsDefault === 1 || a.isDefault === 1
      );

      if (defaultAddress) {
        setSelectedAddressId(
          defaultAddress.AddressID || defaultAddress.id
        );
      }

    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  // =============================
  // Fetch Cart
  // =============================
  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/cart",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setProducts(res.data?.items || res.data || []);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching cart:", error);
      setProducts([]);
      setLoading(false);
    }
  };

  // =============================
  // Place Order
  // =============================
  const handlePlaceOrder = async () => {

    console.log("Selected Address:", selectedAddressId);
    console.log("Card Number:", cardNumber);

    if (!selectedAddressId) {
      alert("Please select address");
      return;
    }

    if (!cardNumber) {
      alert("Please enter card number");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/order/checkout",
        {
          addressId: selectedAddressId,
          cardNumber: cardNumber,
          subtotal,
          shipping: 0,
          total
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Order placed successfully!");
      fetchCart();

    } catch (error) {
      console.error("Order error:", error.response?.data || error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };


  return (
    <>
      {/* Internal CSS */}
      <style>{`
        .checkout-container {
          min-height: 100vh;
          background: white;
        }
        .checkout-card {
          border-radius: 12px;
        }
        .summary-card {
          border-radius: 12px;
          position: sticky;
          top: 20px;
          background: #fafafa;
        }
        .pay-btn {
          border-radius: 8px;
          font-weight: 500;
        }
      `}</style>

      <div className="container-fluid checkout-container py-5">
        <div className="container">
          <div className="row g-4">

            {/* LEFT SIDE */}
            <div className="col-lg-7">
              <div className="p-4 checkout-card">
                <h3 className="mb-4">Checkout</h3>

                {/* User */}
                <div className="d-flex align-items-center gap-3 border-bottom pb-3 mb-4">
                  <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}>
                    U
                  </div>
                  <div>{user?.email || user?.Email}</div>
                </div>

                {/* Delivery */}
                <div className="mb-4">
                  <h6 className="mb-3 text-muted">Delivery</h6>

                  <div className="border rounded p-3">

                    {/* Ship Option */}
                    <div
                      className={`d-flex justify-content-between align-items-center p-2 rounded mb-2 ${
                        deliveryType === "ship" ? "bg-light border border-primary" : ""
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => setDeliveryType("ship")}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="radio"
                          checked={deliveryType === "ship"}
                          readOnly
                        />
                        <span>Ship</span>
                      </div>
                      <i className="bi bi-truck"></i>
                    </div>

                    {/* Pick Up Option */}
                    <div
                      className={`d-flex justify-content-between align-items-center p-2 rounded ${
                        deliveryType === "pickup" ? "bg-light border border-primary" : ""
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => setDeliveryType("pickup")}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="radio"
                          checked={deliveryType === "pickup"}
                          readOnly
                        />
                        <span>Pick up</span>
                      </div>
                      <i className="bi bi-shop"></i>
                    </div>

                  </div>
                </div>

                {/* Addresses */}
                {/* Ship To */}
                {deliveryType === "ship" && (
                  <div className="mb-4">
                    <h6 className="mb-3 text-muted">Ship to</h6>

                    {addresses.length === 0 ? (
                      <div className="text-muted">No address found</div>
                    ) : (
                      addresses.map((addr) => {
                        const id = addr.AddressID || addr.id;

                        return (
                          <div
                            key={id}
                            className={`border rounded p-3 mb-2 ${
                              selectedAddressId === id
                                ? "border-primary bg-light"
                                : ""
                            }`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setSelectedAddressId(id)}
                          >
                            <div className="d-flex justify-content-between">
                              <div>
                                <div className="fw-semibold">
                                  {addr.FirstName || addr.firstName}{" "}
                                  {addr.LastName || addr.lastName}
                                </div>
                                <div className="text-muted small">
                                  {addr.Address1 || addr.addressLine1},{" "}
                                  {addr.City || addr.city},{" "}
                                  {addr.State || addr.state},{" "}
                                  {addr.PostalCode || addr.pincode}
                                </div>
                              </div>

                              <input
                                type="radio"
                                checked={selectedAddressId === id}
                                readOnly
                              />
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}

                {/* Shipping Method */}
                {deliveryType === "ship" && (
                  <div className="mb-4">
                    <h6 className="mb-3 text-muted">Shipping method</h6>

                    <div className="border rounded p-3 d-flex justify-content-between">
                      <span>Standard</span>
                      <span className="fw-semibold">FREE</span>
                    </div>
                  </div>
                )}
                
                {/* Payment */}
                <div className="mb-4">
                  <h5 className="mb-1">Payment</h5>
                  <div className="text-muted small mb-3">
                    All transactions are secure and encrypted.
                  </div>

                  <div className="border rounded p-3">

                    <div className="mb-3 fw-semibold">
                      Credit card
                    </div>
                    
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Card number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MM / YY"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="CVC"
                        />
                      </div>
                    </div>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name on card"
                    />
                  </div>
                </div>

                {/* Billing Address */}
                <div className="mb-4">
                  <h5 className="mb-3">Billing Address</h5>

                  <select className="form-select mb-3">
                    <option>India</option>
                    <option>USA</option>
                  </select>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Address"
                  />

                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Apartment, suite (optional)"
                  />

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="City"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="State"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="PIN code"
                      />
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-primary w-100 py-2 pay-btn"
                  onClick={handlePlaceOrder}
                  disabled={!selectedAddressId || products.length === 0}
                >
                  Pay now
                </button>

              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-lg-5">
              <div className="shadow-sm p-4 summary-card">
                <h5 className="mb-4 fw-semibold">Order summary</h5>

                {loading ? (
                  <div className="text-center py-5">Loading cart...</div>
                ) : products.length === 0 ? (
                  <div className="text-center py-5">Your cart is empty</div>
                ) : (
                  <>
                    {products.map((item, index) => {
                      const price = item?.price || item?.prod_price || 0;
                      const qty = item?.qty || item?.Quantity || 0;
                      const name = item?.name || item?.prod_title || "Product";
                      const image =
                        item?.image || item?.prod_image || "";

                      return (
                        <div
                          key={item.id || item._id || index}
                          className="d-flex justify-content-between align-items-start mb-4"
                        >
                          <div className="d-flex gap-3">
                            <div className="position-relative">
                              <img
                                src={`http://localhost:5000/images/Jewelry/${item.prod_image}`}
                                width="60"
                                alt=""
                              />
                            
                              <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"
                                style={{ fontSize: "12px" }}
                              >
                                {qty}
                              </span>
                            </div>

                            <div>
                              <div className="fw-semibold">{name}</div>
                            </div>
                          </div>

                          <div className="fw-semibold">
                            ₹{(price * qty).toFixed(2)}
                          </div>
                        </div>
                      );
                    })}

                    <hr />

                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <span>Shipping</span>
                      <span>FREE</span>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                      <span>Estimated taxes</span>
                      <span>₹{taxes.toFixed(2)}</span>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-between fw-bold fs-5">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
