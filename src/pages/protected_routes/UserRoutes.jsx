// import React from 'react'
// import {Outlet, Navigate} from 'react-router-dom'

// const UserRoutes = () => {
//     // get user information
//     const user= JSON.parse(localStorage.getItem('user'))

//     // check user
//     // check isAdmin = true
//     // if true: Access all the route of Admin(Outlet)
//     // if false: Navigate to login

//     return user !=null && user.isAdmin ? <Outlet/>
//                 : <Navigate to ={'/login'}/>
// }

// export default UserRoutes


import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const user = { loggedIn: true, role: 'user' }; // Example authentication
  return user && user.loggedIn && user.role === 'user';
};

const UserRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoutes;
