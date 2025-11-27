import api from './api';
import { authService } from './authService';

// Get current user ID
const getUserId = () => {
    const authData = authService.getCurrentUser();
    return authData?.user?.id;
};

export const eventService = {
    // Get all events for current user
    getEvents: async () => {
        const userId = getUserId();
        if (!userId) throw new Error('User not authenticated');

        const response = await api.get('/events', {
            params: { userId }
        });
        return response.data;
    },

    // Create new event
    createEvent: async (eventData) => {
        const userId = getUserId();
        if (!userId) throw new Error('User not authenticated');

        const response = await api.post('/events', {
            ...eventData,
            userId,
            createdAt: new Date().toISOString(),
        });
        return response.data;
    },

    // Update event
    updateEvent: async (id, eventData) => {
        const userId = getUserId();
        if (!userId) throw new Error('User not authenticated');

        // Verify ownership
        const existing = await api.get(`/events/${id}`);
        if (existing.data.userId !== userId) {
            throw new Error('Unauthorized access');
        }

        const response = await api.put(`/events/${id}`, {
            ...eventData,
            userId, // Ensure userId doesn't change
        });
        return response.data;
    },

    // Delete event
    deleteEvent: async (id) => {
        const userId = getUserId();
        if (!userId) throw new Error('User not authenticated');

        // Verify ownership
        const existing = await api.get(`/events/${id}`);
        if (existing.data.userId !== userId) {
            throw new Error('Unauthorized access');
        }

        await api.delete(`/events/${id}`);
        return id;
    }
};
