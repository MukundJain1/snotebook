import express from 'express';
import { fetchUser } from '../middleware/fetchUser.js';
const router = express.Router();
import { body, validationResult } from 'express-validator';
import db from '../db.js';

// ROUTER1 : ADDING NOTES

router.post('/addNotes', fetchUser, [
    body('title').isLength({ min: 3 }).withMessage('Title must have atleast 3 characters'),
    body('description').isLength({ min: 5 }).withMessage('Description must have atleast 5 characters'),
    body('content').isLength({ min: 10 }).withMessage('Content must have atleast 10 characters')
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userId = req.user.id;
        const { title, description, content } = req.body;

        try {
            if (!title || !description || !content) {
                return res.status(400).send('All fields are required');
            }
            const result = await db.query('INSERT INTO notebook(user_id, title, description, content) VALUES ($1,$2,$3,$4) RETURNING *', [userId, title, description, content]);
            if (result.rows.length > 0) {
                res.status(201).json({ message: 'Note added successfully', note: result.rows[0] });
            }
            else {
                res.status(400).send('Failed to add note');
            }
        } catch (error) {
            res.status(500).send('Error adding note: ' + error.message);
        }
    });

// ROUTER2 : GETTING ALL NOTES

router.get('/getNotes', fetchUser, async (req, res) => {
    const userId = req.user.id; // Assuming req.user contains the user ID
    try {
        const result = await db.query('SELECT * FROM notebook WHERE user_id = $1', [userId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).send('Error fetching notes: ' + err.message);
    }
});

// ROUTER3 : UPDATING A NOTE
router.put(
    '/updateNote/:id',
    fetchUser,
    async (req, res) => {
        const { title, description, content } = req.body;
        if (!title || !description || !content) {
            return res.status(400).json({ error: "Please provide all fields" });
        }

        try {
            const userId = req.user.id;
            const noteId = req.params.id;

            const result = await db.query(
                `UPDATE notebook SET title = $1,description = $2,content = $3, updated_at=NOW()  WHERE id = $4 AND user_id = $5 RETURNING *`,
                [title, description, content, noteId, userId]
            );
            if (result.rows.length === 0) {
                // either note doesn’t exist, or it’s not owned by this user
                return res.status(404).send('Note not found or you do not have permission to update it');
            }

            res.json({ message: 'Note updated successfully', note: result.rows[0] });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error updating note: ' + err.message);
        }
    }
);

// ROUTER4 : DELETING A NOTE

router.delete('/deleteNote/:id', fetchUser, async (req, res) => {
    const userId = req.user.id;
    const noteId = req.params.id;

    if (!noteId) {
        return res.status(400).send("Note does not exist");
    }
    try {
        const result = await db.query('DELETE FROM notebook WHERE id = $1 AND user_id = $2 RETURNING *', [noteId, userId]);
        if (result.rows.length === 0) {
            return res.status(404).send('Note not found or you do not have permission to delete it');
        }
        return res.json({ message: 'Note deleted successfully', note: result.rows[0] });
    } catch (error) {
        return res.status(500).send('Error deleting note: ' + error.message);
    }
});
export default router;