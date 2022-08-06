const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require('http');

const { Server } = require('socket.io')

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json)


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // hosts allowed
        methods: ["GET", "POST"] // methods u would accept
    }
})

// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Database Connection Successful');
// }).catch((err) => {
//     console.log(err.message)
// });

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on('join_room', (data) => {
        console.log('room backend', data.roomNumber)
        socket.join(data.roomNumber)
    })

    socket.on("send_message", (data) => {
        console.log('data backend', data)
        socket.to(data.roomNumber).emit("receive_message", data)
    })

})

server .listen(process.env.PORT, () => {
    console.log(`Server running on Port ${process.env.PORT}`)
})



