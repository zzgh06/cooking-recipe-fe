import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../types";

interface OrderState {
  orderList: Order[];
  selectedOrder: Order | null;
  totalPageNum: number;
  orderNum: string;
}

const initialState: OrderState = {
  orderList: [],
  selectedOrder: null,
  totalPageNum: 1,
  orderNum: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedOrder(state, action: PayloadAction<Order>) {
      state.selectedOrder = action.payload;
    },
    addOrderToState(state, action: PayloadAction<string>) {
      state.orderNum = action.payload;
    }
  },
});
export const { setSelectedOrder, addOrderToState } = orderSlice.actions;
export default orderSlice.reducer;
