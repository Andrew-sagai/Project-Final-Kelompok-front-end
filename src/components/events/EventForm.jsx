import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function EventForm({ event, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        title: '',
        date: new Date().toISOString().split('T')[0],
        time: '',
        type: 'Activity',
    });

    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title || '',
                date: event.date || new Date().toISOString().split('T')[0],
                time: event.time || '',
                type: event.type || 'Activity',
            });
        }
    }, [event]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Event Name"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Meeting with team"
                required
                autoFocus
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Time"
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type
                </label>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="Activity">Activity</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Personal">Personal</option>
                    <option value="Task Reminder">Task Reminder</option>
                </select>
            </div>

            <div className="flex items-center gap-3 pt-2">
                <Button type="submit" variant="primary" className="flex-1">
                    {event ? 'Update Event' : 'Create Event'}
                </Button>
                <Button type="button" onClick={onCancel} variant="outline" className="flex-1">
                    Cancel
                </Button>
            </div>
        </form>
    );
}
