import { createBrowserRouter } from 'react-router-dom';

import Admin from '../pages/Admin/Admin';
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
    path: '/admin',
    element: <Admin />,
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
