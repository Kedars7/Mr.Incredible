import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import redisClient from "../config/redisConfig.js";
import logger from "../utils/logger.js";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMENIE_API_KEY,
});


const generateRoast = async (req, res) => {
  try {
    const { username } = req.params;

    const cacheKey = `roast:${username}`;

    const cachedRoast = await redisClient.get(cacheKey);

    if(cachedRoast){
        logger.info({
            event: "cache_check",
            username: username,
            status: "hit"
        })
        return res.status(200).json({ roast: cachedRoast });
    }

    //fetch github data
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
    );
    const userData = response.data;

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    logger.info({
        event: "github_data_fetched",
        username: username,
    })

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

    logger.info({
        event: "cache_check",
        username: username,
        status: "miss"
    })

    await redisClient.set(cacheKey, roast.text,{
        EX: 600, // expire in 10 minutes
    }); 

    return res.status(200).json({ roast: roast.text });
  } catch (error) {
    logger.error({
      event: "generate_roast_error",
      message: "Error fetching data from GitHub API",
      error: error.message,
    });
    
    return res.status(500).json({ 
      error: "Failed to generate roast", 
      message: error.message 
    });
  }
};

export default generateRoast;
