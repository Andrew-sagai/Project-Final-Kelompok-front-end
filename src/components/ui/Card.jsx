import React from 'react';

<<<<<<< HEAD
export default function Card({ children, className = '', hover = true, ...props }) {
    return (
        <div
            className={`glass-card ${hover ? 'hover:scale-[1.01] hover:shadow-2xl hover:shadow-aurora-cyan/10 transition-all duration-300' : ''} ${className}`}
=======
export default function Card({ children, className = '', ...props }) {
    return (
        <div
            className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
            {...props}
        >
            {children}
        </div>
    );
}
