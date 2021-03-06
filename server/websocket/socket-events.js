const verifyToken = require('../utils/verifyToken');
const messageController = require('../controllers/messages');

module.exports = function (io) {
    io.use((socket, next) => {
        verifyToken(socket, next);
    });

    io.on("connection", (socket) => {
        
        const rooms = socket.handshake.query['rooms'].split(',')
        socket.join(rooms);

        console.log(socket.uid + ' connected');

        socket.on('updateRooms', (data) => {
            socket.leaveAll();
            socket.join(data);
            socket.emit('rooms updated', data);
        });

        socket.on("messageGroup", (data) => {
            messageController.saveMessage(data).then((msg) => {
                io.to(data.room).emit('group message', {room: data.room, message: msg})
            }).catch((err) => {
                console.log(err);
            });
        });
        
        socket.on("disconnect", () => {
            console.log("disconnected user ", socket.uid)
        });
    });
    io.on("error", (err) => {
        console.log('Connection Failed: ', err);
    });
};
