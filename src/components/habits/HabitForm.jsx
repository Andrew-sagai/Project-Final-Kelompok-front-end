import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function HabitForm({ plan, onSubmit, onCancel }) {
    const [planName, setPlanName] = useState('Daily Routine');
    const [habits, setHabits] = useState([
        { habitTitle: '', time: '06:00', isDoneToday: false }
    ]);

    useEffect(() => {
        if (plan) {
            setPlanName(plan.habitPlanName || 'Daily Routine');
            setHabits(plan.habits && plan.habits.length > 0 ? plan.habits : [
                { habitTitle: '', time: '06:00', isDoneToday: false }
            ]);
        }
    }, [plan]);

    const handleAddHabit = () => {
        setHabits([...habits, { habitTitle: '', time: '06:00', isDoneToday: false }]);
    };

    const handleRemoveHabit = (index) => {
        if (habits.length > 1) {
            setHabits(habits.filter((_, i) => i !== index));
        }
    };

    const handleHabitChange = (index, field, value) => {
        const updated = habits.map((habit, i) =>
            i === index ? { ...habit, [field]: value } : habit
        );
        setHabits(updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validHabits = habits.filter(h => h.habitTitle.trim());
        if (validHabits.length === 0) {
            alert('Please add at least one habit');
            return;
        }
        onSubmit({
            habitPlanName: planName,
            habits: validHabits,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Plan Name"
                type="text"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                placeholder="e.g., Daily Routine, Morning Habits"
                required
            />

            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Habits
                    </label>
                    <Button type="button" onClick={handleAddHabit} size="sm" variant="outline">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Habit
                    </Button>
                </div>

                <div className="space-y-3">
                    {habits.map((habit, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={habit.habitTitle}
                                    onChange={(e) => handleHabitChange(index, 'habitTitle', e.target.value)}
                                    placeholder="Habit name"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    required
                                />
                            </div>
                            <div className="w-32">
                                <input
                                    type="time"
                                    value={habit.time}
                                    onChange={(e) => handleHabitChange(index, 'time', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    required
                                />
                            </div>
                            {habits.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveHabit(index)}
                                    className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                    💡 <strong>Tip:</strong> Add habits you want to do daily and set a specific time for each one.
                </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
                <Button type="submit" variant="primary" className="flex-1">
                    {plan ? 'Update Plan' : 'Create Plan'}
                </Button>
                <Button type="button" onClick={onCancel} variant="outline" className="flex-1">
                    Cancel
                </Button>
            </div>
        </form>
    );
}
