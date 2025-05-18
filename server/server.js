require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
const express = require('express');
const cors = require('cors');
const { Counter, Message } = require('./database'); // Import models

const app = express();
const PORT = 1337;
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
// Allow multiple origins dynamically
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json()); // Parse JSON request bodies

// get count
app.get('/api/count', async (req, res) => {
    try {
        const count = await Counter.findOne({ where: { id: 1 } });
        res.json(count);
    } catch (error) {
        console.error('Error fetching count:', error);
        res.status(500).json({ error: 'Failed to retrieve count' });
    }
});

// increment count
app.put('/api/count', async (req, res) => {
    try {
        // 1. Find the counter (with await!)
        const counter = await Counter.findOne({ where: { id: 1 } });

        if (!counter) {
            return res.status(404).json({ error: 'Counter not found' });
        }

        // 2. Increment the count
        const newCount = counter.count + 1;

        // 3. Update the counter
        await Counter.update({ count: newCount }, { where: { id: 1 } });

        res.json({ count: newCount });

    } catch (error) {
        console.error('Error updating count:', error);
        res.status(500).json({ error: 'Failed to update count' });
    }
});
// add a message
app.post('/api/message', async (req, res) => {
    try {
        const { name, message } = req.body;
        if (!name || !message) return res.status(400).json({ error: 'Missing required fields' });

        const newMessage = await Message.create({ name, message });
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error adding message:', error);
        res.status(500).json({ error: 'Failed to add message' });
    }
});

// get all messages 
app.get('/api/messages', async (req, res) => {
    try {
        // Sort them by newest first
        const messages = await Message.findAll({
            order: [['createdAt', 'DESC']],
        });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
});

// 🚀 Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});