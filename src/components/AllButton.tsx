import React from 'react';
interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  label?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  className = '',
}) => {
  
  return (
    <button
      onClick={onClick}
      type={type}
      className={`w-full mt-5 py-3 px-6 cursor-pointer rounded-full shadow-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 transition duration-300 hover:scale-105 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
