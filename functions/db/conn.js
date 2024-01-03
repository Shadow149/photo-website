const { MongoClient, ServerApiVersion } = require("mongodb");
const client = new MongoClient(process.env.ATLAS_URI, {
  useUnifiedTopology: true, useNewUrlParser: true, maxIdleTimeMS : 270000, minPoolSize : 2, maxPoolSize : 4
});
client.on('serverHeartbeatFailed', (event) => {
  console.log(event);
});

const clientPromise = client.connect();
 
var _db;
 
module.exports = {
  connectToServer: async function (event) {
    try {
      _db = (await clientPromise).db(process.env.DB_NAME);
      console.log("Successfully connected to MongoDB."); 
    } catch (error) {
      console.log(error);
    }
  },
 
  getDb: function () {
    return _db;
  },
};