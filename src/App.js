import React, { useEffect, useState } from 'react';
import client from './socket';

function App() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    useEffect(() => {
        client.onConnect = () => {
            console.log('Connected to the server');
            client.subscribe('/topic/greetings', (message) => {
                setResponse(message.body);
            });
        };

        client.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        return () => {
            client.deactivate();
        };
    }, []);

    const sendMessage = () => {
        client.publish({
            destination: '/app/hello',
            body: message,
        });
    };

    return (
        <div className="App">
            <h1>WebSocket with JWT Authentication</h1>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send Message</button>
            <p>Response: {response}</p>
        </div>
    );
}

export default App;
