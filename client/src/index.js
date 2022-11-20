import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping, faChevronDown, faChevronUp, faDollarSign, faEuroSign, faYenSign, faChevronRight, faChevronLeft, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ConfigureStore } from './redux/ConfigureStore';

library.add(faCartShopping, faChevronDown, faChevronUp, faDollarSign, faEuroSign, faYenSign, faChevronRight, faChevronLeft, faPlus, faMinus)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
});

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = ConfigureStore();
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
