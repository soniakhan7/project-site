const OpenAI = require("openai")
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { SecretManagerServiceClient} = require('@google-cloud/secret-manager')
require('dotenv').config();

const {Configuration, OpenAIApi} = OpenAI

const app = express();
app.use(bodyParser.json());
app.use(cors());

async function useApi() {
    try {
        const client = new SecretManagerServiceClient();
        const [version] = await client.accessSecretVersion({
            name: "projects/857505229555/secrets/chat_gpt_api_key/versions/latest",
        });
        const apiKey = version.payload.data.toString();
        return apiKey
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function initOpenAI() {
    const apiKey = await useApi();
    const configuration = new Configuration({apiKey: apiKey})
    const openai = new OpenAIApi(configuration);

    app.post("/api/post-prompt", async (req, res) => {
        const { prompt } = req.body;

        const completion = await openai.createCompletion ({
            model: 'text-davinci-003',
            max_tokens: 400, 
            temperature: 0, 
            prompt: prompt,

        });

        res.send(completion.data.choices[0].text);
    });

    return { openai };
}

app.get('/api/hello', async(req, res) => {
    res.send("hello from express server");
});

const server = app.listen(process.env.PORT || 8080, async () =>{
    const { openai } = await initOpenAI();
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server is listening on port ${port} & ${host}`)
});
