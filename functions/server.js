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
const result = await dbo.connectToServer();
console.log(`Server is running on port: ${port}`);
console.log(result)

app.use('/.netlify/functions/server', require("./routes/record"));

module.exports = app;
module.exports.handler = serverless(app);