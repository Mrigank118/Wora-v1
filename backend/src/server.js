// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import contentRouter from './routes/content.routes.js';
import userRouter from './routes/user.routes.js';
import reminderRouter from './routes/reminder.routes.js';
import cors from 'cors';
import setUserMiddleware from './middlewares/user.middleware.js'; // Import auth middleware

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors());

// Setup authentication middleware
setUserMiddleware(app);

// Routes
app.use('/WORA/users', userRouter);
app.use('/WORA/contents', contentRouter);
app.use('/WORA/reminders', reminderRouter);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started at Port: ${PORT}`);
});
