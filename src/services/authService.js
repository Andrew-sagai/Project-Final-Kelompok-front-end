import api from './api';
import { hashPassword, verifyPassword, generateToken } from '../utils/passwordHash';

export const authService = {
    // Register new user
    registerUser: async (name, email, password) => {
        try {
            // Check if email already exists
            const existingUsers = await api.get('/users', {
                params: { email }
            });

            if (existingUsers.data.length > 0) {
                throw new Error('Email already registered');
            }

            // Hash password
            const hashedPassword = hashPassword(password);

            // Create user
            const response = await api.post('/users', {
                name,
                email,
                password: hashedPassword,
                createdAt: new Date().toISOString(),
            });

            const user = response.data;

            // Generate token
            const token = generateToken(user.id, user.email);

            return {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token,
            };
        } catch (error) {
            throw error;
        }
    },

    // Login user
    loginUser: async (email, password) => {
        try {
            // Find user by email
            const response = await api.get('/users', {
                params: { email }
            });

            if (response.data.length === 0) {
                throw new Error('Email not registered');
            }

            const user = response.data[0];

            // Verify password
            const isPasswordValid = verifyPassword(password, user.password);

            if (!isPasswordValid) {
                throw new Error('Incorrect password');
            }

            // Generate token
            const token = generateToken(user.id, user.email);

            return {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token,
            };
        } catch (error) {
            throw error;
        }
    },

    // Get current user from localStorage
    getCurrentUser: () => {
        const authData = localStorage.getItem('auth');
        if (authData) {
            try {
                return JSON.parse(authData);
            } catch (error) {
                return null;
            }
        }
        return null;
    },

    // Logout user
    logoutUser: () => {
        localStorage.removeItem('auth');
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        const authData = localStorage.getItem('auth');
        return !!authData;
    },
};
