import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redisClient from "../config/redisConfig.js";

const limiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args), 
    }),
    windowMs: 60 * 1000, // 1 minute
    max: 10,
    message: "Too many roasts. Calm down 🔥"
})

export default limiter;