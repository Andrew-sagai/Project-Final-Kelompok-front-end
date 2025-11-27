import React from 'react';

export default function Card({ children, className = '', hover = true, ...props }) {
    return (
        <div
            className={`glass-card ${hover ? 'hover:scale-[1.01] hover:shadow-2xl hover:shadow-aurora-cyan/10 transition-all duration-300' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
