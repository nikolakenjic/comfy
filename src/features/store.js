import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import userReducer from './user/userSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
