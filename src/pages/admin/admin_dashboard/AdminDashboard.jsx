import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminNavbar from '../../../components/admin_navbar/AdminNavbar';
import { createProduct, deleteProduct, getAllProducts } from '../../../apis/Api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [productImage, setProductImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const productsPerPage = 9;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchProducts();
    }
  }, [token, navigate, currentPage]);

  const fetchProducts = () => {
    setLoading(true);
    getAllProducts(currentPage, productsPerPage)
      .then((res) => {
        if (res.data.products.length === 0) {
          setError('No products found.');
        } else {
          setProducts(res.data.products);
          setTotalPages(res.data.pagination.totalPages);
          setError('');
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName || !productPrice || !productCategory || !size || !color || !productImage || !productDescription) {
      toast.warning('Please fill out all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productPrice', productPrice);
    formData.append('productCategory', productCategory);
    formData.append('size', size);
    formData.append('color', color);
    formData.append('productImage', productImage);
    formData.append('productDescription', productDescription);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    createProduct(formData, config)
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message);
          setIsModalOpen(false);
          fetchProducts();
          setProductName('');
          setProductPrice('');
          setProductCategory('');
          setSize('');
          setColor('');
          setProductImage('');
          setPreviewImage('');
          setProductDescription('');
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.warning(error.response.data.message || 'Invalid data received.');
        } else if (error.response && error.response.status === 500) {
          toast.error(error.response.data.message || 'Server error.');
        } else {
          toast.error('Something went wrong!');
        }
      });
  };

  const handleDelete = (productId) => {
    deleteProduct(productId)
      .then(() => {
        toast.success('Product deleted successfully.');
        fetchProducts();
      })
      .catch((error) => {
        toast.error('Error deleting product.');
        console.error(error);
      });
  };

  return (
    <>
      {/* Navbar */}
      <AdminNavbar />

      {/* Main Content */}
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Admin Dashboard</h3>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => setIsModalOpen(true)}
          >
            Add Product
          </button>
        </div>

        {/* Modal */}
        <div
          className={`modal ${isModalOpen ? 'show' : ''}`}
          style={{ display: isModalOpen ? 'block' : 'none' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add a New Product</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <label>Product Name</label>
                  <input
                    onChange={(e) => setProductName(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter product name"
                    required
                  />
                  <label className="mt-3">Choose Product Category</label>
                  <select
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="form-control"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </select>
                  <label className="mt-3">Product Price</label>
                  <input
                    onChange={(e) => setProductPrice(e.target.value)}
                    type="number"
                    className="form-control"
                    placeholder="Enter price"
                    required
                  />
                  <label className="mt-3">Product Size</label>
                  <input
                    onChange={(e) => setSize(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter size (e.g., S, M, L, XL)"
                    required
                  />
                  <label className="mt-3">Product Color</label>
                  <input
                    onChange={(e) => setColor(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter colors separated by commas (e.g., red, blue, green)"
                    required
                  />
                  <label className="mt-3">Product Image</label>
                  <input
                    onChange={handleImage}
                    type="file"
                    className="form-control"
                    required
                  />
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="img-fluid mt-2"
                      style={{ maxHeight: '150px' }}
                    />
                  )}
                  <label className="mt-3">Product Description (Max 500 words)</label>
                  <textarea
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="form-control"
                    placeholder="Enter product description"
                    value={productDescription}
                    maxLength="500"
                    rows="4"
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div className="mt-4">
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Color</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {
              products.map((singleProduct) => (
                <tr>
                  <td><img width={'40px'} height={'40px'} src={`http://localhost:5000/products/${singleProduct.productImage}`} alt="" /></td>
                  <td>{singleProduct.productName}</td>
                  <td>{singleProduct.productPrice}</td>
                  <td>{singleProduct.productCategory}</td>
                  <td>{singleProduct.productDescription}</td>
                  <td>
                      <div className="color-swatches">
                        {singleProduct.color.map((color, index) => (
                          <span
                            key={index}
                            className="color-circle"
                            style={{
                              display: 'inline-block',
                              width: '15px',
                              height: '15px',
                              borderRadius: '50%',
                              backgroundColor: color.trim(),
                              marginRight: '5px',
                            }}
                          ></span>
                        ))}
                      </div>
                    </td>
                    <td>{singleProduct.productDescription}</td>
                    <td>
                      <Link
                        to={`/admin/update/${singleProduct._id}`}
                        className="me-2"
                      >
                        <i
                          className="fas fa-edit text-primary"
                          title="Edit"
                          style={{ cursor: 'pointer' }}
                        ></i>
                      </Link>
                      <i
                        className="fas fa-trash text-danger"
                        title="Delete"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDelete(singleProduct._id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
