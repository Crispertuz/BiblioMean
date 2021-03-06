import express from "express";
import cors from "cors";
import db from "./db/db.js";
import dotenv from "dotenv";
import books from "./router/books.js";
import client from "./router/client.js";
import supplier from "./router/supplier.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/books", books)
app.use("/api/client", client)
app.use("/api/supplier", supplier)

app.listen(process.env.PORT, () =>
  console.log("Backend server running on port" + process.env.PORT)
);
db.dbConnection();