import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../App/api.js";
import {
  getDataByBody,
  getRequest,
  postRequest,
  putRequest,
} from "../../App/fetch";

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
        console.log(action);
        state.status = "Ok";
        state.error = "none";
      }
    },
  },
});

export default TransactionReducer.reducer;
