import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const getLocalStorage = ()=>{
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart)
  } else {
    return []
  }
}

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state ,dispatch] = useReducer(reducer,initialState);
  window.cart = state.cart;
  
  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(state.cart))
    dispatch({type: COUNT_CART_TOTALS})
  },[state.cart])

  const addToCart = (id,color,amount,product)=>{
    dispatch({type: ADD_TO_CART,payload: {id,color,amount,product}})
  }

  const toggleAmount = (id,type,color)=>{
    dispatch({type: TOGGLE_CART_ITEM_AMOUNT,payload: {id,type,color}})
  }

  const removeItem = (id,color)=>{
    dispatch({type: REMOVE_CART_ITEM,payload: {id,color}})
  }

  const clearCart = ()=>{
    dispatch({type: CLEAR_CART})
  }


  const value = {
    cart: state.cart,
    total_items: state.total_items,
    shipping_fee: state.shipping_fee,
    total_amount: state.total_amount,
    addToCart,
    toggleAmount,
    removeItem,
    clearCart
  }

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}