import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../apis/Api";
import "./UserDashboard.css"; 
import ProductCard from "../../components/ProductCard";
import UserNavbar from "../../components/user_navbar/UserNavbar";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const productsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = (page) => {
    setLoading(true);
    getAllProducts(page, productsPerPage)
      .then((res) => {
        if (res.data.products.length === 0) {
          setError("No products found.");
        } else {
          setProducts(res.data.products);
          setTotalPages(res.data.pagination.totalPages);
          setError("");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
        setError("Failed to fetch products.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <UserNavbar />
      <div className="container">
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
             <div className="carousel-item active">
               <img
                src="https://img.freepik.com/free-vector/horizontal-sale-banner-template_23-2148897328.jpg"
                className="d-block w-100"
                alt="Fashion Sale Banner"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Exclusive Collection</h5>
                <p>Shop the latest trends now!</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://marketplace.canva.com/EAFGKRRskMs/1/0/1600w/canva-brown-and-beige-minimalist-fashion-banner-lYcbGpUSVGo.jpg"
                className="d-block w-100"
                alt="Seasonal Sale Banner"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Seasonal Sale</h5>
                <p>Get up to 50% off on selected items!</p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
        
    
      <div className="container mt-3">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <>
            {error ? (
              <p>{error}</p>
            ) : (
              <>
                <div className="row">
                {
                        products.map((singleProduct) => (
                            <div class="col">
                                <ProductCard productInformation={singleProduct} color={'red' } /> 
                                {/* // sending product information */}
                            </div>

                        ))
                    }
                </div>
                <nav aria-label="Product navigation">
                  <ul className="pagination justify-content-center mt-4">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={handlePrevPage}>Previous</button>
                    </li>
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={handleNextPage}>Next</button>
                    </li>
                  </ul>
                </nav>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UserDashboard;
