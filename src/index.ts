import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import connection from "../utils/connection";
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
