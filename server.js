const express = require('express');
const os = require('os');
const app = express();

app.use(express.json());
app.use(express.static('public')); // serves the page in the "public" folder

// Receives one message from a client
app.post('/send', (req, res) => {
  console.log('Message received:', req.body.message);
  res.json({ ok: true });
});







let closed = false;

// Pages ask this every second
app.get('/status', (req, res) => {
  res.json({ closed });
});

// You open these in YOUR browser to flip the switch
app.get('/close', (req, res) => {
  closed = true;
  res.send('Everyone has been closed.');
});

app.get('/open', (req, res) => {
  closed = false;
  res.send('Open again.');
});





// Listen on 0.0.0.0 so other devices on your WiFi can connect
app.listen(3000, '0.0.0.0', () => {
  console.log('Server running!');
  console.log('On this computer: http://localhost:3000');

  // Show your WiFi/local IP address
  const nets = os.networkInterfaces();
  for (const name in nets) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        console.log('Others on your WiFi: http://' + net.address + ':3000');
      }
    }
  }
});
