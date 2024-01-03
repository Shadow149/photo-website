const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./.env" });

const port = process.env.DB_PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
 
dbo.connectToServer(() => {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  }, 
  function (err) {
    if (err) console.error(err);
  }
);



// nodemon server