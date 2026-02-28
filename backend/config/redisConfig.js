import { createClient } from "redis";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
dotenv.config();

const redisClient = await createClient({
  url: process.env.REDIS_URL,
})
  .on("error", (err) => logger.error({
    event: "redis_error",
    message: "Redis Client Error",
    error: err,
  }))
  .on("connect", () => logger.info({
    event: "redis_connect",
    message: "Connected to Redis successfully",
  }))
  .connect();


export default redisClient;
