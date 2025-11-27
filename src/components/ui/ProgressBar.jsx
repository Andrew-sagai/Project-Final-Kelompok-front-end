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
            <div className={`w-full bg-white/10 rounded-full overflow-hidden ${heights[height]}`}>
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
                <p className="text-xs text-gray-400 mt-1">
                    {Math.round(clampedProgress)}%
                </p>
            )}
        </div>
    );
}
