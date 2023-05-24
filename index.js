const express = require("express");
const port = 6000;
const app = express();
const db = require("./config/mongoose");
const jwt = require("./config/passport_jwt");

app.use(express.urlencoded());
app.use("/", require("./router/index"));

app.listen(port, (err) => {
  if (err) {
    console.log("err in starting server", port);
  }
  console.log("server is up ad running", port);
});
