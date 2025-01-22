import React from "react";
import { useLocation } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const { productImage, productCategory, productPrice } = location.state || {};

  return (
    <div className="checkout-container">
      <div className="checkout-main">
        {/* Left Column (Table) */}
        <div className="checkout-table">
          <table>
            <thead>
              <tr>
                <th className="table-header">Product Image</th>
                <th className="table-header">Product Category</th>
                <th className="table-header">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src={`http://localhost:5000/products/${productImage}`}
                    alt="Product"
                    className="product-image"
                  />
                </td>
                <td>{productCategory}</td>
                <td>{productPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Column (Subtotal, Total, Pay Now Button) */}
        <div className="checkout-summary">
          <div className="summary-box">
            <div className="summary-row">
              <h4>Subtotal: NPR {productPrice}</h4>
              <h4>Total: NPR {productPrice}</h4>
            </div>
            <form
              action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
              method="POST"
              target="_blank"
            >
              <input type="hidden" name="total_amount" value={productPrice} />
              <input type="hidden" name="transaction_uuid" value="example-uuid" />
              <input type="hidden" name="product_code" value="EPAYTEST" />
              <input type="hidden" name="signature" value="example-signature" />
              <button type="submit" className="pay-now-btn">
                Pay Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
