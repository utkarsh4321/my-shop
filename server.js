const express = require("express");
const server = express();
const port = 3000;
const product = require("./products/products");
const exhbs = require("express-handlebars");
const orders = require("./orders/orders");
const users = require("./user/users");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cookies = require("cookie-parser");

mongoose.connect(
  `mongodb+srv://utkarshdev:${
    process.env.Mongo_Atlas_cloud_pw
  }@cluster0-sef6w.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true
  }
);

server.listen(port);
const morgan = require("morgan");

server.use(morgan("dev"));

server.use("/uploads", express.static("uploads"));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cookies());

server.engine("handlebars", exhbs({ defaultLayout: "main" }));
server.set("view engine", "handlebars");
server.set("views", "views");
// const file = new serve.Server('./public');
// file.serve(req,res);

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

server.use(
  express.static(path.join(path.dirname(process.mainModule.filename), "public"))
);
server.use("/orders", orders);
server.use("/user", users);
server.use("/products", product);

server.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});
server.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message
  });
});
