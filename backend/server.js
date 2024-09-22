const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const rooms = {};

app.post('/createRoom', (req, res) => {
	const { hostUserId } = req.body;
	console.log('received:', req.body);
	if (!hostUserId) {
		return res.status(400).json({ error: 'Host User ID is required'});
	}
	const roomId = Math.random().toString(36).substring(2, 8);
	rooms[roomId] = { hostUserId, users: [] };
	console.log('room created: ', roomId);
	return res.json({ roomId });
});

app.post('/joinRoom', (req, res) => {
	const { roomId, userId } = req.body;
	if (!roomId || !userId) {
		return res.status(400).json({ error: 'Room ID and user ID are required'});
	}
	const room = rooms[roomId];
	if (!room) {
		return res.status(404).json({ error: 'Room not found'});
	}
	room.users.push(userId);
	return res.json({ success: true});
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});