import { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function HabitPlanCard({ plan, onEdit, onToggle, onReset, onDelete }) {
    const completedCount = plan.habits?.filter(h => h.isDoneToday).length || 0;
    const totalCount = plan.habits?.length || 0;
    const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return (
        <Card className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                        {plan.habitPlanName}
                    </h2>
                    <p className="text-sm text-gray-400">
                        {completedCount}/{totalCount} habits completed today ({completionRate}%)
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={() => onEdit(plan)} variant="outline" size="sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Plan
                    </Button>
                    <Button onClick={() => onDelete(plan.id)} variant="danger" size="sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Plan
                    </Button>
                </div>
            </div>

            {/* Habits List */}
            <div className="space-y-3 mb-6">
                {plan.habits && plan.habits.length > 0 ? (
                    plan.habits.map((habit, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            {/* Checkbox */}
                            <button
                                onClick={() => onToggle(plan.id, index)}
                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${habit.isDoneToday
                                    ? 'bg-green-500 hover:bg-green-600'
                                    : 'bg-white/10 hover:bg-white/20'
                                    }`}
                            >
                                {habit.isDoneToday && (
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>

                            {/* Habit Info */}
                            <div className="flex-1">
                                <p className={`font-medium ${habit.isDoneToday ? 'text-gray-500 line-through' : 'text-white'}`}>
                                    {habit.habitTitle}
                                </p>
                            </div>

                            {/* Time */}
                            <Badge variant="primary" size="sm">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {habit.time}
                            </Badge>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400 py-8">
                        No habits in your plan. Click "Edit Plan" to add habits.
                    </p>
                )}
            </div>

            {/* Reset Button */}
            {completedCount > 0 && (
                <div className="border-t border-white/10 pt-4">
                    <Button
                        onClick={() => onReset(plan.id)}
                        variant="outline"
                        className="w-full"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Reset for Tomorrow
                    </Button>
                </div>
            )}
        </Card>
    );
}
