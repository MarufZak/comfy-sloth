import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let productPrices = action.payload.map(p=>p.price)
    let maxPrice = Math.max(...productPrices)
    return {
      ...state,
      filtered_products: [...action.payload],
      all_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice
      }
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }
  if (action.type === SORT_PRODUCTS) {
    let { sort, filtered_products } = state;

    if (sort === "price-lowest") {
      filtered_products = filtered_products.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sort === "price-highest") {
      filtered_products = filtered_products.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (sort === "name-a") {
      filtered_products = filtered_products.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (sort === "name-z") {
      filtered_products = filtered_products.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }

    return {
      ...state,
      filtered_products,
    };
  }
  if (action.type === UPDATE_FILTERS) {
    const {name,value} = action.payload;
    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: value 
      }
    }
  }
  if (action.type === FILTER_PRODUCTS) {

    const {text,company,color,category,shipping,max_price,price} = state.filters;

    let filtered = [...state.all_products];

    if (text) {
      filtered = filtered.filter(product=>(
        product.name.startsWith(text)
      ))
    }
    if (company !== "all") {
      filtered = filtered.filter(product=>(
        product.company === company
      ))
    }
    if (color !== "all") {
      filtered = filtered.filter(product=>(
        product.colors.includes(color)
      ))
    }
    if (category !== "all") {
      filtered = filtered.filter(product=>(
        product.category === category
      ))
    }
    if (shipping) {
      filtered = filtered.filter(product=>(
        product.shipping 
      ))
    }
    if (price !== max_price) {
      filtered = filtered.filter(product=>(
        product.price < price
      ))
    }

    return {
      ...state,
      filtered_products: filtered
    }
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        color: 'all',
        category: 'all',
        shipping: false,
        price: state.filters.max_price
      }
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
