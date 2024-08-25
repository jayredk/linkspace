import { createBrowserRouter } from 'react-router-dom';

import { Text } from '@chakra-ui/react';
import Admin from '../pages/Admin/Admin';
import User from '../pages/User';
import Signup from '../pages/Signup';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        Landing page
      </Text>
    ),
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
]);
