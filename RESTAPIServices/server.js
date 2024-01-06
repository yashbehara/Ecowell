import express from "express";
import initialize from "./app/app.js";
const app = express();
const PORT = process.env.PORT || 5000;
initialize(app);

app.listen(PORT, process.env.IP, () =>
  console.log(`Server listening at port ${PORT}`)
);
