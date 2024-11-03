const express = require('express');
const { SendMessage } = require('./chatbot');
const webhook_url = 'c7c56dcb-e3b4-4f60-81a9-9c121cf7606d'

const app = express();
app.use(express.json());
const port = 3000;

app.post('/chatbot', async (req, res) => {
    const userMessage = req.body.message;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: userMessage }]
        })
    });

    const data = await response.json();
    res.json(data.choices[0].message.content);

});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});