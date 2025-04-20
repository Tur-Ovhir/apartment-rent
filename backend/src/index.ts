import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/user.route";
import apartmentRouter from "./routes/apartment.route";
import Multer, { memoryStorage } from "multer";
import { v2 as cloudinary } from "cloudinary";

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

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = memoryStorage();

const upload = Multer({ storage });

async function handleUpload(file: string) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

app.post(
  "/upload",
  upload.array("images", 10),
  async (req: Request, res: Response): Promise<void> => {
    const files = req.files as Express.Multer.File[];

    if (!files || !Array.isArray(files)) {
      res.status(400).send("No files uploaded.");
      return;
    }

    try {
      const uploadResults = await Promise.all(
        files.map((file) => {
          const b64 = Buffer.from(file.buffer).toString("base64");
          const dataURI = `data:${file.mimetype};base64,${b64}`;
          return handleUpload(dataURI);
        })
      );

      res.json(uploadResults);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error uploading files to cloudinary.");
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
