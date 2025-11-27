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
<<<<<<< HEAD
                <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
                    {label} {required && <span className="text-aurora-pink">*</span>}
=======
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
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
<<<<<<< HEAD
                className={`w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-aurora-cyan/50 focus:border-aurora-cyan/50 transition-all duration-300 hover:bg-white/10 ${error ? 'border-red-500 focus:ring-red-500' : ''
=======
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${error ? 'border-red-500 focus:ring-red-500' : ''
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                    } ${className}`}
                {...props}
            />
            {error && (
<<<<<<< HEAD
                <p className="mt-1.5 text-sm text-red-400 ml-1">{error}</p>
=======
                <p className="mt-1 text-sm text-red-500">{error}</p>
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
            )}
        </div>
    );
}
