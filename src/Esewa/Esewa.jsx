import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const Esewa = () => {
  const [formData, setFormData] = useState({
    amount: "100",
    tax_amount: "0",
    total_amount: "100",
    transaction_uuid: "11-200-111sss1",
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

    setFormData((prevState) => ({
      ...prevState,
      transaction_uuid: formattedTime,
    }));

    const { total_amount, transaction_uuid, product_code, secret } = formData;
    const hash = CryptoJS.HmacSHA256(
      `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`,
      secret
    );
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    setFormData((prevState) => ({
      ...prevState,
      signature: hashInBase64,
    }));
  };

  useEffect(() => {
    generateSignature();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formData.total_amount,
    formData.transaction_uuid,
    formData.product_code,
    formData.secret,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
      target="_blank"
    >
      <table>
        <tbody>
          <tr>
            <td>
              <strong>Parameter</strong>
            </td>
            <td>
              <strong>Value</strong>
            </td>
          </tr>

          <tr>
            <td>Amount:</td>
            <td>
              <input
                type="text"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </td>
          </tr>

          <tr>
            <td>Tax Amount:</td>
            <td>
              <input
                type="text"
                id="tax_amount"
                name="tax_amount"
                value={formData.tax_amount}
                onChange={handleChange}
                required
              />
            </td>
          </tr>

          <tr>
            <td>Total Amount:</td>
            <td>
              <input
                type="text"
                id="total_amount"
                name="total_amount"
                value={formData.total_amount}
                onChange={handleChange}
                required
              />
            </td>
          </tr>

          <tr>
            <td>Transaction UUID:</td>
            <td>
              <input
                type="text"
                id="transaction_uuid"
                name="transaction_uuid"
                value={formData.transaction_uuid}
                readOnly
                required
              />
            </td>
          </tr>

          <tr>
            <td>Product Code:</td>
            <td>
              <input
                type="text"
                id="product_code"
                name="product_code"
                value={formData.product_code}
                onChange={handleChange}
                required
              />
            </td>
          </tr>

          <tr>
            <td>Product Service Charge:</td>
            <td>
              <input
                type="text"
                id="product_service_charge"
                name="product_service_charge"
                value={formData.product_service_charge}
                onChange={handleChange}
                required
              />
            </td>
          </tr>

          <tr>
            <td>Product Delivery Charge:</td>
            <td>
              <input
                type="text"
                id="product_delivery_charge"
                name="product_delivery_charge"
                value={formData.product_delivery_charge}
                onChange={handleChange}
                required
              />
            </td>
          </tr>

          <tr>
            <td>Success URL:</td>
            <td>
              <input
                type="text"
                id="success_url"
                name="success_url"
                value={formData.success_url}
                onChange={handleChange}
                required
              />
            </td>
          </tr>

          <tr>
            <td>Failure URL:</td>
            <td>
              <input
                type="text"
                id="failure_url"
                name="failure_url"
                value={formData.failure_url}
                onChange={handleChange}
                required
              />
            </td>
          </tr>

          <tr>
            <td>Signed Field Names:</td>
            <td>
              <input
                type="text"
                id="signed_field_names"
                name="signed_field_names"
                value={formData.signed_field_names}
                onChange={handleChange}
                required
              />
            </td>
          </tr>

          <tr>
            <td>Signature:</td>
            <td>
              <input
                type="text"
                id="signature"
                name="signature"
                value={formData.signature}
                readOnly
                required
              />
            </td>
          </tr>

          <tr>
            <td>Secret Key:</td>
            <td>
              <input
                type="text"
                id="secret"
                name="secret"
                value={formData.secret}
                onChange={handleChange}
                required
              />
            </td>
          </tr>
        </tbody>
      </table>
      <input
        value="Pay with eSewa"
        type="submit"
        className="button"
        style={{
          display: "block",
          backgroundColor: "#60bb46",
          cursor: "pointer",
          color: "#fff",
          border: "none",
          padding: "5px 10px",
        }}
      />
    </form>
  );
};

export default Esewa;
