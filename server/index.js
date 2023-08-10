const app = require('express')()
const server = require('http').createServer(app)
const cors = require('cors')

const io = require("socket.io")(server, {
	cors: true
});

app.use(cors());

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
	res.send('Server is running');
});

let connectedUsers = {};

io.on("connection", (socket) => {
	socket.on('joinRoom', ({ room: roomId, data }) => {
		connectedUsers[socket.id] = data?.uid;
		console.log(connectedUsers)
		console.log(data)
		socket.emit('me', { id: socket.id, connectedUsers });

		socket.join(roomId);
		socket.to(roomId).emit('userConnected', { id: socket.id, uid: data?.uid, connectedUsers });

		socket.on('disconnect', () => {
			delete connectedUsers[socket.id];
			socket.to(roomId).emit('userDisconnected', { id: socket.id, connectedUsers });
			socket.broadcast.emit("callEnded");

		});
	});

	console.log("me " + socket.id);

	socket.on("calluser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("calluser", { signal: signalData, from, name });
	});

	socket.on("answercall", (data) => {
		io.to(data.to).emit("callaccepted", data.signal)
	});
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

