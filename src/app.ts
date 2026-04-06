import express, { Request, Response } from "express";
import cors from "cors";
import { errorHandling } from "@/middlewares/errorHandling";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.send({ status: "ok" });
});

app.use(errorHandling);

export { app };
