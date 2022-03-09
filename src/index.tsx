import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ColorModeScript, ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

