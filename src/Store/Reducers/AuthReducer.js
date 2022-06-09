import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../App/api.js";
import {
  getDataByBody,
  getRequest,
  postRequest,
  putRequest,
} from "../../App/fetch";

const initialState = {
  userData: {},
  error: "",
  status: "",
};

// POST REQUEST
export const UserSignupWithoutRefferalCode = createAsyncThunk(
  "UserSignupWithoutRefferalCode",
  async (body) => {
    const result = await postRequest(`${BASE_URL}/user/signup`, body);
    console.log(result, "result");
    return result;
  }
);

export const UserSignupWithRefferalCode = createAsyncThunk(
  "UserSignupWithRefferalCode",
  async (body) => {
    const result = await postRequest(`${BASE_URL}/user/signup/${body}`, body);
    return result;
  }
);

export const UserLogin = createAsyncThunk("UserLogin", async (body) => {
  const result = await getDataByBody(`${BASE_URL}/user/signin`, body);
  return result;
});

const AuthReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    userDataFromLocalStorage: (state, action) => {
      state.userData.token = action.payload;
    },
    removeuserDataFromLocalStorage: (state, action) => {
      localStorage.removeItem("token");
      state.userData = {};
    },
  },
  extraReducers: {
    [UserSignupWithoutRefferalCode.pending]: (state, action) => {
      state.status = "Pending";
    },
    [UserSignupWithoutRefferalCode.rejected]: (state, action) => {
      state.status = "Error";
      state.error = action.payload;
    },
    [UserSignupWithoutRefferalCode.fulfilled]: (state, action) => {
      if (action.payload) {
        state.userData = action.payload;
        state.status = "Ok";
        state.error = "none";
      }
    },
    [UserSignupWithRefferalCode.pending]: (state, action) => {
      state.status = "Pending";
    },
    [UserSignupWithRefferalCode.rejected]: (state, action) => {
      state.status = "Error";
      state.error = action.payload;
    },
    [UserSignupWithRefferalCode.fulfilled]: (state, action) => {
      if (action.payload) {
        state.userData = action.payload;
        state.status = "Ok";
        state.error = "none";
      }
    },
    [UserLogin.pending]: (state, action) => {
      state.status = "Pending";
    },
    [UserLogin.rejected]: (state, action) => {
      state.status = "Error";
      state.error = action.payload;
    },
    [UserLogin.fulfilled]: (state, action) => {
      if (action.payload) {
        state.userData.token = action.payload.token;
        state.status = "Ok";
        state.error = "none";
      }
    },
  },
});

export default AuthReducer.reducer;
export const {
  userDataFromLocalStorage,
  removeuserDataFromLocalStorage,
} = AuthReducer.actions;
