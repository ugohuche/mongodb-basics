const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";
const assert = require("assert");


const movieDocument =  [ {movie: "The Banker", year: "2020", rating: 8},
 {movie: "Bad Boys", year: "2020", rating: 7},
 {movie: "The Hunt", year: "2020", rating: 7},
  {movie: "Bloodshot", year: "2020", rating: 7.5},
  {movie: "First Cow", year: "2020", rating: 6.5} ];

MongoClient.connect(url, function(err, client){
    if (err) {
      throw err;
    }
    const newDatabase = client.db("ugohuche");
    newDatabase.createCollection("myMovies", function(err, res){
        if (err) {
          throw err;
        }
        newDatabase.collection("myMovies").insertMany(movieDocument, function(err, res) {
          if (err) {
            throw err;
          }
          assert.deepEqual(movieDocument, res.ops);
          console.log("Movie Document successfully inserted.");
          console.log(res.ops);
          client.close();
        })

    });
});
