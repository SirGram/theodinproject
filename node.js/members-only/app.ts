/* eslint-disable */
const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv');

//mongoose
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
