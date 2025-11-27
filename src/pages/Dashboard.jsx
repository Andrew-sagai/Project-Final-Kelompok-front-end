import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from '../components/dashboard/DashboardCard';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import { goalService } from '../services/goalService';
import { habitService } from '../services/habitService';
import { eventService } from '../services/eventService';

export default function Dashboard() {
    const [stats, setStats] = useState({
        goals: { total: 0, avgProgress: 0, tasksCompleted: 0, totalTasks: 0 },
        habits: { total: 0, completedToday: 0 },
        events: { upcoming: 0 }
    });
    const [recentGoals, setRecentGoals] = useState([]);
    const [habitPlan, setHabitPlan] = useState(null);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [goals, plan, events] = await Promise.all([
                goalService.getGoals(),
                habitService.getHabitPlan(),
                eventService.getEvents()
            ]);

            // Calculate goal stats
            const avgProgress = goals.length > 0
                ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
                : 0;

            const tasksCompleted = goals.reduce((sum, g) =>
                sum + (g.tasks?.filter(t => t.status === 'Completed').length || 0), 0
            );
            const totalTasks = goals.reduce((sum, g) => sum + (g.tasks?.length || 0), 0);

            // Calculate habit stats
            const habitTotal = plan?.habits?.length || 0;
            const habitCompletedToday = plan?.habits?.filter(h => h.isDoneToday).length || 0;

            // Filter upcoming events
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const upcoming = events
                .filter(e => new Date(e.date) >= now)
                .sort((a, b) => new Date(a.date) - new Date(b.date));

            setStats({
                goals: { total: goals.length, avgProgress, tasksCompleted, totalTasks },
                habits: { total: habitTotal, completedToday: habitCompletedToday },
                events: { upcoming: upcoming.length }
            });

            setRecentGoals(goals.slice(0, 3));
            setHabitPlan(plan);
            setUpcomingEvents(upcoming.slice(0, 5));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'Meeting': return 'purple';
            case 'Activity': return 'blue';
            case 'Personal': return 'green';
            case 'Task Reminder': return 'yellow';
            default: return 'gray';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
<<<<<<< HEAD
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                        Welcome Back! <span className="animate-pulse inline-block">👋</span>
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Here's your productivity overview
                    </p>
                </div>
                <div className="hidden md:block">
                    <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-sm text-gray-300">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
=======
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Welcome Back! 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Here's your productivity overview
                </p>
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard
                    title="Active Goals"
                    value={stats.goals.total}
                    subtitle={`${stats.goals.avgProgress}% avg progress`}
                    color="purple"
                    icon={
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    }
                />

                <DashboardCard
                    title="Tasks Completed"
                    value={stats.goals.tasksCompleted}
                    subtitle={`${stats.goals.totalTasks} total tasks`}
                    color="blue"
                    icon={
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    }
                />

                <DashboardCard
                    title="Upcoming Events"
                    value={stats.events.upcoming}
                    subtitle="Scheduled events"
                    color="yellow"
                    icon={
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    }
                />
            </div>

<<<<<<< HEAD
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Goals */}
                <Card className="p-6 glass-panel border-none">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="w-1 h-6 bg-aurora-purple rounded-full"></span>
                            Recent Goals
                        </h2>
                        <Link to="/goals" className="text-aurora-cyan hover:text-aurora-blue text-sm font-medium transition-colors">
=======
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Goals */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Recent Goals
                        </h2>
                        <Link to="/goals" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                            View All →
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentGoals.length > 0 ? (
                            recentGoals.map(goal => (
<<<<<<< HEAD
                                <div key={goal.id} className="p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/5">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="font-medium text-white">{goal.title}</p>
                                        <span className="text-sm font-bold text-aurora-cyan">
=======
                                <div key={goal.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-medium text-gray-900 dark:text-white">{goal.title}</p>
                                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                                            {goal.progress}%
                                        </span>
                                    </div>
                                    <ProgressBar progress={goal.progress} color="blue" showLabel={false} height="sm" />
<<<<<<< HEAD
                                    <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
=======
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                                        {goal.tasks?.filter(t => t.status === 'Completed').length || 0}/{goal.tasks?.length || 0} tasks completed
                                    </p>
                                </div>
                            ))
                        ) : (
<<<<<<< HEAD
                            <p className="text-gray-400 text-center py-8">
                                No goals yet. <Link to="/goals" className="text-aurora-cyan hover:underline">Create your first goal</Link>
=======
                            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                No goals yet. <Link to="/goals" className="text-blue-600 hover:text-blue-700">Create your first goal</Link>
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                            </p>
                        )}
                    </div>
                </Card>

                {/* Upcoming Events List */}
