'use strict';
const express = require("express");
const app = express();
const cors = require("cors");
const serverless = require('serverless-http');

require("dotenv").config({ path: "./.env" });

const port = process.env.DB_PORT || 5000;
app.use(cors());
app.use(express.json());
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});

app.use('/.netlify/functions/server', require("./routes/record"));

module.exports = app;
module.exports.handler = serverless(app);