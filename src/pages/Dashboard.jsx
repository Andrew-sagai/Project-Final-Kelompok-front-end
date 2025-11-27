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
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Welcome Back! 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Here's your productivity overview
                </p>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Goals */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Recent Goals
                        </h2>
                        <Link to="/goals" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View All →
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentGoals.length > 0 ? (
                            recentGoals.map(goal => (
                                <div key={goal.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-medium text-gray-900 dark:text-white">{goal.title}</p>
                                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                            {goal.progress}%
                                        </span>
                                    </div>
                                    <ProgressBar progress={goal.progress} color="blue" showLabel={false} height="sm" />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                        {goal.tasks?.filter(t => t.status === 'Completed').length || 0}/{goal.tasks?.length || 0} tasks completed
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                No goals yet. <Link to="/goals" className="text-blue-600 hover:text-blue-700">Create your first goal</Link>
                            </p>
                        )}
                    </div>
                </Card>

                {/* Upcoming Events List */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Upcoming Events
                        </h2>
                        <Link to="/events" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View Calendar →
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {upcomingEvents.length > 0 ? (
                            upcomingEvents.map(event => (
                                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-1.5 h-10 rounded-full bg-${getTypeColor(event.type)}-500`} />
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(event.date).toLocaleDateString()} • {event.time || 'All Day'}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge variant={getTypeColor(event.type)} size="sm">{event.type}</Badge>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                No upcoming events. <Link to="/events" className="text-blue-600 hover:text-blue-700">Schedule one</Link>
                            </p>
                        )}
                    </div>
                </Card>
            </div>

            {/* Today's Habits */}
            {habitPlan && (
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
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-8 col-span-full">
                                No habits in your plan. <Link to="/habits" className="text-blue-600 hover:text-blue-700">Create habit plan</Link>
                            </p>
                        )}
                    </div>
                </Card>
            )}
        </div>
    );
}
