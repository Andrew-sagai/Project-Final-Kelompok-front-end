import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Badge from '../ui/Badge';

export default function TaskItem({ task, goalId, onToggle, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);

    const handleSave = () => {
        if (editedTitle.trim()) {
            onUpdate(goalId, task.id, { title: editedTitle.trim() });
            setIsEditing(false);
        }
    };

    const handleStatusChange = () => {
        const statusMap = {
            'Not Started': 'In Progress',
            'In Progress': 'Completed',
            'Completed': 'Not Started'
        };
        onUpdate(goalId, task.id, { status: statusMap[task.status] });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'success';
            case 'In Progress': return 'warning';
            default: return 'gray';
        }
    };

    const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Completed';

    return (
        <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${isOverdue
<<<<<<< HEAD
            ? 'bg-red-500/10 border-red-500/20'
            : 'bg-white/5 border-white/10 hover:border-aurora-cyan/50'
=======
                ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
            }`}>
            {/* Status Toggle */}
            <button
                onClick={handleStatusChange}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${task.status === 'Completed'
<<<<<<< HEAD
                    ? 'bg-green-500 border-green-500'
                    : task.status === 'In Progress'
                        ? 'border-yellow-500 bg-yellow-500/20'
                        : 'border-white/20 hover:border-aurora-cyan'
=======
                        ? 'bg-green-500 border-green-500'
                        : task.status === 'In Progress'
                            ? 'border-yellow-500 bg-yellow-50'
                            : 'border-gray-300 hover:border-blue-500'
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                    }`}
                title={`Status: ${task.status} (Click to change)`}
            >
                {task.status === 'Completed' && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                )}
                {task.status === 'In Progress' && (
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                )}
            </button>

            {/* Task Content */}
            <div className="flex-1 min-w-0">
                {isEditing ? (
                    <div className="flex items-center gap-2">
                        <Input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="flex-1 h-8 text-sm"
                            autoFocus
                        />
                        <Button onClick={handleSave} size="sm" variant="success">Save</Button>
                        <Button onClick={() => setIsEditing(false)} size="sm" variant="outline">Cancel</Button>
                    </div>
                ) : (
                    <div className="flex items-center justify-between">
                        <div>
<<<<<<< HEAD
                            <p className={`text-sm font-medium truncate ${task.status === 'Completed' ? 'text-gray-500 line-through' : 'text-white'
=======
                            <p className={`text-sm font-medium truncate ${task.status === 'Completed' ? 'text-gray-500 line-through' : 'text-gray-900 dark:text-white'
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                                }`}>
                                {task.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
<<<<<<< HEAD
                                <span className="text-xs text-gray-400">
=======
                                <span className="text-xs text-gray-500 dark:text-gray-400">
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                                    {new Date(task.startDate).toLocaleDateString()} - {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                                {isOverdue && (
                                    <span className="text-xs font-bold text-red-600 dark:text-red-400">
                                        Overdue
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Badge variant={getStatusColor(task.status)} size="sm">
                                {task.status}
                            </Badge>
                        </div>
                    </div>
                )}
            </div>

            {/* Actions */}
            {!isEditing && (
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(goalId, task.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}
