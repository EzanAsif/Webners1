import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Reducers/AuthReducer";
import TransactionReducer from "./Reducers/Transactions";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    transactions: TransactionReducer,
  },
});
