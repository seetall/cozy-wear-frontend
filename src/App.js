
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
import ProductDetail from './pages/product_detail/ProductDetail';
import Quiz from './pages/quiz/Quiz';
import QuizResults from './pages/quiz/QuizResult';
import UpdateForm from './pages/update_info/UpdateForm';
import Esewa from './Esewa/Esewa';
import BuyNowPage from './buy_now/BuyNowPage';
import Checkout from './checkout/Checkout';




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
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/quiz-results?color=${answers.color}&style=${answers.style}&size=${answers.size}/' element={<QuizResults />} />
          <Route path='/profile' element={<UpdateForm />} />
          <Route path="/buy_now/:id" element={<BuyNowPage />} />
          <Route path="/esewa" element={<Esewa />} />
          <Route path="/checkout" element={<Checkout />} />





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
