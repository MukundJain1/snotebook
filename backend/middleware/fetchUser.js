import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; // secret key for signing JWT tokens, should be stored in an environment variable in production

export const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send('Access denied. No token provided.');
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach the user information to the request object
        next(); // Call the next middleware or route handler
    }catch(err){
        return res.status(400).send('Invalid token');
    }
}