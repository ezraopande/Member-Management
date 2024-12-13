import React from 'react';

const LoadingButton = ({ isLoading, loadingText, size="w-full", onClick, children, ...props }) => {
    return (
        <button
            onClick={onClick}
            className={`${size} bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center ${
                isLoading ? 'cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center space-x-2">
                    <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                        ></path>
                    </svg>
                    <span className="text-sm font-medium">{loadingText || 'Loading...'}</span>
                </div>
            ) : (
                children
            )}
        </button>
    );
};

export default LoadingButton;
