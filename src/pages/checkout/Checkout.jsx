// import React from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import "./Checkout.css";

// const Checkout = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { productImage, productCategory, productPrice } = location.state || {};

//   const handleBuyNow = () => {
//     navigate(`/buy_now/${id}`);
//   };

//   return (
//     <div className="checkout-container">
//       <div className="checkout-main">
//         {/* Left Column (Table) */}
//         <div className="checkout-table">
//           <table>
//             <thead>
//               <tr>
//                 <th className="table-header">Product Image</th>
//                 <th className="table-header">Product Category</th>
//                 <th className="table-header">Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>
//                   <img
//                     src={`http://localhost:5000/products/${productImage}`}
//                     alt="Product"
//                     className="product-image"
//                   />
//                 </td>
//                 <td>{productCategory}</td>
//                 <td>{productPrice}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Right Column (Subtotal, Total, Pay Now Button) */}
//         <div className="checkout-summary">
//           <div className="summary-box">
//             <div className="summary-row">
//               <h4>Subtotal: NPR {productPrice}</h4>
//               <h4>Total: NPR {productPrice}</h4>
//             </div>
            
//               <button type="submit" className="pay-now-btn" onClick={handleBuyNow}>
//                 Pay Now
//               </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;


// src/pages/checkout/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const Checkout = () => {
  const { id } = useParams(); // Retrieve the product ID from the URL
  const location = useLocation(); // Access the location object to get state data
  const { product } = location.state || {}; // Retrieve the product data passed through state

  const [checkoutProduct, setCheckoutProduct] = useState(product || {}); // Set the product data

  useEffect(() => {
    if (product) {
      setCheckoutProduct(product); // Set product if passed in state
    }
  }, [product]);

  if (!checkoutProduct || !id) {
    return <p>Loading...</p>; // Show a loading message if the product data is not available
  }

  return (
    <div className="checkout-container">
      <div className="checkout-main">
        {/* Left Column (Table displaying product details) */}
        <div className="checkout-table">
          <table>
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Category</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src={`http://localhost:5000/products/${checkoutProduct.image}`}
                    alt="Product"
                    className="product-image"
                  />
                </td>
                <td>{checkoutProduct.category}</td>
                <td>{checkoutProduct.price}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Column (Summary and payment) */}
        <div className="checkout-summary">
          <div className="summary-box">
            <div className="summary-row">
              <h4>Subtotal: NPR {checkoutProduct.price}</h4>
              <h4>Total: NPR {checkoutProduct.price}</h4>
            </div>
            <button type="submit" className="pay-now-btn">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
