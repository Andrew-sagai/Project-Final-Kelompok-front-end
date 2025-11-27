import { useState, useEffect } from 'react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

export default function GoalCard({ goal, onEdit, onDelete, onAddTask, onToggleTask, onUpdateTask, onDeleteTask }) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState('');

    useEffect(() => {
        const calculateTimeRemaining = () => {
            const now = new Date();
            const due = new Date(goal.dueDate);
            const diff = due - now;

            if (diff < 0) return 'Overdue';

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            if (days > 0) return `${days} days left`;
            return `${hours}h ${minutes}m left`;
        };

        setTimeRemaining(calculateTimeRemaining());
        const timer = setInterval(() => setTimeRemaining(calculateTimeRemaining()), 60000);
        return () => clearInterval(timer);
    }, [goal.dueDate]);

    const handleAddTask = async (goalId, taskData) => {
        await onAddTask(goalId, taskData);
        setShowTaskForm(false);
    };

    const completedTasks = goal.tasks?.filter(t => t.status === 'Completed').length || 0;
    const totalTasks = goal.tasks?.length || 0;
    const isOverdue = new Date(goal.dueDate) < new Date() && goal.progress < 100;

    return (
        <Card className={`p-6 transition-all hover:shadow-lg ${isOverdue ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-blue-500'
            }`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-white">
                            {goal.title}
                        </h3>
                        <Badge variant={isOverdue ? 'danger' : goal.progress === 100 ? 'success' : 'primary'} size="sm">
                            {isOverdue ? 'Overdue' : goal.progress === 100 ? 'Completed' : 'Active'}
                        </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(goal.startDate).toLocaleDateString()} - {new Date(goal.dueDate).toLocaleDateString()}
                        </span>
                        <span className={`font-medium ${timeRemaining === 'Overdue' ? 'text-red-600' : 'text-blue-600'
                            }`}>
                            {timeRemaining}
                        </span>
                    </div>

                    {goal.description && (
                        <p className="text-gray-400 text-sm mt-2">
                            {goal.description}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                    <button
                        onClick={() => onEdit(goal)}
                        className="p-2 text-gray-400 hover:text-aurora-cyan hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(goal.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300">
                        Progress: {completedTasks}/{totalTasks} tasks completed
                    </span>
                    <span className="text-sm font-bold text-aurora-cyan">
                        {goal.progress}%
                    </span>
                </div>
                <ProgressBar progress={goal.progress} color={isOverdue ? 'red' : 'blue'} height="md" showLabel={false} />
            </div>

            {/* Tasks Section */}
            <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between mb-3">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                    >
                        <svg
                            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Tasks ({totalTasks})
                    </button>
                    <Button
                        onClick={() => setShowTaskForm(!showTaskForm)}
                        size="sm"
                        variant="outline"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Task
                    </Button>
                </div>

                {/* Task Form */}
                {showTaskForm && (
                    <div className="mb-3">
                        <TaskForm
                            goalId={goal.id}
                            goalDates={{ start: goal.startDate, end: goal.dueDate }}
                            onSubmit={handleAddTask}
                            onCancel={() => setShowTaskForm(false)}
                        />
                    </div>
                )}

                {/* Task List */}
                {isExpanded && (
                    <div className="space-y-2">
                        {totalTasks > 0 ? (
                            goal.tasks.map(task => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    goalId={goal.id}
                                    onToggle={onToggleTask}
                                    onDelete={onDeleteTask}
                                    onUpdate={onUpdateTask}
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-400 py-4 text-sm">
                                No tasks yet. Add your first task to get started!
                            </p>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
}
