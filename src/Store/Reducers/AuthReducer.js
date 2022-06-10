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
    console.log(result, "resilt");
    return result.data;
  }
);

export const UserSignupWithRefferalCode = createAsyncThunk(
  "UserSignupWithRefferalCode",
  async (body) => {
    const result = await postRequest(
      `${BASE_URL}/user/signupWithReferralCode`,
      body
    );
    return result.data;
  }
);

export const UserLogin = createAsyncThunk("UserLogin", async (body) => {
  const result = await getDataByBody(`${BASE_URL}/user/signin`, body);
  console.log(result, "result in login");
  return result;
});

const AuthReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    userDataFromLocalStorage: (state, action) => {
      state.userData = action.payload;
    },
    removeuserDataFromLocalStorage: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.userData = {};
    },
  },
  extraReducers: {
    [UserSignupWithoutRefferalCode.pending]: (state, action) => {
      state.status = "Pending";
    },
    [UserSignupWithoutRefferalCode.rejected]: (state, action) => {
      state.status = "Error";
      state.error = action.type;
    },
    [UserSignupWithoutRefferalCode.fulfilled]: (state, action) => {
      if (action.payload) {
        state.userData.token = action.payload.token;
        state.userData.user = action.payload.user;
        state.status = "Ok";
        state.error = "none";
      }
    },
    [UserSignupWithRefferalCode.pending]: (state, action) => {
      state.status = "Pending";
    },
    [UserSignupWithRefferalCode.rejected]: (state, action) => {
      state.status = "Error";
      console.log(action);
      state.error = action.type;
    },
    [UserSignupWithRefferalCode.fulfilled]: (state, action) => {
      if (action.payload) {
        state.userData.token = action.payload.token;
        state.userData.user = action.payload.user;
        state.status = "Ok";
        state.error = "none";
      }
    },
    [UserLogin.pending]: (state, action) => {
      state.status = "Pending";
    },
    [UserLogin.rejected]: (state, action) => {
      console.log(action);
      state.status = "Rejected";
      state.status = "Error";
      state.error = action.type;
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
