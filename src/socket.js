import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const token = 'valid-token';

const client = new Client({
    webSocketFactory: () => new SockJS('http://localhost:8082/ws'),
    debug: (str) => {
        console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
});

client.configure({
    beforeConnect: () => {
        console.log('Before connecting, adding Authorization header');
        // Add token to the headers before connecting
        client.connectHeaders = {
            Authorization: `Bearer ${token}`,
        };
        console.log('Connect headers:', client.connectHeaders);
    },
});

client.activate();

export default client;




