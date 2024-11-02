const express = require('express');
const { SendMessage } = require('./chatbot');

const app = express();
app.use(express.json());
const port = 3000;

app.post('/chatbot', async (req, res) => {
    let response = await SendMessage(req.body.message);
    res.type('json');
    res.send(JSON.stringify({response}));
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});