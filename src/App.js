import React from "react";
import { Navbar, Sidebar, Footer } from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  HomePage,
  AboutPage,
  CartPage,
  ProductsPage,
  SingleProductPage,
  CheckoutPage,
  ErrorPage,
  PrivateRoute,
} from "./pages";
import AuthWrapper from "./pages/AuthWrapper";

function App() {
  return (
    <>
      <AuthWrapper>
        <BrowserRouter>
          <Navbar />
          <Sidebar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<SingleProductPage />} />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <CheckoutPage />
                </PrivateRoute>
              }
            ></Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthWrapper>
    </>
  );
}

export default App;
