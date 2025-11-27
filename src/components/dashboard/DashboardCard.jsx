import Card from '../ui/Card';

export default function DashboardCard({ title, value, icon, color = 'blue', subtitle }) {
    const colors = {
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
                            {subtitle}
                        </p>
                    )}
                </div>
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center text-white shadow-lg`}>
                    {icon}
                </div>
            </div>
        </Card>
    );
}
