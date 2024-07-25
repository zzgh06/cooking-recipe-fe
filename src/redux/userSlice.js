import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registrationData: null,
  loginData: null,
  user: null,
  usersData: [],
  totalPageNum: 0,
  error: null,
  loading: false,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setVerifyPasswordLoading: (state, action) => {
      state.loading = action.payload;
    },
    setVerifyPasswordError: (state, action) => {
      state.error = action.payload;
    },
    setChangePasswordLoading: (state, action) => {
      state.loading = action.payload;
    },
    setChangePasswordError: (state, action) => {
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoginData: (state, action) => {
      state.loginData = action.payload;
    },
    setUsersData: (state, action) => {
      state.usersData = action.payload.usersData;
      state.totalPageNum = action.payload.totalPageNum;
    },
    setUpdateUser: (state, action) => {
      state.user = action.payload;
    },
    setRegistrationData: (state, action) => {
      state.registrationData = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      sessionStorage.removeItem("token");
    },
  },
});

export const {
  setError,
  setUser,
  setUsersData,
  setLoginData,
  setUpdateUser,
  setRegistrationData,
  setIsAuthenticated,
  setLoading,
  logout,
  setVerifyPasswordLoading,
  setVerifyPasswordError,
  setChangePasswordLoading,
  setChangePasswordError,
} = userSlice.actions;
export default userSlice.reducer;
