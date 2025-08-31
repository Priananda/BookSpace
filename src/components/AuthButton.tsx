import React from 'react';

interface AuthButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}

const AuthButton: React.FC<AuthButtonProps> = ({
  label,
  onClick,
  className = '',
  type = 'submit',
}) => {
  
  return (
    <button
      onClick={onClick}
      type={type}
      className={`w-full text-md mt-5 py-3 px-6 cursor-pointer rounded-full shadow-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 transition duration-300 hover:scale-105 ${className}`}
    >
      {label}
    </button>
  );
};

export default AuthButton;
