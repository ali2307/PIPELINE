import React, { useState } from "react";
interface prop {
  isOpen: boolean;
  onClose: any;
  onConfirm: any;
  title: string;
  message: string;
}
export const ConfirmModal: React.FC<prop> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white  rounded-t-md rounded-b-md shadow-lg max-w-sm w-full ">
        <h2 className="text-lg font-bold mb-4 p-4 border border-bottom rounded-t-md ">{title}</h2>
        <p className="mb-6 p-4">{message}</p>
        <div className="bg-[#ecf0f1] flex justify-end space-x-4  rounded-b-md py-4 px-3">
          <button
            className="bg-[#b0c1c6] text-white px-4 py-2 rounded-t-md  rounded-b-md hover:bg-[#92a9af]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-[#f15e5e] hover:bg-[#ee3535] rounded-t-md  rounded-b-md text-white px-4 py-2 "
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
