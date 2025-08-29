import React from 'react';

interface AuthButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string; // optional className
}

const AuthButton: React.FC<AuthButtonProps> = ({
  label,
  onClick,
  type = 'submit',
  className = '', // <-- default empty string
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

export default AuthButton;
