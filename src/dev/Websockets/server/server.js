import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

console.log("WebSocket server started on port 8080");

//Here this is an event of connection between client and server
wss.on("connection", (socket) => {
    console.log("Client connected");

    //After connection, this is an event where the server will get the message sent from the client
    socket.on("message", (message) => {
        console.log(`Received: ${message}`);

        // Send to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
                client.send(message.toString());
            }
        });
    });

    socket.on("close", () => {
        console.log("Client disconnected");
    });
});
