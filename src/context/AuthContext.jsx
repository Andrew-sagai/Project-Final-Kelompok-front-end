import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load auth state from localStorage on mount
    useEffect(() => {
        const authData = authService.getCurrentUser();
        if (authData) {
            setUser(authData.user);
            setToken(authData.token);
        }
        setLoading(false);
    }, []);

    // Save auth state to localStorage
    const saveAuthData = (userData, userToken) => {
        const authData = {
            user: userData,
            token: userToken,
        };
        localStorage.setItem('auth', JSON.stringify(authData));
        setUser(userData);
        setToken(userToken);
    };

    // Register function
    const register = async (name, email, password) => {
        try {
            const { user: userData, token: userToken } = await authService.registerUser(name, email, password);
            saveAuthData(userData, userToken);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Login function
    const login = async (email, password) => {
        try {
            const { user: userData, token: userToken } = await authService.loginUser(email, password);
            saveAuthData(userData, userToken);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Logout function
    const logout = () => {
        authService.logoutUser();
        setUser(null);
        setToken(null);
    };

    const value = {
        user,
        token,
        loading,
        isAuthenticated: !!user,
        register,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
