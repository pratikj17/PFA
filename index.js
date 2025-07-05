import express from 'express';
import dotenv from 'dotenv';
import router from './auth/routes/auth.routes.js';
import connectDB from './connection.js';

dotenv.config();
connectDB();

const app= express();
const PORT= process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/auth', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});