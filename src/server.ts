import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import connectDB from './config/db';
import cors from "cors";
import router1 from "./router/authrouter";
import router2 from "./router/taskrouter";
import errorHandler from "./middleware/errorhandler";


const app = express();

const PORT = process.env.PORT || 3001;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


app.use(express.json());

connectDB();


app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use("/api/auth", router1);
app.use("/api/todos", router2);

app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);

});