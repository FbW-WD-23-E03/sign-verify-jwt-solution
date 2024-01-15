import dotenv from "dotenv";
import express from "express";
import userRouter from "./routes/user.js";

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());
app.use("/", userRouter);

app.listen(port, () => {
  console.log(`The server 🙈 is listening on port ${port}`);
});