<<<<<<< HEAD
                <Card className="p-6 glass-panel border-none">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="w-1 h-6 bg-aurora-pink rounded-full"></span>
                            Upcoming Events
                        </h2>
                        <Link to="/events" className="text-aurora-cyan hover:text-aurora-blue text-sm font-medium transition-colors">
=======
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Upcoming Events
                        </h2>
                        <Link to="/events" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                            View Calendar →
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {upcomingEvents.length > 0 ? (
                            upcomingEvents.map(event => (
<<<<<<< HEAD
                                <div key={event.id} className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/5 group">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-1 h-12 rounded-full bg-${getTypeColor(event.type)}-500 group-hover:scale-y-110 transition-transform`} />
                                        <div>
                                            <h4 className="font-medium text-white">{event.title}</h4>
                                            <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
=======
                                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-1.5 h-10 rounded-full bg-${getTypeColor(event.type)}-500`} />
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                                                {new Date(event.date).toLocaleDateString()} • {event.time || 'All Day'}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge variant={getTypeColor(event.type)} size="sm">{event.type}</Badge>
                                </div>
                            ))
                        ) : (
<<<<<<< HEAD
                            <p className="text-gray-400 text-center py-8">
                                No upcoming events. <Link to="/events" className="text-aurora-cyan hover:underline">Schedule one</Link>
=======
                            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                No upcoming events. <Link to="/events" className="text-blue-600 hover:text-blue-700">Schedule one</Link>
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                            </p>
                        )}
                    </div>
                </Card>
            </div>

            {/* Today's Habits */}
            {habitPlan && (
<<<<<<< HEAD
                <Card className="p-6 glass-panel border-none">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="w-1 h-6 bg-aurora-cyan rounded-full"></span>
                            Today's Habits
                        </h2>
                        <Link to="/habits" className="text-aurora-cyan hover:text-aurora-blue text-sm font-medium transition-colors">
                            View Plan →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {habitPlan.habits && habitPlan.habits.length > 0 ? (
                            habitPlan.habits.map((habit, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/5">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${habit.isDoneToday ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-gray-400'}`}>
                                        {habit.isDoneToday ? (
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`font-medium text-lg ${habit.isDoneToday ? 'text-gray-500 line-through' : 'text-white'}`}>
                                            {habit.habitTitle}
                                        </p>
                                        <p className="text-sm text-gray-400">{habit.time}</p>
=======
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Today's Habits
                        </h2>
                        <Link to="/habits" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View Plan →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {habitPlan.habits && habitPlan.habits.length > 0 ? (
                            habitPlan.habits.map((habit, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${habit.isDoneToday ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                                        {habit.isDoneToday && (
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`font-medium ${habit.isDoneToday ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                                            {habit.habitTitle}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{habit.time}</p>
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                                    </div>
                                </div>
                            ))
                        ) : (
<<<<<<< HEAD
                            <p className="text-gray-400 text-center py-8 col-span-full">
                                No habits in your plan. <Link to="/habits" className="text-aurora-cyan hover:underline">Create habit plan</Link>
=======
                            <p className="text-gray-500 dark:text-gray-400 text-center py-8 col-span-full">
                                No habits in your plan. <Link to="/habits" className="text-blue-600 hover:text-blue-700">Create habit plan</Link>
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                            </p>
                        )}
                    </div>
                </Card>
            )}
        </div>
    );
}
