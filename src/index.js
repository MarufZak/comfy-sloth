import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<ProductsProvider>
    <Auth0Provider redirectUri={window.location.origin} domain={process.env.REACT_APP_AUTH_DOMAIN} clientId={process.env.REACT_APP_AUTH_CLIENT_ID} cacheLocation='localstorage' >
        <UserProvider>
            <FilterProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </FilterProvider>
        </UserProvider>
    </Auth0Provider>
</ProductsProvider>);
