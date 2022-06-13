import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../App/api.js";
import { postRequest } from "../../App/fetch";

const initialState = {
  transactions: [],
  error: "",
  status: "",
};

export const WithdrawTransaction = createAsyncThunk(
  "WithdrawTransaction",
  async (body) => {
    const result = await postRequest(`${BASE_URL}/transaction/withdraw`, body);
    return result.data;
  }
);

export const DepositTransaction = createAsyncThunk(
  "DepositTransaction",
  async (body) => {
    const result = await postRequest(`${BASE_URL}/transaction/deposit`, body);
    return result.data;
  }
);

export const GetTransactions = createAsyncThunk(
  "GetTransactions",
  async (body) => {
    const result = await postRequest(`${BASE_URL}/transaction/history`, body);
    return result.data;
  }
);

const TransactionReducer = createSlice({
  name: "TransactionReducer",
  initialState,
  reducers: {},
  extraReducers: {
    [WithdrawTransaction.pending]: (state, action) => {
      state.status = "Pending";
    },
    [WithdrawTransaction.rejected]: (state, action) => {
      state.status = "Error";
      state.error = action.error.message;
    },
    [WithdrawTransaction.fulfilled]: (state, action) => {
      if (action.payload) {
        state.status = "Ok";
        state.error = "none";
      }
    },
    [DepositTransaction.pending]: (state, action) => {
      state.status = "Pending";
    },
    [DepositTransaction.rejected]: (state, action) => {
      state.status = "Error";
      state.error = action.error.message;
    },
    [DepositTransaction.fulfilled]: (state, action) => {
      if (action.payload) {
        state.status = "Ok";
        state.error = "none";
      }
    },
    [GetTransactions.pending]: (state, action) => {
      state.status = "Pending";
    },
    [GetTransactions.rejected]: (state, action) => {
      state.status = "Error";
      state.error = action.error.message;
    },
    [GetTransactions.fulfilled]: (state, action) => {
      if (action.payload) {
        state.transactions = action.payload;
        state.status = "Ok";
        state.error = "none";
      }
    },
  },
});

export default TransactionReducer.reducer;
