

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getSingleProduct } from "../../apis/Api";
// import { FaCartPlus, FaHeart } from "react-icons/fa"; // Importing icons
// import "./ProductDetail.css";
// import UserNavbar from "../../components/user_navbar/UserNavbar";

// const ProductDetail = () => {
//   const { id } = useParams(); // Product ID from the URL
//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   const fetchProduct = () => {
//     setLoading(true);
//     getSingleProduct(id)
//       .then((res) => {
//         if (res.data.success) {
//           // Access product from the 'products' key
//           setProduct(res.data.products);
//           setError("");
//         } else {
//           setError("Failed to fetch product details.");
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching product:", err);
//         setError("Failed to load product details.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   const handleSizeClick = (size) => {
//     setSelectedSize(size);
//   };

//   const handleColorClick = (color) => {
//     setSelectedColor(color);
//   };

//   const handleOrderNow = () => {
//     if (!selectedSize || !selectedColor) {
//       alert("Please select a size and color before ordering.");
//       return;
//     }
//     alert(
//       `Order placed for ${product.productName} with size ${selectedSize} and color ${selectedColor}.`
//     );
//   };

//   return (
//     <div>
//       <UserNavbar />
//     <div className="container-fluid mt-4">
//       {loading ? (
//         <p>Loading product details...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : product ? (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-start",
//             width: "100%",
//           }}
//         >
//           {/* Left Column */}
//           <div style={{ flex: 1, marginRight: "20px" }}>
//             <img
//               src={`http://localhost:5000/products/${product.productImage}`}
//               alt={product.productName}
//               style={{ width: "100%", height: "auto", display: "block" }}
//             />
//           </div>

//           {/* Right Column */}
//           <div style={{ flex: 1 }}>
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <h2>{product.productName}</h2>
//               <div style={{ marginLeft: "15px" }}>
//                 <FaCartPlus style={{ cursor: "pointer", marginRight: "10px" }} />
//                 <FaHeart style={{ cursor: "pointer" }} />
//               </div>
//             </div>
//             <p>{product.productDescription}</p>
//             <h4>Price: NPR {product.productPrice}</h4>
//             <h5>Category: {product.productCategory}</h5>

//             {/* Size Selection */}
//             <div style={{ marginTop: "20px" }}>
//               <strong>Select Size:</strong>
//               <div style={{ display: "flex", gap: "10px" }}>
//                 {product.size.map((size, idx) => (
//                   <button
//                     key={idx}
//                     style={{
//                       padding: "10px 20px",
//                       border: "1px solid #ccc",
//                       background: selectedSize === size ? "#000" : "#fff",
//                       color: selectedSize === size ? "#fff" : "#000",
//                       cursor: "pointer",
//                     }}
//                     onClick={() => handleSizeClick(size)}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Color Selection */}
//             <div style={{ marginTop: "20px" }}>
//               <strong>Select Color:</strong>
//               <div style={{ display: "flex", gap: "10px" }}>
//                 {product.color.map((color, idx) => (
//                   <div
//                     key={idx}
//                     style={{
//                       width: "30px",
//                       height: "30px",
//                       borderRadius: "50%",
//                       backgroundColor: color,
//                       border:
//                         selectedColor === color
//                           ? "2px solid #000"
//                           : "1px solid #ccc",
//                       cursor: "pointer",
//                     }}
//                     onClick={() => handleColorClick(color)}
//                   ></div>
//                 ))}
//               </div>
//             </div>

//             {/* Order Button */}
//             <button
//               style={{
//                 marginTop: "30px",
//                 width: "100%",
//                 padding: "15px",
//                 background: "navy", // Navy blue button
//                 color: "#fff",
//                 fontSize: "18px",
//                 border: "none",
//                 cursor: "pointer",
//               }}
//               onClick={handleOrderNow}
//             >
//               Order Now
//             </button>
//           </div>
//         </div>
//       ) : (
//         <p>Product not found.</p>
//       )}
//     </div>
//     </div>
//   );
// };

// export default ProductDetail;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { getSingleProduct } from "../../apis/Api";
import { FaCartPlus, FaHeart } from "react-icons/fa"; // Importing icons
import "./ProductDetail.css";
import UserNavbar from "../../components/user_navbar/UserNavbar";

const ProductDetail = () => {
  const { id } = useParams(); // Product ID from the URL
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    setLoading(true);
    getSingleProduct(id)
      .then((res) => {
        if (res.data.success) {
          // Access product from the 'products' key
          setProduct(res.data.products);
          setError("");
        } else {
          setError("Failed to fetch product details.");
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleOrderNow = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select a size and color before ordering.");
      return;
    }
    // Navigate to the checkout page with product details
    navigate("/checkout", {
      state: { 
        productImage: product.productImage,
        productCategory: product.productCategory,
        productPrice: product.productPrice
      },
    });
  };

  return (
    <div>
      <UserNavbar />
      <div className="container-fluid mt-4">
        {loading ? (
          <p>Loading product details...</p>
        ) : error ? (
          <p>{error}</p>
        ) : product ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            {/* Left Column */}
            <div style={{ flex: 1, marginRight: "20px" }}>
              <img
                src={`http://localhost:5000/products/${product.productImage}`}
                alt={product.productName}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>

            {/* Right Column */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2>{product.productName}</h2>
                <div style={{ marginLeft: "15px" }}>
                  <FaCartPlus style={{ cursor: "pointer", marginRight: "10px" }} />
                  <FaHeart style={{ cursor: "pointer" }} />
                </div>
              </div>
              <p>{product.productDescription}</p>
              <h4>Price: NPR {product.productPrice}</h4>
              <h5>Category: {product.productCategory}</h5>

              {/* Size Selection */}
              <div style={{ marginTop: "20px" }}>
                <strong>Select Size:</strong>
                <div style={{ display: "flex", gap: "10px" }}>
                  {product.size.map((size, idx) => (
                    <button
                      key={idx}
                      style={{
                        padding: "10px 20px",
                        border: "1px solid #ccc",
                        background: selectedSize === size ? "#000" : "#fff",
                        color: selectedSize === size ? "#fff" : "#000",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div style={{ marginTop: "20px" }}>
                <strong>Select Color:</strong>
                <div style={{ display: "flex", gap: "10px" }}>
                  {product.color.map((color, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: color,
                        border:
                          selectedColor === color
                            ? "2px solid #000"
                            : "1px solid #ccc",
                        cursor: "pointer",
                      }}
                      onClick={() => handleColorClick(color)}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Order Button */}
              <button
                style={{
                  marginTop: "30px",
                  width: "100%",
                  padding: "15px",
                  background: "navy", // Navy blue button
                  color: "#fff",
                  fontSize: "18px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={handleOrderNow}
              >
                Order Now
              </button>
            </div>
          </div>
        ) : (
          <p>Product not found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
