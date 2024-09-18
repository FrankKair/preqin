import express from "express";
import cors from 'cors';
import { InvestorRouter } from "./routes";
import { AppDataSource } from "./DataSource";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", InvestorRouter);

const PORT = 5000;

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(error => console.log(error));
