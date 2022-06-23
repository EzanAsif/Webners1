import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../App/api.js";
import { getRequest, postRequest } from "../../App/fetch";

const initialState = {
  transactionsList: [],
  pendingTransactionsList: [],
  error: "none",
  status: "Ok",
  firstFetch: false,
};

export const WithdrawTransaction = createAsyncThunk(
  "WithdrawTransaction",
  async (body) => {
    const result = await postRequest(`${BASE_URL}/transaction/withdraw`, body);
    console.log(result);
    return result;
  }
);

export const DepositTransaction = createAsyncThunk(
  "DepositTransaction",
  async (body) => {
    const result = await postRequest(`${BASE_URL}/transaction/deposit`, body);
    return result;
  }
);

export const RejectTransaction = createAsyncThunk(
  "RejectTransaction",
  async (body, id) => {
    const result = await postRequest(
      `${BASE_URL}/transaction/cancel/${id}`,
      body
    );
    return result.data;
  }
);

export const ApproveTransaction = createAsyncThunk(
  "ApproveTransaction",
  async (body, id) => {
    const result = await postRequest(
      `${BASE_URL}/transaction/approve/${id}`,
      body
    );
    return result;
  }
);

export const GetTransactions = createAsyncThunk("GetTransactions", async () => {
  const result = await getRequest(`${BASE_URL}/transaction/history`);
  return result.data;
});

export const GetPendingTransactions = createAsyncThunk(
  "GetPendingTransactions",
  async () => {
    const result = await getRequest(
      `${BASE_URL}/transaction/pendingTransactionsForAdmin`
    );
    return result.data;
  }
);
export const AdminGetAllTransactions = createAsyncThunk(
  "AdminGetAllTransactions",
  async () => {
    const result = await getRequest(`${BASE_URL}/transaction/historyForAdmin`);
    return result.data;
  }
);

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
    [ApproveTransaction.pending]: (state, action) => {
      // state.status = "Pending";
    },
    [ApproveTransaction.rejected]: (state, action) => {
      state.status = "Error";
      state.error = action.error.message;
    },
    [ApproveTransaction.fulfilled]: (state, action) => {
      state.status = "Ok";
      if (action.payload) {
        state.error = "none";
      }
    },
    [RejectTransaction.pending]: (state, action) => {
      state.status = "Pending";
    },
    [RejectTransaction.rejected]: (state, action) => {
      state.status = "Error";
      state.error = action.error.message;
    },
    [RejectTransaction.fulfilled]: (state, action) => {
      state.status = "Ok";
      if (action.payload) {
        state.error = "none";
      }
    },
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
    [GetPendingTransactions.pending]: (state, action) => {
      state.transactionsList = [];
      state.status = "Pending";
    },
    [GetPendingTransactions.rejected]: (state, action) => {
      state.transactionsList = [];
      state.status = "Error";
      state.error = action.error.message;
    },
    [GetPendingTransactions.fulfilled]: (state, action) => {
      if (action.payload) {
        state.pendingTransactionsList = action.payload;
        state.status = "Ok";
        state.error = "none";
      }
    },
    [AdminGetAllTransactions.pending]: (state, action) => {
      state.transactionsList = [];
      state.status = "Pending";
    },
    [AdminGetAllTransactions.rejected]: (state, action) => {
      state.transactionsList = [];
      state.status = "Error";
      state.error = action.error.message;
    },
    [AdminGetAllTransactions.fulfilled]: (state, action) => {
      if (action.payload) {
        state.transactionsList = action.payload;
        state.status = "Ok";
        state.error = "none";
      }
    },
  },
});

export default TransactionReducer.reducer;
export const {
  clearTransactionsList,
  firstFetchFunc,
} = TransactionReducer.actions;
