import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";

interface UsersDataPayload {
  usersData: User[];
  totalPageNum: number;
}

interface AuthState {
  registrationData: any;
  loginData: any;   
  user: User | null;
  usersData: User[];
  totalPageNum: number;
  error: string | null;
  isAuthenticated: boolean;
  loading?: boolean;
}

const initialState: AuthState  = {
  registrationData: null,
  loginData: null,
  user: null,
  usersData: [],
  totalPageNum: 0,
  error: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setVerifyPasswordLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setVerifyPasswordError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setChangePasswordLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setChangePasswordError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setLoginData: (state, action: PayloadAction<any>) => {
      state.loginData = action.payload;
    },
    setUsersData: (state, action: PayloadAction<UsersDataPayload>) => {
      state.usersData = action.payload.usersData;
      state.totalPageNum = action.payload.totalPageNum;
    },
    setUpdateUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setRegistrationData: (state, action: PayloadAction<any>) => {
      state.registrationData = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
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
  logout,
  setVerifyPasswordLoading,
  setVerifyPasswordError,
  setChangePasswordLoading,
  setChangePasswordError,
} = userSlice.actions;
export default userSlice.reducer;
