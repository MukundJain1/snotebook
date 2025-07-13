import express from 'express';
import db from '../db.js';
import bcrypt from 'bcryptjs'; // for hashing passwords
import jwt from 'jsonwebtoken'; // for generating JWT tokens
import { body, validationResult } from 'express-validator'; // for validating request body
import { fetchUser } from '../middleware/fetchUser.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router(); // this is the router for auth routes

const JWT_SECRET = process.env.JWT_SECRET; // secret key for signing JWT tokens, should be stored in an environment variable in production

// ROUTE 1: SIGNUP page
router.post('/signup', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long')
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
        const userExists = await db.query('SELECT * FROM userinfo WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ success, error: "User already exists with this email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await db.query(
            'INSERT INTO userinfo (name, email, password) VALUES ($1, $2, $3) RETURNING id',
            [name, email, hashedPassword]
        );

        const userId = newUser.rows[0].id;
        const data = { id: userId };
        const token = jwt.sign(data, JWT_SECRET);
        success = true;
        return res.status(200).json({ success, token });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// ROUTE 2: SIGNIN page
router.post('/signin',
    [
        body('email').isEmail().withMessage('Please enter a valid email address'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
    ], // this array is for validation rules
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {
            const email = req.body['email'];
            const result = await db.query('SELECT * FROM userinfo WHERE email =$1', [email]);
            if (result.rows.length === 0) {
                return res.status(400).json({ success, error: 'USER NOT FOUND' });
            }
            const user = result.rows[0];
            if (!await bcrypt.compare(req.body['password'], user.password)) { // compare the hashed password with the password entere by the user req.body['password'] (entered by user ) and user.password (hashed password from database)
                return res.status(400).json({ success, error: 'Invalid password' });
            }
            success = true;
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email
            }
            const token = jwt.sign(payload, JWT_SECRET); // generate a JWT token with the user id, name and email
            res.json({ success, token }); // send the token back to the client
        } catch (err) {
            return res.status(500).json({ success: false, error: 'Error signing in: ' + err.message });
        }
    });


// ROUTE 3: GET USER DETAILS
router.post('/getUser', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id; // get the user id from the request object
        const result = await db.query('SELECT name, email FROM userinfo WHERE id =$1', [userId]);
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json(result.rows[0]); // send the user details back to the client
    } catch (err) {
        return res.status(500).json({ success: false, error: 'Error fetching user details: ' + err.message });
    }
})

export default router;