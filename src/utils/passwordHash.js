// Simple password hashing utility
// Note: In production, use bcrypt or similar library
// This is a demonstration using Base64 encoding with salt

export const hashPassword = (password) => {
    // Add salt to password
    const salt = 'life-planner-salt-2025';
    const saltedPassword = password + salt;

    // Convert to Base64
    const hash = btoa(saltedPassword);

    return hash;
};

export const verifyPassword = (password, hash) => {
    const hashedInput = hashPassword(password);
    return hashedInput === hash;
};

// Generate a simple auth token
export const generateToken = (userId, email) => {
    const tokenData = {
        userId,
        email,
        timestamp: new Date().getTime(),
    };

    return btoa(JSON.stringify(tokenData));
};

// Decode auth token
export const decodeToken = (token) => {
    try {
        return JSON.parse(atob(token));
    } catch (error) {
        return null;
    }
};
