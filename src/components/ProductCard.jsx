// import React from 'react'

// // receive product information and color as props
// const ProductCard = ({ productInformation, color }) => {
//     return (
//         <>
//             <div class="card" style={{ width: '15rem' }}>
//                 <span style={{ backgroundColor: color }} className="badge position-absolute top-0">{productInformation.productCategory}</span>
//                 <img src={`http://localhost:5000/products/${productInformation.productImage}`} class="card-img-top" alt="..."  style= {{height: '15rem'}} />
//                 <div class="card-body">
//                     <div class="d-flex justify-content-between">
//                         <h5 class="card-title">{productInformation.productName}</h5>
//                         <h5 class="card-title text-danger">NPR. {productInformation.productPrice}</h5>
//                     </div>
//                     <p class="card-text">{productInformation.productDescription.slice(0, 30)}</p>
//                     <a href="#" class="btn btn-outline-dark w-100">View More</a>
//                 </div>
//             </div>

//         </>
//     )
// }

// export default ProductCard



import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ productInformation, color }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/product/${productInformation._id}`);
  };

  return (
    <div className="card" style={{ width: "15rem" }}>
      <span
        style={{ backgroundColor: color }}
        className="badge position-absolute top-0"
      >
        {productInformation.productCategory}
      </span>
      <img
        src={`http://localhost:5000/products/${productInformation.productImage}`}
        className="card-img-top"
        alt={productInformation.productName}
        style={{ height: "15rem" }}
      />
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{productInformation.productName}</h5>
          <h5 className="card-title text-danger">
            NPR. {productInformation.productPrice}
          </h5>
        </div>
        <p className="card-text">
          {productInformation.productDescription.slice(0, 30)}
        </p>
        <button
          className="btn btn-outline-dark w-100"
          onClick={handleViewMore}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
