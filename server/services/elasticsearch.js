// const client = require('../server').client;
const fs = require('fs');
const path = require('path');
const JSONStream = require( "JSONStream" );
const records = require('../data/seeds/others.json');

// client.cluster.health({},function(err,resp,status) {  
//   console.log("-- Client Health --",resp);
// });



// async function resetIndex () {
//   if (await client.indices.exists({ index })) {
//     await client.indices.delete({ index })
//   }

//   await client.indices.create({ index })
//   await insertMovieMapping()
// }

// async function insertMovieMapping () {
//   const schema = {
//     title: { type: 'keyword' },
//     author: { type: 'keyword' },
//     sypnosis: { type: 'text' }
//   }

//   return client.indices.insertMapping({ index, type, body: { properties: schema } })
// }

// async function readAndInsertMovies () {
//   try {
//     // Clear previous ES index
//     await client.resetIndex()

//     // Read books directory
//     let files = fs.readdirSync('./books').filter(file => file.slice(-4) === '.txt')
//     console.log(`Found ${files.length} Files`)

//     // Read each book file, and index each paragraph in elasticsearch
//     for (let file of files) {
//       console.log(`Reading File - ${file}`)
//       const filePath = path.join('./books', file)
//       const { title, author, paragraphs } = parseBookFile(filePath)
//       await insertBookData(title, author, paragraphs)
//     }
//   } catch (err) {
//     console.error(err)
//   }
// }

// readAndInsertBooks()

// client.indices.create({ 
//   index: 'hypertube'
// }, function(error, response, status) {
//   if (error) {
//       console.log(error);
//   } else {
//       console.log("created a new index", response);
//   }
// });

// const bulkIndex = function bulkIndex(index, type, data) {
//   let bulkBody = [];

//   data.forEach(item => {
//     bulkBody.push({
//       index: {
//         _index: index,
//         _type: type,
//         _id: item.id
//       }
//     });

//     bulkBody.push(item);
//   });

// client.bulk({body: bulkBody})
//   .then(response => {
//     let errorCount = 0;
//     response.items.forEach(item => {
//       if (item.index && item.index.error) {
//         console.log(++errorCount, item.index.error);
//       }
//     });
//     console.log(
//       `Successfully indexed ${data.length - errorCount}
//        out of ${data.length} items`
//     );
//   })
//   .catch(console.err);
// };

// async function indexData() {
//   const moviesRaw = await fs.readFileSync('../db/seeds/movies.json');
//   const movies = JSON.parse(moviesRaw);
//   console.log(`${movies.length} items parsed from movies file`);
//   bulkIndex('hypertube', 'movies', movies);
// };

// indexData();