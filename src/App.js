
import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import './App.css';


// Toast Config
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/login/login';
import UserDashboard from './pages/user_dashbaord/UserDashboard';
import Register from './pages/register/register';
import UpdateProduct from './pages/admin/update_product/UpdateProduct';
import AdminDashboard from './pages/admin/admin_dashboard/AdminDashboard';
import AdminRoutes from './pages/protected_routes/AdminRoutes';




// Import CartProvider

function App() {
  return (
      <Router>
        <ToastContainer />
        <Routes>
          {/* Initial Routes */}
          
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<UserDashboard />} />
          {/* <Route path='/product/:id' element={<ProductDetails />} /> */}


          {/* admin */}
          { <Route element={<AdminRoutes />}>
          <Route path='/admin/dashboard' element={< AdminDashboard />} />
          <Route path='/admin/update/:id' element={<UpdateProduct />} />
          
          </Route>
           }

          </Routes>
      </Router>
      );
      }
          



export default App;
