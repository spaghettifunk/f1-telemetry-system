import app from './app';

// socket stuff
app.socket.on("connection", function (socket: any) {
    console.log("a user connected...");

    // send message to frontend
    socket.emit("hello", "hello from backend");

    // receive message from client
    socket.on("howdy", (arg: any) => {
        console.log(arg);
    });
});

// HTTP server
app.server.listen(8081, function () {
    console.log("listening on port 8081");
});

