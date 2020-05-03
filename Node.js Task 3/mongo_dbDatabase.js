var mongo = require('mongodb');
var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/ugohuche";

mongoClient.connect(url, function(err, db){
    if (err) throw err;
    console.log("Database created by ugohuche");
    db.close();
})