import React from "react";
import Image from "next/image";
import EmailImage from "../../../assets/img/email.png";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const handleOutsideClick = (event: any) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-6 w-4/12 relative ">
        <div
          id="cancelButton"
          className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none text-2xl"
          onClick={onClose}
        >
          &times;
        </div>
        <Image src={EmailImage} className="w-[265px] h-[238px] " alt="" />
        <div className="mt-6 flex justify-center mb-10">
          <h1 className="font-bold text-2xl">
            Your email is successfully verified
          </h1>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
