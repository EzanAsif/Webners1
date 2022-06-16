import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Reducers/AuthReducer";
import TransactionReducer from "./Reducers/Transactions";
import MetamaskAccountReducer from "./Reducers/MetamaskAccount";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    transactions: TransactionReducer,
    metamaskAccount: MetamaskAccountReducer
  },
});
