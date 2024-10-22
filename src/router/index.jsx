import { createBrowserRouter } from 'react-router-dom';

import Dashboard from '../pages/Dashboard/Dashboard';
import User from '../pages/User';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Home from '../pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/:userId',
    element: <User />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);
