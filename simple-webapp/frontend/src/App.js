import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleGreet = async () => {
    try {
      const response = await axios.post('http://localhost:5000/greet', { name });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Simple Web Application
      </Typography>
      <Typography variant="body1" gutterBottom>
        Enter your name and click the button to see a greeting!
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" gap={2} marginTop={2}>
        <TextField
          label="Enter your name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleGreet}>
          Greet Me
        </Button>
      </Box>
      {message && (
        <Typography variant="h6" color="green" style={{ marginTop: '20px' }}>
          {message}
        </Typography>
      )}
    </Container>
  );
}

export default App;