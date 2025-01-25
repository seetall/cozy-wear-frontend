import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";
import "./BuyNowPage.css";

const BuyNowPage = () => {
  const location = useLocation();
  const { product } = location.state || {};

  const [formData, setFormData] = useState({
    amount: product ? product.productPrice : "",
    tax_amount: "0",
    total_amount: product ? product.productPrice : "",
    transaction_uuid: "",
    product_code: "EPAYTEST",
    product_service_charge: "0",
    product_delivery_charge: "0",
    success_url: "https://google.com",
    failure_url: "https://facebook.com",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
  });

  const generateSignature = () => {
    const currentTime = new Date();
    const formattedTime =
      currentTime.toISOString().slice(2, 10).replace(/-/g, "") +
      "-" +
      currentTime.getHours() +
      currentTime.getMinutes() +
      currentTime.getSeconds();

    const newFormData = {
      ...formData,
      transaction_uuid: formattedTime,
    };

    const { total_amount, transaction_uuid, product_code, secret } = newFormData;
    const hash = CryptoJS.HmacSHA256(
      `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`,
      secret
    );
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    setFormData({
      ...newFormData,
      signature: hashInBase64,
    });
  };

  useEffect(() => {
    if (product) {
      generateSignature();
    }
  }, [product]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="buy-now">
      <h2>Buy Now</h2>
      {product.productImage && (
        <img
          src={`http://localhost:5000/products/${product.productImage}`}
          alt={product.productName}
          className="product-image"
        />
      )}
      <div className="product-info">
        <p><strong>Product:</strong> {product.productName}</p>
        <p><strong>Price:</strong> Rs. {product.productPrice}</p>
      </div>

      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
        target="_blank"
      >
        {Object.entries(formData).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}
        <button type="submit" className="btn btn-success">
          Pay Rs. {product.productPrice} with eSewa
        </button>
      </form>
    </div>
  );
};

export default BuyNowPage;

