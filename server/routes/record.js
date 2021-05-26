const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

//This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("photos_db");
  db_connect
    .collection("photos")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, res) {
  let db_connect = dbo.getDb("photos_db");
  let myobj = {
    title: req.body.title,
    accentColour: req.body.accentColour,
    url: req.body.url,
  };
  db_connect.collection("photos").insertOne(myobj, function (err, res) {
    if (err) throw err;
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, res) {
  let db_connect = dbo.getDb("photos_db");
  let myquery = { id: req.body.id };
  let newvalues = {
    $set: {
      title: req.body.title,
      accentColour: req.body.accentColour,
      url: req.body.url,
    },
  };
  db_connect
    .collection("photos")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, res) => {
  let db_connect = dbo.getDb("photos_db");
  var myquery = { id: req.body.id };
  db_connect.collection("photos").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
  });
});

module.exports = recordRoutes;