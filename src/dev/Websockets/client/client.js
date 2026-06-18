import WebSocket from "ws";
import readline from "readline";

const socket = new WebSocket("ws://localhost:8080");

// setup terminal input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

socket.on("open", () => {
    console.log("Connected to server");

    rl.on("line", (input) => {
        socket.send(input);
    });
});

socket.on("message", (msg) => {
    console.log("Server:", msg.toString());
});
