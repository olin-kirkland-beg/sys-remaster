import dotenv from 'dotenv';
import WebSocket, { WebSocketServer } from 'ws';

export type WebsocketMessage = {
    type: 'state-change'; // Type of the message
    data: any; // The data to be sent to the client
};

// Define the WebSocket server address and port
dotenv.config();
const PORT = process.env.WEBSOCKET_PORT || 3002;

export default class WebsocketBroadcaster {
    private static instance: WebsocketBroadcaster | null = null;
    private wss: WebSocketServer | null = null;

    private constructor() {}

    static getInstance(): WebsocketBroadcaster {
        if (!WebsocketBroadcaster.instance) WebsocketBroadcaster.instance = new WebsocketBroadcaster();
        return WebsocketBroadcaster.instance;
    }

    start() {
        if (this.wss) return console.error('WebSocket server already started');

        // Create a WebSocket server that listens on the specified port
        this.wss = new WebSocketServer({ port: Number(PORT) });
        console.log(`WebSocket server listening on ws://localhost:${PORT}`);

        // Handle incoming connections
        this.wss.on('connection', (ws: WebSocket) => {
            console.log('Client connected');

            // Don't expect any messages from the client
            // The server will only send messages to the client
            ws.on('message', (message: WebSocket.RawData) => {
                // Echo the message back to the client
                ws.send(`Server received: ${message}`);
            });

            ws.on('close', () => {
                console.log('Client disconnected');
            });

            ws.on('error', (err: Error) => {
                console.error('WebSocket error:', err);
            });
        });
    }

    send(message: WebsocketMessage) {
        if (!this.wss) throw new Error('WebSocket server not started');
        // Broadcast to all connected clients
        this.wss.clients.forEach((client: WebSocket) => {
            if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(message));
        });
    }
}
