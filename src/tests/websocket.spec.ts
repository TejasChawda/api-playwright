import { WebSocket } from "ws";
import { test , expect } from '@playwright/test';
import { connectToServer, sendMessageFromClient, receiveMessage } from '../api/websockets/websocket_client'
import * as dotenv from 'dotenv';

dotenv.config();

test.describe("Testing Websocket", () => {

    let socket: any;

    test.beforeAll(() => {
        socket = new WebSocket(process.env.WEBSOCKET_URL || '');
    });

    test("Message test", async () => {
        await connectToServer(socket);
        sendMessageFromClient(socket, "hi, this is Tejas");
        const response = await receiveMessage(socket);

        expect(response).toBe("hi, this is Tejas");
    });
});