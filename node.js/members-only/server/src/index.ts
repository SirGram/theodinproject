/* eslint-disable */
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const passport = require('passport');

dotenv.config()
const port = process.env.PORT;

const app = express()
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

//mongoose
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB;


main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
