export default function Badge({ children, variant = 'default', size = 'md' }) {
    const variants = {
<<<<<<< HEAD
        default: 'bg-white/10 text-gray-200 border border-white/10',
        primary: 'bg-blue-500/20 text-blue-200 border border-blue-500/30',
        success: 'bg-green-500/20 text-green-200 border border-green-500/30',
        warning: 'bg-yellow-500/20 text-yellow-200 border border-yellow-500/30',
        danger: 'bg-red-500/20 text-red-200 border border-red-500/30',
        info: 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30',
        purple: 'bg-purple-500/20 text-purple-200 border border-purple-500/30',
=======
        default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        info: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
        purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
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
