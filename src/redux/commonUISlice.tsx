import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastMessage {
  message: string;
  status: string;
}

interface CommonUIState {
  toastMessage: ToastMessage;
}

const initialState: CommonUIState = {
  toastMessage: { message: "", status: "" },
};

const commonUISlice = createSlice({
  name: "commonUI",
  initialState,
  reducers: {
    setToastMessage(state, action: PayloadAction<ToastMessage>) {
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
