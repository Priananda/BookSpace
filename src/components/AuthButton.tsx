import React from 'react';

interface AuthButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const AuthButton: React.FC<AuthButtonProps> = ({ label, onClick, type = 'submit' }) => {
  return (
    <button onClick={onClick} type={type} style={{ padding: '10px 20px' }}>
      {label}
    </button>
  );
};

export default AuthButton;
