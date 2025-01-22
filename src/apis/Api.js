import axios from 'axios';

const Api= axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});


const config = {
    headers: {
'Authorization' : `Bearer ${localStorage.getItem('token')}`,
    },
};


// test api
export const testApi = () => Api.get('/test');

// register
export const register = (data) => Api.post('/api/user/create', data);
//  login
export const login = (data) => Api.post('/api/user/login', data);

// create product
export const createProduct = (data) => Api.post('/api/product/create', data)

export const getAllProducts = (page, limit) => Api.get(`/api/product/get_all_products?page=${page}&limit=${limit}`, config);

export const getSingleProduct = (id) => Api.get(`/api/product/get_single_product/${id}`, config);


// Delete single product API {ID is important}
export const deleteProduct = (id) => Api.delete(`/api/product/delete_product/${id}`, config);

// Update product
export const updateProduct = (id, data) => Api.put(`/api/product/update_product/${id}`, data, config);

// export const updateInfo = (id,data) =>Api.put('/api/user/profile', data, config)


export const updateInfo = async (data, token) => {
    try {
      const res = await Api.put('/api/user/profile', data, {
        headers: {
          Authorization: `Bearer ${token}`, // Sending the JWT token
        }
      });
      return res;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };
  