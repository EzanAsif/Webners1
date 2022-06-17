import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../App/api.js";
import { getRequest, postRequest } from "../../App/fetch";

const initialState = {
  transactionsList: [],
  error: "",
  status: "",
  firstFetch: false,
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

export const GetTransactions = createAsyncThunk("GetTransactions", async () => {
  const result = await getRequest(`${BASE_URL}/transaction/history`);
  return result.data;
});

const TransactionReducer = createSlice({
  name: "TransactionReducer",
  initialState,
  reducers: {
    firstFetchFunc: (state, action) => {
      state.firstFetch = true;
    },
    clearTransactionsList: (state, action) => {
      state.transactionsList = [];
      state.status = "Ok";
      state.error = "none";
      state.updatedBalance = 0;
      state.firstFetch = false;
    },
  },
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
        let res = action.payload;
        state.updatedBalance = res.currentBalance;
        state.balanceChanged = true;
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
        let res = action.payload;
        state.updatedBalance = res.currentBalance;
        state.balanceChanged = true;
        state.status = "Ok";
        state.error = "none";
      }
    },
    [GetTransactions.pending]: (state, action) => {
      state.transactionsList = [];
      state.status = "Pending";
    },
    [GetTransactions.rejected]: (state, action) => {
      state.transactionsList = [];
      state.status = "Error";
      state.error = action.error.message;
    },
    [GetTransactions.fulfilled]: (state, action) => {
      if (action.payload) {
        state.transactionsList = action.payload.history;
        state.status = "Ok";
        state.error = "none";
      }
    },
  },
});

export default TransactionReducer.reducer;
export const { clearTransactionsList, firstFetchFunc } = TransactionReducer.actions;
