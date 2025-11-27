import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function EventCalendar({ events, onEdit, onDelete, onAdd }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        return { days, firstDay };
    };

    const { days, firstDay } = getDaysInMonth(currentDate);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const getEventsForDay = (day) => {
        const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            .toISOString().split('T')[0];
        return events.filter(e => e.date === dateStr);
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

    return (
        <div className="space-y-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between">
<<<<<<< HEAD
                <h2 className="text-2xl font-bold text-white">
=======
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex items-center gap-2">
                    <Button onClick={handlePrevMonth} variant="outline" size="sm">
                        ←
                    </Button>
                    <Button onClick={() => setCurrentDate(new Date())} variant="outline" size="sm">
                        Today
                    </Button>
                    <Button onClick={handleNextMonth} variant="outline" size="sm">
                        →
                    </Button>
                    <Button onClick={onAdd} variant="primary" size="sm" className="ml-2">
                        + New Event
                    </Button>
                </div>
            </div>

            {/* Calendar Grid */}
            <Card className="p-6">
                <div className="grid grid-cols-7 gap-4 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
<<<<<<< HEAD
                        <div key={day} className="text-center font-bold text-gray-400">
=======
                        <div key={day} className="text-center font-bold text-gray-500 dark:text-gray-400">
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {/* Empty cells for previous month */}
                    {Array.from({ length: firstDay }).map((_, i) => (
<<<<<<< HEAD
                        <div key={`empty-${i}`} className="h-32 bg-white/5 rounded-lg opacity-50" />
=======
                        <div key={`empty-${i}`} className="h-32 bg-gray-50 dark:bg-gray-800/50 rounded-lg opacity-50" />
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                    ))}

                    {/* Days */}
                    {Array.from({ length: days }).map((_, i) => {
                        const day = i + 1;
                        const dayEvents = getEventsForDay(day);
                        const isToday = new Date().toDateString() ===
                            new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

                        return (
                            <div
                                key={day}
                                className={`h-32 p-2 border rounded-lg overflow-y-auto ${isToday
<<<<<<< HEAD
                                    ? 'border-aurora-blue/50 bg-aurora-blue/10'
                                    : 'border-white/10 bg-white/5'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-sm font-bold ${isToday ? 'text-aurora-blue' : 'text-gray-300'
=======
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-sm font-bold ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                                        }`}>
                                        {day}
                                    </span>
                                    {dayEvents.length > 0 && (
<<<<<<< HEAD
                                        <span className="text-xs text-gray-400">{dayEvents.length} events</span>
=======
                                        <span className="text-xs text-gray-500">{dayEvents.length} events</span>
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                                    )}
                                </div>

                                <div className="space-y-1">
                                    {dayEvents.map(event => (
                                        <div
                                            key={event.id}
                                            onClick={() => onEdit(event)}
<<<<<<< HEAD
                                            className="text-xs p-1 rounded cursor-pointer hover:opacity-80 truncate bg-white/10 shadow-sm border border-white/10"
=======
                                            className="text-xs p-1 rounded cursor-pointer hover:opacity-80 truncate bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600"
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                                        >
                                            <div className="flex items-center gap-1">
                                                <div className={`w-1.5 h-1.5 rounded-full bg-${getTypeColor(event.type)}-500`} />
                                                <span className="truncate">{event.time} {event.title}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* Upcoming Events List */}
            <Card className="p-6">
<<<<<<< HEAD
                <h3 className="text-lg font-bold text-white mb-4">
=======
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                    Upcoming Events
                </h3>
                <div className="space-y-3">
                    {events
                        .filter(e => new Date(e.date) >= new Date())
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .slice(0, 5)
                        .map(event => (
<<<<<<< HEAD
                            <div key={event.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-12 rounded-full bg-${getTypeColor(event.type)}-500`} />
                                    <div>
                                        <h4 className="font-medium text-white">{event.title}</h4>
                                        <p className="text-sm text-gray-400">
=======
                            <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-12 rounded-full bg-${getTypeColor(event.type)}-500`} />
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                                            {new Date(event.date).toLocaleDateString()} at {event.time || 'All Day'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant={getTypeColor(event.type)} size="sm">{event.type}</Badge>
                                    <button
                                        onClick={() => onDelete(event.id)}
                                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    {events.filter(e => new Date(e.date) >= new Date()).length === 0 && (
<<<<<<< HEAD
                        <p className="text-gray-400 text-center py-4">
=======
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                            No upcoming events scheduled.
                        </p>
                    )}
                </div>
            </Card>
        </div>
    );
}
