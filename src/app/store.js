import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/cutomers/customerSlice";
import productReducer from "../features/product/productSlice";
import uploadReducer from "../features/upload/uploadSlice";

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(logger);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    upload: uploadReducer,
  },
  middleware,
});
