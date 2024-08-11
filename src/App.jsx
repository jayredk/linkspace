import { RouterProvider } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import 'animate.css';
import './assets/styles/effect.css';

import { router } from './router';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#f8f8f8',
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
