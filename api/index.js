import express from "express";
import connectDB from "./MongoDb/connection.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"
import postRoutes from "./routes/post.routes.js"
import path from 'path';
import { fileURLToPath } from 'url';




dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'))



const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(process.env.PORT, ()=>{
      console.log(`Server is running on http://localhost:${process.env.PORT}`)
  })
  } catch (err) {
    console.log("Error while connecting to the database" + err);
  }
};

startServer();

app.use("/api/auth", authRoutes)

app.use("/", postRoutes)


export default app

