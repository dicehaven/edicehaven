import jwt from 'jsonwebtoken';
import config from './config.js';

// Middleware to validate JWT
const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, config.SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }

        req.user = user; // Attach the user payload to the request object
        next(); // Proceed to the next middleware or route handler
    });
};

// Middleware to check user role
const isAdmin = (requiredRole) => (req, res, next) => {
    if (Boolean(req.user.isAdmin)) {
        return res.sendStatus(403); // Forbidden if it is not admin
    }
    next(); // Proceed if the user has the required role
};


// Middleware to check if the user is the owner or a superAdmin
const isOwner = (req, res, next) => {
    const isProductOwner = req.user.id === req.productOwnerId; // Assume user ID is in the token payload

    if (!isProductOwner) {
        return res.sendStatus(403); // Forbidden if not owner
    }
    next(); // Proceed if the user is superAdmin or the owner of the product
};

export { isAuthenticated, isAdmin, isOwner }