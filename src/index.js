import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping, faChevronDown, faChevronUp, faDollarSign, faEuroSign, faYenSign, faChevronRight, faChevronLeft, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ConfigureStore } from './redux/ConfigureStore';

library.add(faCartShopping, faChevronDown, faChevronUp, faDollarSign, faEuroSign, faYenSign, faChevronRight, faChevronLeft, faPlus, faMinus)


const root = ReactDOM.createRoot(document.getElementById('root'));
const store = ConfigureStore();
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
reportWebVitals();
