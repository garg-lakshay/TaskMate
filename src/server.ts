import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import connectDB from './config/db';


const app = express();

const PORT = process.env.PORT || 3000;

connectDB();


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);

});