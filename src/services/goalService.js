import api from './api';
import { authService } from './authService';

// Get current user ID
const getUserId = () => {
    const authData = authService.getCurrentUser();
    return authData?.user?.id;
};

// Calculate progress based on completed tasks
const calculateProgress = (tasks) => {
    if (!tasks || tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.status === 'Completed').length;
    return Math.round((completed / tasks.length) * 100);
};

// Generate unique task ID
const generateTaskId = () => {
    return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Validate dates
const validateDates = (start, end, parentStart, parentEnd) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (startDate > endDate) {
        throw new Error('Start date cannot be after due date');
    }

    if (parentStart && parentEnd) {
        const pStart = new Date(parentStart);
        const pEnd = new Date(parentEnd);

        if (startDate < pStart || endDate > pEnd) {
            throw new Error('Task dates must be within Goal date range');
        }
    }
};

export const goalService = {
    // Get all goals for current user
    getGoals: async () => {
        const userId = getUserId();
        if (!userId) throw new Error('User not authenticated');

        const response = await api.get('/goals', {
            params: { userId }
        });

        // Sort by due date (closest first)
        return response.data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    },

    // Get single goal by ID
    getGoal: async (id) => {
        const userId = getUserId();
        if (!userId) throw new Error('User not authenticated');

        const response = await api.get(`/goals/${id}`);

        if (response.data.userId !== userId) {
            throw new Error('Unauthorized access');
        }

        return response.data;
    },

    // Create new goal
    createGoal: async (goalData) => {
        const userId = getUserId();
        if (!userId) throw new Error('User not authenticated');

        validateDates(goalData.startDate, goalData.dueDate);

        const response = await api.post('/goals', {
            ...goalData,
            userId,
            progress: 0,
            tasks: [],
            createdAt: new Date().toISOString(),
        });
        return response.data;
    },

    // Update goal
    updateGoal: async (id, goalData) => {
        const userId = getUserId();
        if (!userId) throw new Error('User not authenticated');

        validateDates(goalData.startDate, goalData.dueDate);

        const response = await api.put(`/goals/${id}`, {
            ...goalData,
            userId,
        });
        return response.data;
    },

    // Delete goal
    deleteGoal: async (id) => {
        const userId = getUserId();
        if (!userId) throw new Error('User not authenticated');

        await goalService.getGoal(id); // Verify ownership
        await api.delete(`/goals/${id}`);
        return id;
    },

    // Add task to goal
    addTask: async (goalId, taskData) => {
        const goal = await goalService.getGoal(goalId);

        validateDates(taskData.startDate, taskData.dueDate, goal.startDate, goal.dueDate);

        const newTask = {
            id: generateTaskId(),
            ...taskData,
            status: 'Not Started',
        };

        const updatedTasks = [...(goal.tasks || []), newTask];
        const updatedProgress = calculateProgress(updatedTasks);

        const response = await api.put(`/goals/${goalId}`, {
            ...goal,
            tasks: updatedTasks,
            progress: updatedProgress,
        });

        return response.data;
    },

    // Update task in goal
    updateTask: async (goalId, taskId, updates) => {
        const goal = await goalService.getGoal(goalId);

        // If dates are being updated, validate them
        if (updates.startDate || updates.dueDate) {
            const task = goal.tasks.find(t => t.id === taskId);
            const newStart = updates.startDate || task.startDate;
            const newEnd = updates.dueDate || task.dueDate;
            validateDates(newStart, newEnd, goal.startDate, goal.dueDate);
        }

        const updatedTasks = goal.tasks.map(task =>
            task.id === taskId ? { ...task, ...updates } : task
        );

        const updatedProgress = calculateProgress(updatedTasks);

        const response = await api.put(`/goals/${goalId}`, {
            ...goal,
            tasks: updatedTasks,
            progress: updatedProgress,
        });

        return response.data;
    },

    // Update task status (Not Started -> In Progress -> Completed)
    updateTaskStatus: async (goalId, taskId, status) => {
        const goal = await goalService.getGoal(goalId);

        const updatedTasks = goal.tasks.map(task =>
            task.id === taskId ? { ...task, status } : task
        );

        const updatedProgress = calculateProgress(updatedTasks);

        const response = await api.put(`/goals/${goalId}`, {
            ...goal,
            tasks: updatedTasks,
            progress: updatedProgress,
        });

        return response.data;
    },

    // Delete task from goal
    deleteTask: async (goalId, taskId) => {
        const goal = await goalService.getGoal(goalId);

        const updatedTasks = goal.tasks.filter(task => task.id !== taskId);
        const updatedProgress = calculateProgress(updatedTasks);

        const response = await api.put(`/goals/${goalId}`, {
            ...goal,
            tasks: updatedTasks,
            progress: updatedProgress,
        });

        return response.data;
    },
};
