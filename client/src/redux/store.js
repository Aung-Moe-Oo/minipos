import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./redux.js";

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
