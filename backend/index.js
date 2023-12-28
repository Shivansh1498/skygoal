import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
connectDb();

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to skygoal project server");
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
