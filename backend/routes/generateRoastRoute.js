import express from "express";
import generateRoast from "../controller/generateRoast.js";
import limiter from "../middleware/rateLimiter.js";

const router = express.Router();


router.get("/troll/:username", limiter, generateRoast);

export default router;