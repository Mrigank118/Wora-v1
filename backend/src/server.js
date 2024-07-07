import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/content.routes.js";
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors());

// Routes
app.use("/WORA/", router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started at Port: ${PORT}`);
});
