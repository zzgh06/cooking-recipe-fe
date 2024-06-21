// src/redux/authSlice.js
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

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', userData);
      sessionStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (token, { rejectWithValue }) => {
    try {      
      const response = await api.post('/auth/google', { token });
      sessionStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginWithToken = createAsyncThunk(
  'auth/loginWithToken',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/user/me');
      if (response.status !== 200) throw new Error(response.error);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(logout());
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getUsersInfo = createAsyncThunk(
  'auth/getUsersInfo',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/user/admin');
      if (response.status !== 200) throw new Error(response.error);
      console.log(response.data)
      return {
        usersData: response.data.data,
        totalPageNum: response.data.totalPageNum,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      sessionStorage.removeItem("token");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  registrationData: null,
  loginData: null,
  usersData: [],
  totalPageNum: 0,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationData = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loginData = action.payload;
        state.error = null;        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.loginData = action.payload;
        state.error = null;        
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginWithToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
        state.error = null;
      })
      .addCase(loginWithToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUsersInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.usersData = action.payload.usersData;
        state.totalPageNum = action.payload.totalPageNum;
        state.error = null;        
      })
      .addCase(getUsersInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { setError } = userSlice.actions;
export default userSlice.reducer;
