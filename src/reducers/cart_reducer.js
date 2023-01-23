import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    let tempItem = state.cart.find(
      (item) => item.id === id && item.color === color
    );
    if (tempItem) {
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === id && item.color === color) {
            return {
              ...tempItem,
              amount:
                item.amount + amount > product.stock
                  ? product.stock
                  : item.amount + amount,
            };
          }
          return item;
        }),
        total_items:
          state.total_items +
          (tempItem.amount + amount > product.stock ? 0 : amount),
      };
    }
    return {
      ...state,
      cart: [...state.cart, { ...action.payload }],
      total_items: state.total_items + amount,
    };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    let tempItem = state.cart.find(
      (item) =>
        item.id === action.payload.id && item.color === action.payload.color
    );
    if (action.payload.type === "incr") {
      if (tempItem.amount + 1 <= tempItem.product.stock) {
        tempItem = { ...tempItem, amount: tempItem.amount + 1 };
      } else {
        return {
          ...state,
        };
      }
    } else {
      tempItem = { ...tempItem, amount: tempItem.amount - 1 };
    }
    return {
      ...state,
      cart: state.cart.map((item) => {
        if (
          item.id === action.payload.id &&
          item.color === action.payload.color
        ) {
          return tempItem;
        }
        return item;
      }),
      total_items:
        action.payload.type === "incr"
          ? state.total_items + 1
          : state.total_items - 1,
    };
  }
  if (action.type === REMOVE_CART_ITEM) {
    let tempItem = state.cart.find(
      (item) =>
        item.id === action.payload.id && item.color === action.payload.color
    );
    return {
      ...state,
      cart: state.cart.filter(
        (item) =>
          item.id !== action.payload.id || item.color !== action.payload.color
      ),
      total_items: state.total_items - tempItem.amount,
    };
  }
  if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: [],
      total_items: 0,
      total_amount: 0,
    };
  }
  if (action.type === COUNT_CART_TOTALS) {
    let total = state.cart.reduce((accumulator, currentItem) => {
      accumulator.price += currentItem.product.price * currentItem.amount;
      accumulator.amount += currentItem.amount;
      return accumulator;
    }, {amount: 0,price: 0});
    return {
      ...state,
      total_amount: total.price,
      total_items: total.amount
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
