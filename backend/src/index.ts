import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/user.route";
import apartmentRouter from "./routes/apartment.route";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/auth", userRouter);
app.use("/apartment", apartmentRouter);

app.get("/", (_req, res) => {
  res.send("Hello, TypeScript Node Express!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
