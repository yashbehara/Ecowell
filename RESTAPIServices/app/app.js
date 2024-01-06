import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import registerRouter from "./routes/index.js";
import models from "./models/index.js";
import KEYS from "../config/mongodbkeys.js";

// Mongo DB connection and initialization
const initialize = async (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  registerRouter(app);

  await mongoose
    .connect(KEYS.MONGO_URL)
    .then(() => {
      console.log("Connected to the EcoWell database. ");
    })
    .catch((err) => {
      console.log("Error in connecting to the database." + err);
      process.exit(1);
    });
};
export default initialize;
