
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const passport = require('passport');
import { connectToDB } from './config/db';
import { User } from './models/user.model';
import app from './app';

dotenv.config();
const port = process.env.PORT;

//mongoose
connectToDB();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
