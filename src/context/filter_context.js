import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: false,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    color: 'all',
    category: 'all',
    shipping: false,
    min_price: 0,
    max_price: 0,
    price: 0
  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const {products} = useProductsContext();
  const [state,dispatch] = useReducer(reducer,initialState);

  useEffect(()=>{
    dispatch({type: FILTER_PRODUCTS})
    dispatch({type: SORT_PRODUCTS})
  },[state.sort,state.filters])

  useEffect(()=>{
    dispatch({type: LOAD_PRODUCTS,payload: products})
  },[products]);

  const setGridView = ()=>{
    dispatch({type: SET_GRIDVIEW})
  }

  const setListView = ()=>{
    dispatch({type: SET_LISTVIEW})
  }

  const updateSort = (e)=>{ 
    const value = e.target.value;
    dispatch({type: UPDATE_SORT,payload: value})
  }

  const updateFilters = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    if (name === "category") {
      value = e.target.textContent;
    } else if (name === "color") {
      value = e.target.dataset.color;
    } else if (name === "price") {
      value = Number(e.target.value);
    } else if (name === "shipping") {
      value = e.target.checked;
    }
    dispatch({type: UPDATE_FILTERS,payload: {name,value}})
  }

  const clearFilters = ()=>{
    dispatch({type: CLEAR_FILTERS})
  }


  const value = {
    filtered_products: state.filtered_products,
    all_products: state.all_products,
    grid_view: state.grid_view,
    filters: state.filters,
    setGridView,
    setListView,
    updateSort,
    updateFilters,
    clearFilters,
  }

  return (
    <FilterContext.Provider value={value} >
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
