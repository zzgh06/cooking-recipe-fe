import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { setToastMessage } from "./commonUISlice";
//import { cartActions } from "./cartSlice";
const initialState = {
  orderList: [],
  selectedOrder: {},
  totalPageNum: 1,
  loading: false,
  error: "",
  orderNum: "",
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ payload, navigate }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/order", payload);
      //dispatch(cartActions.getCartQty());
      navigate("/payment/success");
      return response.data.orderNum;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/order/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getOrderList = createAsyncThunk(
  "order/getOrderList",
  async (query, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get("/order", { params: { ...query } });
      console.log(response);
      return response.data;
    } catch (error) {
      //dispatch(commonUiActions.showToastMessage(error.message, "error"));
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ id, status }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`/order/${id}`, { status });
      dispatch(
        setToastMessage({
          message: "오더 추가됐습니다",
          status: "success",
        })
      );
      return response.data;
    } catch (error) {
      dispatch(
        setToastMessage({
          message: error.error,
          status: "error",
        })
      );
      return rejectWithValue(error.message);
    }
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedOrder(state, action) {
      state.selectedOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // createOrder actions
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderNum = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getOrder actions
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderList = action.payload.data;
        state.totalPageNum = action.payload.totalPageNum;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getOrderList actions
      .addCase(getOrderList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.loading = false;
        state.orderList = action.payload;
        state.totalPageNum = action.payload.totalPageNum;
      })
      .addCase(getOrderList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updateOrder actions
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        // Update logic if needed
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;
