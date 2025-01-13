import React from "react";
import "./button.css";
interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  isLoading = false,
  disabled = false,
  className = "",
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={` text-white w-[130px] flex items-center justify-center  md:h-14 h-16 bg-[#0670b1]  rounded-[5px]  font-semibold  px-4 hover:bg-gray-500  focus:ring-4 focus:outline-none focus:ring-blue-300 ${className}`}
    >
      {isLoading ? (
        <>
          <div className="inline-flex justify-center items-center gap-1">
            <span className="text-sm">Loading</span>
            <div className="spinner"></div>
          </div>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
