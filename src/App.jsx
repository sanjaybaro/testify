import React, { useEffect, useContext, useState } from 'react';
import { Container, Button, TextField, MenuItem, Box } from '@mui/material';
import NetworkPanel from './components/NetworkPanel';
import './App.css';
import { monitorNetworkRequests } from './utils/networkMonitor';
import { NetworkContext } from './context/NetworkContext';

const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

function App() {
    const { addRequest } = useContext(NetworkContext);
    const [url, setUrl] = useState('');
    const [method, setMethod] = useState('GET');

    useEffect(() => {
        monitorNetworkRequests((request, response) => {
            const responseBody = request.type === 'fetch' ? response.clone().json() : Promise.resolve(response.responseText);
            responseBody.then(data => {
                addRequest({
                    ...request,
                    response: data,
                    timing: response.headers ? response.headers.get('Date') : new Date().toISOString(),
                });
            });
        });
    }, [addRequest]);

    const makeRequest = async () => {
        if (method === 'GET' || method === 'DELETE') {
            await fetch(url, { method });
        } else {
            await fetch(url, { method, body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }), headers: { 'Content-Type': 'application/json' } });
        }
    };

    const makeXhrRequest = () => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('XHR Response:', xhr.responseText);
            }
        };
        xhr.send(method === 'GET' || method === 'DELETE' ? null : JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }));
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <TextField
                    label="URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    select
                    label="HTTP Method"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    variant="outlined"
                    fullWidth
                >
                    {httpMethods.map((method) => (
                        <MenuItem key={method} value={method}>
                            {method}
                        </MenuItem>
                    ))}
                </TextField>
                <Button variant="contained" color="primary" onClick={makeRequest}>
                    Make Fetch Request
                </Button>
                <Button variant="contained" color="secondary" onClick={makeXhrRequest}>
                    Make XHR Request
                </Button>
            </Box>
            <NetworkPanel />
        </Container>
    );
}

export default App;
