import React from 'react';

interface LoadingProps {
  message?: string;
  color?: string;
  size?: number;
}

const Loading: React.FC<LoadingProps> = ({
  color = 'blue',
  size = 35,
  message,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-300/40 z-50">
      <div className="flex flex-col items-center gap-1">
        <svg
          className="animate-spin"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          style={{ color }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-50"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-80"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <p className="text-center text-lg font-semibold text-blue-800">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
