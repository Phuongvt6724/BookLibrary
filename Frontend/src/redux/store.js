import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import authReducer from "./authSlice";
import suggestReducer from "./suggestSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    auth: authReducer,
    suggest: suggestReducer,
  },
});
