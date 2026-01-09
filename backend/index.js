import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMENIE_API_KEY,
});

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "https://mr-incredible.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello form backend!!");
  console.log("Request received at /");
});

app.get("/troll/:username", async (req, res) => {
  try {
    const { username } = req.params;

    //fetch github data
    const response = await axios.get(`https://api.github.com/users/${username}`);
    const userData = response.data;

    if(!userData){
        return res.status(404).json({ error: "User not found" });
    }

    //roast the user
     const prompt = `Roast a GitHub user named ${
      userData.name || username
    } in the most savage and funny way you can. They’ve got ${
      userData.public_repos
    } repos, ${userData.followers} followers, ${
      userData.following
    } following. Their bio says "${
      userData.bio || "They have No Bio"
    }". Oh, and their account was created on ${
      userData.created_at
    }. Make it brutally honest, sarcastic, and hilarious! also use simple english words. keep it 3-5 lines. Use emojis`;


    const roast = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return res.status(200).json({ roast: roast.text });


  } catch (error) {
    console.error("Error fetching data from GitHub API:", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
