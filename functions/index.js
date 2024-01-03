const express = require("express");
const app = express();
const cors = require("cors");
const serverless = require('serverless-http');

require("dotenv").config({ path: "./.env" });

const port = process.env.DB_PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
dbo.connectToServer(function (err) {
  if (err) console.error(err);
});
console.log(`Server is running on port: ${port}`);

app.use('/.netlify/functions/server', router);


// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
//   });
//   console.log(`Server is running on port: ${port}`);
// });

// nodemon server

module.exports = app;
module.exports.handler = serverless(app);