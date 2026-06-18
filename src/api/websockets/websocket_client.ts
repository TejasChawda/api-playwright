import { resolve } from "node:dns";
import { WebSocket } from "ws"

export function connectToServer(socket: any) {
    return new Promise<number>((resolve, reject) => {

        socket.on("open", () => {
            console.log("Connection Established");
            console.log("state: - > "+socket.readyState);
            resolve(socket.readyState);
        });

        socket.on("error", reject);

    });
}

export function sendMessageFromClient(socket: any, message: string){
    socket.send(message);
}

export function receiveMessage(socket: any): Promise<String>{
    return new Promise((resolve, reject) => {

        socket.on("message", (message: WebSocket.RawData) => {
            resolve(message.toString());
        });

        socket.on("error", reject);

    });
}