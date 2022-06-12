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
  return result;
});

export const UserLogout = createAsyncThunk(
  "UserLogout",
  async (refreshToken) => {
    const result = await postRequest(`${BASE_URL}/user/logout`, refreshToken);
    return result;
  }
);

export const RefreshToken = createAsyncThunk("RefreshToken", async (body) => {
  const result = await postRequest(`${BASE_URL}/user/token`, body);
  return result.data;
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
      localStorage.removeItem("refreshToken");
      state.userData = {};
    },
  },
  extraReducers: {
    [RefreshToken.pending]: (state, action) => {
      state.status = "Pending";
    },
    [RefreshToken.rejected]: (state, action) => {
      state.status = "Error";
      state.error = action.type;
    },
    [RefreshToken.fulfilled]: (state, action) => {
      if (action.payload) {
        console.log(action);
        state.status = "Ok";
        state.error = "none";
      }
    },
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
        state.userData.refreshToken = action.payload.refreshToken;
        state.status = "Ok";
        state.error = "none";
      }
    },
    [UserSignupWithRefferalCode.pending]: (state, action) => {
      state.status = "Pending";
    },
    [UserSignupWithRefferalCode.rejected]: (state, action) => {
      state.status = "Error";
      state.error = action.type;
    },
    [UserSignupWithRefferalCode.fulfilled]: (state, action) => {
      if (action.payload) {
        state.userData.token = action.payload.token;
        state.userData.user = action.payload.user;
        state.userData.refreshToken = action.payload.refreshToken;
        state.status = "Ok";
        state.error = "none";
      }
    },
    [UserLogin.pending]: (state, action) => {
      state.status = "Pending";
    },
    [UserLogin.rejected]: (state, action) => {
      state.status = "Rejected";
      state.status = "Error";
      state.error = action.type;
    },
    [UserLogin.fulfilled]: (state, action) => {
      if (action.payload) {
        state.userData.token = action.payload.token;
        state.userData.user = action.payload.user;
        state.userData.refreshToken = action.payload.refreshToken;
        state.status = "Ok";
        state.error = "none";
      }
    },
    [UserLogout.pending]: (state, action) => {
      state.status = "Pending";
    },
    [UserLogout.rejected]: (state, action) => {
      state.status = "Rejected";
      state.status = "Error";
      state.error = action.type;
    },
    [UserLogout.fulfilled]: (state, action) => {
      state.status = "Ok";
      state.error = "none";
      state.userData = {};
    },
  },
});

export default AuthReducer.reducer;
export const {
  userDataFromLocalStorage,
  removeuserDataFromLocalStorage,
} = AuthReducer.actions;
