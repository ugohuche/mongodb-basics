const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";


const movieDocument =  [ {movie: "The Banker", year: "2020", rating: 8},
 {movie: "Bad Boys", year: "2020", rating: 7},
 {movie: "The Hunt", year: "2020", rating: 7},
  {movie: "Bloodshot", year: "2020", rating: 7.5},
  {movie: "First Cow", year: "2020", rating: 6.5} ];


 function find(query, limit){
  return new Promise(async function(resolve, reject) {
    const client = new MongoClient(url);
    try {
      await client.connect();
      const db = client.db('ugohuche')

      let items = await db.collection('myMovies').find(query)
      if (limit > 0) {
        items = items.limit(limit);
      }
      resolve(await items.toArray());
      client.close();

    } catch (error){
      reject(error);
    }
  });
}


function findSpecific(query, projection, limit){
 return new Promise(async function(resolve, reject) {
   const client = new MongoClient(url);
   try {
     await client.connect();
     const db = client.db('ugohuche')

     let items = await db.collection('myMovies').find(query).project(projection)
     if (limit > 0) {
       items = items.limit(limit);
     }
     resolve(await items.toArray());
     client.close();

   } catch (error){
     reject(error);
   }
 });
}


async function main() {
  try{
    const firstDocument = await find({}, 1);
    console.log("THE FIRST DOCUMENT");
    console.log(firstDocument);

    const rating = await find({rating: 7});
    console.log("DOCUMENTS WITH RATING OF 7");
    console.log(rating);

    const movieTitles = await findSpecific({year:'2020'}, {_id:0, movie:1});
    console.log('MOVIE TITLES');
    console.log(movieTitles);

  } catch(error) {
    console.log(error);
  }
}

main();
