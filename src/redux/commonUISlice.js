import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toastMessage: { message: "", status: "" },
};

const commonUISlice = createSlice({
  name: "commonUI",
  initialState,
  reducers: {
    setToastMessage(state, action) {
      const { message, status } = action.payload;
      state.toastMessage.message = message;
      state.toastMessage.status = status;
    },
    resetToastMessage(state) {
      state.toastMessage = { message: "", status: "" };
    },
  },
});

export const { setToastMessage, resetToastMessage } = commonUISlice.actions;
export default commonUISlice.reducer;
