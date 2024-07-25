import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderList: [],
    selectedOrder: {},
    totalPageNum: 1,
    loading: false,
    error: "",
    orderNum: "",
  },
  reducers: {
    setSelectedOrder(state, action) {
      state.selectedOrder = action.payload;
    },
    addOrderToState(state, action) {
      state.orderNum = action.payload;
    }
  },
});
export const { setSelectedOrder, addOrderToState } = orderSlice.actions;
export default orderSlice.reducer;
