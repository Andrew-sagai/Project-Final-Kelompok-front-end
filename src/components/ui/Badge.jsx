export default function Badge({ children, variant = 'default', size = 'md' }) {
    const variants = {
        default: 'bg-white/10 text-gray-200 border border-white/10',
        primary: 'bg-blue-500/20 text-blue-200 border border-blue-500/30',
        success: 'bg-green-500/20 text-green-200 border border-green-500/30',
        warning: 'bg-yellow-500/20 text-yellow-200 border border-yellow-500/30',
        danger: 'bg-red-500/20 text-red-200 border border-red-500/30',
        info: 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30',
        purple: 'bg-purple-500/20 text-purple-200 border border-purple-500/30',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
    };

    return (
        <span className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]}`}>
            {children}
        </span>
    );
}
