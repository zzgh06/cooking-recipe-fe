import React from "react";
import { User } from "../../types";

interface UserDetailDialogProps {
  open: boolean;
  handleClose: () => void;
  user: User;
  deleteUser: (userId: string) => void;
}

const UserDetailDialog = ({ open, handleClose, user, deleteUser }: UserDetailDialogProps) => {
  const handleDelete = () => {
    if (user._id) {
      deleteUser(user._id);
    } else {
      console.error("User ID is undefined.");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">User Info</h2>
        </div>
        <div className="p-4">
          <div className="mb-2">
            <strong>아이디:</strong> {user.id}
          </div>
          <div className="mb-2">
            <strong>이름:</strong> {user.name}
          </div>
          <div className="mb-2">
            <strong>이메일:</strong> {user.email}
          </div>
          <div className="mb-2">
            <strong>등급:</strong> {user.level}
          </div>
          <div className="mb-2">
            <strong>주소:</strong> {user.shipTo}
          </div>
          <div className="mb-2">
            <strong>연락처:</strong> {user.contact}
          </div>
        </div>
        <div className="flex justify-end px-4 py-2 border-t">
          <button
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md mr-2"
            onClick={handleDelete}
          >
            삭제
          </button>
          <button
            className="border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md"
            onClick={handleClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailDialog;
