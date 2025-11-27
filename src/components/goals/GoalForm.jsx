import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function GoalForm({ goal, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: new Date().toISOString().split('T')[0],
        dueDate: '',
    });

    useEffect(() => {
        if (goal) {
            setFormData({
                title: goal.title || '',
                description: goal.description || '',
                startDate: goal.startDate || new Date().toISOString().split('T')[0],
                dueDate: goal.dueDate || '',
            });
        }
    }, [goal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (new Date(formData.startDate) > new Date(formData.dueDate)) {
            alert('Start date cannot be after due date');
            return;
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Goal Title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter your goal title"
                required
            />

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your goal..."
                    rows={3}
                    className="w-full px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-white placeholder-gray-500 focus:ring-2 focus:ring-aurora-cyan focus:border-transparent transition-colors"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Start Date"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Due Date"
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="flex items-center gap-3 pt-2">
                <Button type="submit" variant="primary" className="flex-1">
                    {goal ? 'Update Goal' : 'Create Goal'}
                </Button>
                <Button type="button" onClick={onCancel} variant="outline" className="flex-1">
                    Cancel
                </Button>
            </div>
        </form>
    );
}
