export default function Input({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    required = false,
    error,
    className = '',
    ...props
}) {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
                    {label} {required && <span className="text-aurora-pink">*</span>}
                </label>
            )}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-aurora-cyan/50 focus:border-aurora-cyan/50 transition-all duration-300 hover:bg-white/10 ${error ? 'border-red-500 focus:ring-red-500' : ''
                    } ${className}`}
                {...props}
            />
            {error && (
                <p className="mt-1.5 text-sm text-red-400 ml-1">{error}</p>
            )}
        </div>
    );
}
