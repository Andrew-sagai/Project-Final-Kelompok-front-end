import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function TaskForm({ goalId, goalDates, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        title: '',
        startDate: new Date().toISOString().split('T')[0],
        dueDate: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.title.trim()) return;

        if (new Date(formData.startDate) > new Date(formData.dueDate)) {
            alert('Start date cannot be after due date');
            return;
        }

        if (goalDates) {
            const gStart = new Date(goalDates.start);
            const gEnd = new Date(goalDates.end);
            const tStart = new Date(formData.startDate);
            const tEnd = new Date(formData.dueDate);

            if (tStart < gStart || tEnd > gEnd) {
                alert(`Task dates must be within Goal range (${goalDates.start} to ${goalDates.end})`);
                return;
            }
        }

        onSubmit(goalId, formData);
        setFormData({
            title: '',
            startDate: new Date().toISOString().split('T')[0],
            dueDate: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 space-y-3">
            <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title..."
                required
                autoFocus
            />

            <div className="grid grid-cols-2 gap-3">
                <Input
                    label="Start Date"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="text-sm"
                />
                <Input
                    label="Due Date"
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                    className="text-sm"
                />
            </div>

            <div className="flex justify-end gap-2">
                {onCancel && (
                    <Button type="button" onClick={onCancel} size="sm" variant="outline">
                        Cancel
                    </Button>
                )}
                <Button type="submit" size="sm" variant="primary">
                    Add Task
                </Button>
            </div>
        </form>
    );
}
