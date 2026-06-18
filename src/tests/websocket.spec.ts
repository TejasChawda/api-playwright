import { WebSocket } from "ws";
import { test , expect } from '@playwright/test';


test.describe("Testing Websocket", () => {

    let socket: any;

    test.beforeAll(() => {
        socket = new WebSocket("ws://localhost:8080");
        
    });

    test("Message test", async () => {

        const response = await new Promise<string>((resolve, reject) => {

            socket.on("open", () => {
                console.log("Connection established");
                socket.send("hi, this is Tejas");
            });

            socket.on("message", (message: WebSocket.RawData) => {
                resolve(message.toString());
            });

            socket.on("error", reject);
        });

        expect(response).toBe("hi, this is Tejas");
    });
});