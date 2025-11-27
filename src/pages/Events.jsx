import { useState, useEffect } from 'react';
import EventCalendar from '../components/events/EventCalendar';
import EventForm from '../components/events/EventForm';
import Modal from '../components/ui/Modal';
import { eventService } from '../services/eventService';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const data = await eventService.getEvents();
            setEvents(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching events:', error);
            setLoading(false);
        }
    };

    const handleCreate = async (eventData) => {
        try {
            await eventService.createEvent(eventData);
            await fetchEvents();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const handleUpdate = async (eventData) => {
        try {
            await eventService.updateEvent(editingEvent.id, eventData);
            await fetchEvents();
            setIsModalOpen(false);
            setEditingEvent(null);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await eventService.deleteEvent(id);
                await fetchEvents();
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingEvent(null);
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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Events & Activities
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your schedule and important dates
                    </p>
                </div>
            </div>

            <EventCalendar
                events={events}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAdd={() => setIsModalOpen(true)}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingEvent ? 'Edit Event' : 'Create New Event'}
            >
                <EventForm
                    event={editingEvent}
                    onSubmit={editingEvent ? handleUpdate : handleCreate}
                    onCancel={handleCloseModal}
                />
            </Modal>
        </div>
    );
}
