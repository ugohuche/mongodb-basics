const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";
const newMovie = {movie: "Underwater", year: "2020", rating: 6.5};

function update(title, newItem) {
  return new Promise(async function(resolve, reject) {
    const client = new MongoClient(url);
    try {
      await client.connect();
      const db = client.db("ugohuche")

      const updatedItem = await db.collection('myMovies')
        .findOneAndReplace({movie: title}, newItem, {returnOriginal:false});
      console.log('UPDATED ITEM');
      console.log(updatedItem.value);
      resolve(updatedItem.value);
      client.close();

    } catch (error) {
      reject (error)
    }
  });
}
 update("The Banker", newMovie);
