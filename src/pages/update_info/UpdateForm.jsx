// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { updateInfo } from "../../apis/Api"; // API call

// const UpdateInformation = () => {
//   const [formData, setFormData] = useState({
//     fName: '',
//     lName: '',
//     number: '',
//     email: '',
//   });

//   // Fetch user info on component mount
//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           toast.error("Please log in first.");
//           return;
//         }

//         const res = await updateInfo(token); // API call to fetch user data
//         const user = res.data.user;  // Assuming the response has `user` data
//         setFormData({
//           fName: user.fName,
//           lName: user.lName,
//           number: user.number,
//           email: user.email,
//         });
//       } catch (error) {
//         console.error("Error fetching user info:", error);
//       }
//     };

//     fetchUserInfo();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please log in first.");
//       return;
//     }

//     try {
//       const res = await updateInfo(formData, token); // API call to update user data
//       if (res.status === 200) {
//         toast.success("Information updated successfully!");
//       }
//     } catch (error) {
//       console.error("Error updating user info:", error);
//       toast.error("Failed to update information.");
//     }
//   };

//   return (
//     <div className="container mt-3">
//       <h2>Update Personal Information</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="fName">First Name</label>
//         <input
//           type="text"
//           id="fName"
//           name="fName"
//           value={formData.fName}
//           onChange={handleChange}
//           className="form-control"
//           placeholder="Enter your first name"
//           required
//         />

//         <label htmlFor="lName" className="mt-2">Last Name</label>
//         <input
//           type="text"
//           id="lName"
//           name="lName"
//           value={formData.lName}
//           onChange={handleChange}
//           className="form-control"
//           placeholder="Enter your last name"
//           required
//         />

//         <label htmlFor="number" className="mt-2">Phone Number</label>
//         <input
//           type="tel"
//           id="number"
//           name="number"
//           value={formData.number}
//           onChange={handleChange}
//           className="form-control"
//           placeholder="Enter your phone number"
//           required
//         />

//         <label htmlFor="email" className="mt-2">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           className="form-control"
//           placeholder="Enter your email"
//           required
//         />

//         <button type="submit" className="btn btn-primary w-100 mt-3">
//           Update Information
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateInformation;

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateInfo } from "../../apis/Api"; 
import UserNavbar from "../../components/user_navbar/UserNavbar";

const UpdateInformation = () => {
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    number: '',
    email: '',
  });

  // Fetch user info on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Please log in first.");
          return;
        }

        const res = await updateInfo(token); // API call to fetch user data
        const user = res.data.user;  // Assuming the response has `user` data
        setFormData({
          fName: user.fName,
          lName: user.lName,
          number: user.number,
          email: user.email,
        });
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first.");
      return;
    }

    try {
      const res = await updateInfo(formData, token); // API call to update user data
      if (res.status === 200) {
        toast.success("Information updated successfully!");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      toast.error("Failed to update information.");
    }
  };

  return (
    <>
      <UserNavbar /> 
      <div className="container mt-3">
        <h2>Personal Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="fName">First Name</label>
              <input
                type="text"
                id="fName"
                name="fName"
                value={formData.fName}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="lName">Last Name</label>
              <input
                type="text"
                id="lName"
                name="lName"
                value={formData.lName}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-6">
              <label htmlFor="number">Phone Number</label>
              <input
                type="tel"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100 mt-3"
            style={{
              backgroundColor: '#003366', // Navy blue color
              color: 'white',
              border: 'none',
              padding: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            Update 
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateInformation;
