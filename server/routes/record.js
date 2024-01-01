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

recordRoutes.route("/last_documents/:num").get(function (req, res) {
  let db_connect = dbo.getDb("photos_db");
  let num = req.params.num;
  db_connect
    .collection("photos")
    .find({}).sort({_id:-1}).limit(parseInt(num))
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/record/title/:title").get(function (req, res) {
  let db_connect = dbo.getDb("photos_db");
  let ptitle = req.params.title;
  db_connect
    .collection("photos")
    .find({title: { $regex: new RegExp('^.*'+ptitle+'.*','i') } })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/record/animal/:animal").get(function (req, res) {
  let db_connect = dbo.getDb("photos_db");
  let panimal = req.params.animal;
  db_connect
    .collection("photos")
    .find( { animal: { $regex: new RegExp('^.*'+panimal+'.*','i') } } )
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
    animal: req.body.animal,
    desc: req.body.desc,
    elevation: req.body.elevation,
    distance: req.body.distance,
    location: req.body.location,
    metaData: req.body.metaData
  };
  db_connect.collection("photos").insertOne(myobj, function (err, response) {
    if (err) throw err;
    res.send(response);
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