import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const app = express();

env.config();

app.use(cors());
app.use(bodyParser.json());

//Configure open ai
const configuration = new Configuration({
  organization: "org-iIjTW9wBh8b65WY7u5VUMA3z",
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

//listening
app.listen("8000", () => console.log("Listening on port 8000"));

//dummy route to test
app.get("/", (req, res) => {
  res.send("Hello world!");
});

//psot route for making requests
app.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0.5,
    });

    res.json({ message: response.data.choices[0].text });
    
  } catch (err) {
    console.log(err);
    res.send(err).status(400);
  }
});
