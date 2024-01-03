const { MongoClient, ServerApiVersion } = require("mongodb");

console.log(process.env.ATLAS_URI)
const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    useUnifiedTopology: true,    
  }
});
 
var _db;
 
module.exports = {
  connectToServer: function (listener, callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("photos_db");
        console.log("Successfully connected to MongoDB."); 
        listener();
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};