import api from './api';
import { authService } from './authService';

// Get current user ID
const getUserId = () => {
    const authData = authService.getCurrentUser();
    return authData?.user?.id;
};

export const habitService = {
    // Get user's habit plan (single plan per user)
    getHabitPlan: async () => {
        const userId = getUserId();
        if (!userId) throw new Error('User not authenticated');

        const response = await api.get('/habits', {
            params: { userId }
        });

        // Return first plan (should only be one per user)
        return response.data[0] || null;
    },

    // Create habit plan
    createHabitPlan: async (planData) => {
        const userId = getUserId();
        if (!userId) throw new Error('User not authenticated');

        // Check if user already has a plan
        const existing = await habitService.getHabitPlan();
        if (existing) {
            throw new Error('User already has a habit plan. Please update instead.');
        }

        const response = await api.post('/habits', {
            userId,
            habitPlanName: planData.habitPlanName || 'Daily Routine',
            habits: planData.habits || [],
            lastUpdated: new Date().toISOString(),
        });

        return response.data;
    },

    // Update habit plan
    updateHabitPlan: async (id, planData) => {
        const userId = getUserId();
        if (!userId) throw new Error('User not authenticated');

        const response = await api.put(`/habits/${id}`, {
            ...planData,
            userId,
            lastUpdated: new Date().toISOString(),
        });

        return response.data;
    },

    // Toggle habit completion for today
    toggleHabit: async (id, habitIndex) => {
        const plan = await habitService.getHabitPlan();
        if (!plan || plan.id !== id) {
            throw new Error('Habit plan not found');
        }

        const updatedHabits = plan.habits.map((habit, index) =>
            index === habitIndex
                ? { ...habit, isDoneToday: !habit.isDoneToday }
                : habit
        );

        const response = await api.put(`/habits/${id}`, {
            ...plan,
            habits: updatedHabits,
            lastUpdated: new Date().toISOString(),
        });

        return response.data;
    },

    // Reset all habits for new day
    resetDailyHabits: async (id) => {
        const plan = await habitService.getHabitPlan();
        if (!plan || plan.id !== id) {
            throw new Error('Habit plan not found');
        }

        const updatedHabits = plan.habits.map(habit => ({
            ...habit,
            isDoneToday: false,
        }));

        const response = await api.put(`/habits/${id}`, {
            ...plan,
            habits: updatedHabits,
            lastUpdated: new Date().toISOString(),
        });

        return response.data;
    },

    // Delete habit plan
    deleteHabitPlan: async (id) => {
        const userId = getUserId();
        if (!userId) throw new Error('User not authenticated');

        await api.delete(`/habits/${id}`);
        return id;
    },
};
