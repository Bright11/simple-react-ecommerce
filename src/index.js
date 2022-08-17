import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

//import productsSlice from './features/productsSlice';
//import productsReducer from './features/productsSlice';
//import cartSlice from './features/cartSlice';
import cartReducer, { getTotals } from './features/cartSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer: {
    //after creating our productsSlice
   // products: productsReducer,
    cart:cartReducer
  },
  
});

store.dispatch(getTotals());
root.render(
  <React.StrictMode>
   <Provider store={store}>
   <App />
   </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
