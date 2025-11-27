export default function ProgressBar({ progress, color = 'blue', showLabel = true, height = 'md' }) {
    const clampedProgress = Math.min(100, Math.max(0, progress));

    const colors = {
        blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
        green: 'bg-gradient-to-r from-green-500 to-emerald-600',
        purple: 'bg-gradient-to-r from-purple-500 to-pink-600',
        orange: 'bg-gradient-to-r from-orange-500 to-red-600',
        yellow: 'bg-gradient-to-r from-yellow-400 to-orange-500',
    };

    const heights = {
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4',
    };

    return (
        <div className="w-full">
<<<<<<< HEAD
            <div className={`w-full bg-white/10 rounded-full overflow-hidden ${heights[height]}`}>
=======
            <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${heights[height]}`}>
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                <div
                    className={`${colors[color]} ${heights[height]} rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2`}
                    style={{ width: `${clampedProgress}%` }}
                >
                    {showLabel && clampedProgress > 10 && (
                        <span className="text-xs font-bold text-white">
                            {Math.round(clampedProgress)}%
                        </span>
                    )}
                </div>
            </div>
            {showLabel && clampedProgress <= 10 && (
<<<<<<< HEAD
                <p className="text-xs text-gray-400 mt-1">
=======
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                    {Math.round(clampedProgress)}%
                </p>
            )}
        </div>
    );
}
