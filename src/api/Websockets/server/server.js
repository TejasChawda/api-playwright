import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

console.log("WebSocket server started on port 8080");

wss.on("connection", (socket) => {
    console.log("Client connected");

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
