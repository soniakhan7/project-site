const OpenAI = require("openai")
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config();

const {Configuration, OpenAIApi} = OpenAI

const token = process.env.CHAT_GPT_API_KEY;
const configuration = new Configuration({apiKey: token})
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
    const { prompt } = req.body;

    const completion = await openai.createCompletion ({
        model: 'text-davinci-003',
        max_tokens: 400, 
        temperature: 0, 
        prompt: prompt,

    });

    res.send(completion.data.choices[0].text);
});

const port = 8080
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})
