// global imports
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// local imports
import connectDB from './config/db.js';
import taskRouter from './routes/taskRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());

app.use('/api/task', taskRouter);

app.listen(5000, () => {
  console.log(`Server Is Running On Port: ${port}`);
});

connectDB();
