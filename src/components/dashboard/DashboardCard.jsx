import Card from '../ui/Card';

export default function DashboardCard({ title, value, icon, color = 'blue', subtitle }) {
    const colors = {
<<<<<<< HEAD
        blue: 'from-aurora-blue to-blue-600',
        green: 'from-emerald-400 to-emerald-600',
        purple: 'from-aurora-purple to-purple-600',
        orange: 'from-orange-400 to-red-500',
        cyan: 'from-aurora-cyan to-blue-500',
    };

    return (
        <div className="glass-card p-6 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl hover:shadow-aurora-cyan/10">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors[color]} opacity-10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:opacity-20 transition-opacity duration-300`}></div>

            <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-400 mb-1 group-hover:text-gray-300 transition-colors">
                        {title}
                    </p>
                    <p className="text-3xl font-bold text-white mb-1 tracking-tight">
                        {value}
                    </p>
                    {subtitle && (
                        <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
=======
        blue: 'from-blue-500 to-blue-600',
        green: 'from-green-500 to-emerald-600',
        purple: 'from-purple-500 to-pink-600',
        orange: 'from-orange-500 to-red-600',
        cyan: 'from-cyan-500 to-blue-600',
    };

    return (
        <Card hover={false} className="p-6">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        {value}
                    </p>
                    {subtitle && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                            {subtitle}
                        </p>
                    )}
                </div>
<<<<<<< HEAD
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors[color]} flex items-center justify-center text-white shadow-lg group-hover:shadow-aurora-cyan/30 group-hover:scale-110 transition-all duration-300`}>
                    {icon}
                </div>
            </div>
        </div>
=======
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center text-white shadow-lg`}>
                    {icon}
                </div>
            </div>
        </Card>
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
    );
}
