import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App1p';
import { HelmetProvider } from 'react-helmet-async' // it is package for show title name
import { PayPalScriptProvider } from '@paypal/react-paypal-js' //this package used for payment transaction in paypal in whole website
import 'bootstrap/dist/css/bootstrap.min.css'
import './indexx.css';
import { StoreProvider } from './Store'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StricMode>
  <StoreProvider>
    <HelmetProvider>
      <PayPalScriptProvider deferLoading={true}>
        <App />
      </PayPalScriptProvider>
    </HelmetProvider>
  </StoreProvider>
  //</React.StricMode>
);

