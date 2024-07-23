import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/user", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginWithToken = createAsyncThunk(
  "auth/loginWithToken",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/user/me");
      if (response.status !== 200) throw new Error(response.error);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(logout());
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getUsersInfo = createAsyncThunk(
  "auth/getUsersInfo",
  async (searchQuery, thunkAPI) => {
    try {
      const response = await api.get(
        `/user/admin?name=${searchQuery.name}&page=${searchQuery.page}`
      );
      if (response.status !== 200) throw new Error(response.error);
      return {
        usersData: response.data.data,
        totalPageNum: response.data.totalPageNum,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const logouts = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      sessionStorage.removeItem("token");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.put(`user/me`, formData);
      if (response.status !== 200) throw new Error(response.error);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/user/${id}`);
      if (response.status !== 200) throw new Error(response.error);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post("/password/forgot-password", { email });
      if (response.status !== 200) throw new Error(response.error);
      alert("비밀번호 재설정 이메일이 발송되었습니다 !");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ password, token }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/password/reset-password/${token}`, {
        password,
      });
      if (response.status !== 200) throw new Error(response.error);
      alert("새 비밀번호가 설정되었습니다!\n로그인 후 이용해 주세요.");
    } catch (error) {
      alert("만료된 토큰입니다.\n비밀번호 재설정 링크를 다시 받아주세요.");
      return rejectWithValue(error.message);
    }
  }
);

export const verifyCurrentPassword = createAsyncThunk(
  "auth/verifyCurrentPassword",
  async (currentPassword, { rejectWithValue }) => {
    try {
      const response = await api.post("/password/verify-password", {
        currentPassword,
      });
      if (response.status !== 200) throw new Error(response.error);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (newPassword, { rejectWithValue }) => {
    try {
      const response = await api.put("/password/change-password", {
        newPassword,
      });
      if (response.status !== 200) throw new Error(response.error);
      alert(`${response.data.message}`);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

export const {
  setError,
  setUser,
  setUsersData,
  setLoginData,
  setLoading,
  logout
} = userSlice.actions;
export default userSlice.reducer;
