import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetToastMessage } from "../../redux/commonUISlice";
import { RootState } from "../../redux/store";

interface ToastMessageProps {
  message: string;
  status: 'success' | 'error' | 'info' | 'warning';
}

const ToastMessage: React.FC = () => {
  const { toastMessage } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    if (toastMessage) {
      const { message, status } = toastMessage as { message: string; status: string };
      if (message !== "" && ['success', 'error', 'info', 'warning'].includes(status)) {
        toast[status as 'success' | 'error' | 'info' | 'warning'](message, { theme: "colored" });
        dispatch(resetToastMessage());
      }
    }
  }, [toastMessage, dispatch]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeButton={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default ToastMessage;
