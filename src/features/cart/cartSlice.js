import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || defaultState;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find((i) => i.cartId === product.cartId);
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;

      cartSlice.caseReducers.calculateTotals(state);
      toast.success('Added Item to cart');
    },
    removeItem: (state, action) => {
      const { cartId } = action.payload;
      const productIndex = state.cartItems.findIndex(
        (i) => i.cartId === cartId
      );
      if (productIndex !== -1) {
        const product = state.cartItems[productIndex];
        state.numItemsInCart -= product.amount;
        state.cartTotal -= product.price * product.amount;
        state.cartItems.splice(productIndex, 1);
        cartSlice.caseReducers.calculateTotals(state);
        toast.error('Removed Item from cart');
      } else {
        console.error('Product not found in cart.');
      }
    },
    editItem: (state, action) => {
      const { cartId, amount } = action.payload;
      const productIndex = state.cartItems.findIndex(
        (i) => i.cartId === cartId
      );
      if (productIndex !== -1) {
        const product = state.cartItems[productIndex];
        state.numItemsInCart += amount - product.amount;
        state.cartTotal += product.price * (amount - product.amount);
        product.amount = amount;
        cartSlice.caseReducers.calculateTotals(state);
        toast.success('Edited Item in Cart');
      } else {
        console.error('Product not found in cart.');
      }
    },

    clearCart: (state, action) => {
      localStorage.setItem('cart', JSON.stringify(defaultState));
      return defaultState;
    },

    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, editItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
