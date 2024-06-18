// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/register', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await api.post('/login', userData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const initialState = {
  policyAccepted: false,
  registrationData: null,
  loginData: null,
  error: null,
  loading: false,  // 로딩 상태 추가
};

const authSlice = createSlice({
  name: 'auth',
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
  },
});

export const { setError } = authSlice.actions;
export default authSlice.reducer;
