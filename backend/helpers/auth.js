import jwt from 'jsonwebtoken';
import config from '../config/config.js';

// Middleware to validate JWT
const isAuthenticated = () => (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "You need to be logged in or have a valid access to perform this action. Please try login in again"
        });
    }

    try {
        jwt.verify(token, config.SECRETKEY, (err, user) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: "Your session expired, please sign in again"
                }); // Forbidden if token is invalid
            }

            req.user = user; // Attach the user payload to the request object
            next(); // Proceed to the next middleware or route handler
        });
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "You need to be logged in to perform this action"
        })
    }


};

// Middleware to check user role
const isAdmin = () => (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({
            success: false,
            message: "You need to be admin to access this resource"
        }); // Forbidden if it is not admin
    }
    next(); // Proceed if the user has the required role
};

export { isAuthenticated, isAdmin }