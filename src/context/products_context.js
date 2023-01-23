import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { single_product_url, products_url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {}
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state,dispatch] = useReducer(reducer,initialState);

  const openSidebar = ()=>{
    dispatch({type: SIDEBAR_OPEN})
  }

  const closeSidebar = ()=>{
    dispatch({type: SIDEBAR_CLOSE})
  }

  const fetchProducts = async(url)=>{
    dispatch({type: GET_PRODUCTS_BEGIN})

    try {
      const response = await axios(url);
      const products = response.data;
      dispatch({type: GET_PRODUCTS_SUCCESS,payload: products})
    } catch (error) {
      dispatch({type: GET_PRODUCTS_ERROR})
    }
  }

  const fetchSingleProduct = async(url)=>{
    dispatch({type: GET_SINGLE_PRODUCT_BEGIN})

    try {
      const response = await axios(url);  
      const data = response.data;

      dispatch({type: GET_SINGLE_PRODUCT_SUCCESS,payload: data})
    } catch (error) {
      dispatch({type: GET_SINGLE_PRODUCT_ERROR})
    }
  }

  useEffect(()=>{
    fetchProducts(products_url);
  },[])

  const value = {
    state,
    openSidebar,
    closeSidebar,
    fetchSingleProduct,
    products_loading: state.products_loading,
    products_error: state.products_error,
    products: state.products,
    featured_products: state.featured_products,
    single_product_loading: state.single_product_loading,
    single_product_error: state.single_product_error,
    single_product: state.single_product
  }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
