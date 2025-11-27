import React from 'react';

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    type = 'button',
    disabled = false,
    onClick,
    ...props
}) {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

    const variants = {
        primary: "bg-gradient-to-r from-aurora-blue via-aurora-purple to-aurora-pink text-white shadow-lg hover:shadow-aurora-cyan/25 hover:scale-[1.02] border border-transparent",
        secondary: "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:border-white/30 shadow-sm",
        outline: "bg-transparent border border-white/30 text-gray-300 hover:text-white hover:border-white/60 hover:bg-white/5",
        danger: "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg hover:shadow-red-500/25 hover:scale-[1.02] border border-transparent",
        success: "bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-lg hover:shadow-emerald-500/25 hover:scale-[1.02] border border-transparent",
        ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/10"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-8 py-3.5 text-base"
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
