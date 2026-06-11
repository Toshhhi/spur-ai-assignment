import express from "express";
import chatRoutes from './routes/chat.routes';
import dotenv from "dotenv";
import cors from "cors"; 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 
app.use("/chat", chatRoutes); 
app.get("/", (_, res) => {
    res.send("Backend running")
})

const PORT = 5001; 
app.listen(PORT, ()=>{
    console.log(`service running on ${PORT}`)
})
