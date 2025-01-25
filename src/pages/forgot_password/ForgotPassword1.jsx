import React, { useState } from "react";
import { toast } from "react-toastify";
import { forgotPasswordApi, verifyOtpApi } from "../../apis/Api";
import passwordImage from "../../../src/assets/pw.jpg"; // Import the image
import "./ForgotPassword1.css"; // Import CSS for styling

const ForgotPassword1 = () => {
  const [number, setNumber] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Send OTP function
  const handleSendOtp = (e) => {
    e.preventDefault();
    forgotPasswordApi({ number })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setIsSent(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 400 || 500) {
          toast.error(error.response.data.message);
        }
      });
  };

  // Verify OTP and set password
  const handleVerifyOtp = (e) => {
    e.preventDefault();

    const data = {
      number: number,
      otp: otp,
      newPassword: newPassword,
    };

    verifyOtpApi(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        if (error.response.status === 400 || 500) {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <div className="forgot-password-container">
      {/* Left Half - Image */}
      <div className="forgot-password-image">
        <img src={passwordImage} alt="Password Reset" />
      </div>

      {/* Right Half - Form */}
      <div className="forgot-password-form">
        <h3>Forgot Password</h3>
        <p>Enter your registered phone number. We’ll send you a code to reset your password.</p>
        <form>
          <div className="form-group">
            <div className="phone-input d-flex">
              <h4 className="country-code">+977</h4>
              <input
                disabled={isSent}
                onChange={(e) => setNumber(e.target.value)}
                type="number"
                className="form-control"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
          <button
            disabled={isSent}
            onClick={handleSendOtp}
            className="btn btn-custom mt-2"
          >
            Send OTP
          </button>

          {isSent && (
            <>
              <hr />
              <p>OTP has been sent to {number} ✅</p>
              <input
                onChange={(e) => setOtp(e.target.value)}
                type="number"
                className="form-control mt-2"
                placeholder="Enter your OTP"
              />
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                className="form-control mt-2"
                placeholder="Enter your new password"
              />
              <button
                onClick={handleVerifyOtp}
                className="btn btn-primary mt-2 w-100"
              >
                Verify OTP & Set Password
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword1;

