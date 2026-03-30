import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./Pages/Home.jsx";
import Products from "./Pages/Products.jsx";
import ProductDetails from "./Pages/Productdetails.jsx";
import Blogs from "./Pages/Blogs.jsx";
import BlogDetails from "./Pages/BlogDetails.jsx";
import Aboutus from "./Pages/AboutUs.jsx";
import Contact from "./Pages/Contact.jsx";
import FAQs from "./Pages/FAQs.jsx";
import Privacy from "./Pages/Privacy.jsx";
import Terms from "./Pages/Terms.jsx";
import Shipping from "./Pages/Shipping.jsx";
import Location from "./Pages/Location.jsx";
import Refund from "./Pages/Refund.jsx";
import Wishlist from "./Pages/Wishlist.jsx";
import Cart from "./Pages/Cart.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Profile from "./Pages/Profile.jsx";
import Address from "./Pages/Address.jsx";
import Checkout from "./Pages/Checkout.jsx";
import SearchResults from "./Pages/SearchResults";

import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Listen for login/logout events
  useEffect(() => {
    const updateAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("auth:changed", updateAuth);

    return () => {
      window.removeEventListener("auth:changed", updateAuth);
    };
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/"
          element={
            isLoggedIn ? <Home /> : <Navigate to="/login" replace />
          }
        />

        {/* Public Route */}
        <Route path="/login" element={ isLoggedIn ? <Navigate to="/profile" replace /> : <Login />}/>

        {/* Protected Route */}
        <Route path="/profile" element={ <ProtectedRoute> <Profile /> </ProtectedRoute>}/>

        <Route path="/Register" element={<Register />} />
        <Route path="/Address" element={<Address />} />

        {/* PRODUCTS */}
        <Route path="/Products" element={<Products />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/search" element={<SearchResults />} />

        {/* BLOG */}
        <Route path="/Blogs" element={<Blogs />} />
        <Route path="/BlogDetails/:id" element={<BlogDetails />} />

        {/* PAGES */}
        <Route path="/Aboutus" element={<Aboutus />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/FAQs" element={<FAQs />} />
        <Route path="/Privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/location" element={<Location />} />
        <Route path="/refund" element={<Refund />} />
        
        {/* OTHER */}
        {/* <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} /> */}

        <Route path="/checkout" element={ <ProtectedRoute> <Checkout /> </ProtectedRoute>}/>
        <Route path="/Cart" element={ <ProtectedRoute> <Cart /> </ProtectedRoute>}/>
        <Route path="/Wishlist" element={ <ProtectedRoute> <Wishlist /> </ProtectedRoute>}/>

        {/* 404 */}
        <Route path="*" element={ <h2 style={{ textAlign: "center", marginTop: "100px" }}> Page Not Found </h2>}/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;