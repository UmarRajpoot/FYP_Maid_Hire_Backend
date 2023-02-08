import dotenv from "dotenv";
dotenv.config();
import express from "express";
import createHttpError from "http-errors";
import ModelRunner from "./Config/ModelRunner.js";
import sys from "os";
import AuthRoute from "./Routes/Auths.js";
import MaidProfile from "./Routes/MaidProfile.js";
import AuthProfile from "./Routes/AuthProfile.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  return res.send({
    Status: 200,
    Messages: "Success",
    os: sys.arch(),
  });
});

app.use("/api", AuthRoute);
app.use("/api", AuthProfile);
app.use("/api", MaidProfile);

app.get("/api/", (req, res) => {
  return res.send({
    Status: 200,
    Messages: "Success again",
    os: sys.arch(),
  });
});

app.use(async (req, res, next) => {
  next(createHttpError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      success: err.success,
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`App is LIstenting on Port ${PORT}`);
});
