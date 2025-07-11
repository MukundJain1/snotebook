import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; // secret key for signing JWT tokens, should be stored in an environment variable in production

export const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: 'No auth token, access denied' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.user && decoded.user.id) {
            req.user = { id: decoded.user.id };
        } else {
            req.user = decoded;
        }

        next();
    } catch (err) {
        return res.status(400).json({ error: 'Invalid token' });
    }
};
