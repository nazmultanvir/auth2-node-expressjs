const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const ProductRouters = require("./api/Routers/products");
const AuthRouters = require("./api/Routers/auth");
//
const app = express();

// Mongoose
const uri =
  "mongodb+srv://AuthAPi:" +
  process.env.MONGO_ATLAS_PW +
  "@cluster0-oyy5a.mongodb.net/test?retryWrites=true";
const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10,
  useNewUrlParser: true,
};
mongoose
  .connect(uri)
  .then(result => {
    console.log("--------------------done----------------");
  })
  .catch(err => {
    console.log("--------------------error----------------");
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/auth", AuthRouters);
app.use("/products", ProductRouters);

app.use((req, res, next) => {
  const error = new Error("Not Found !");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
