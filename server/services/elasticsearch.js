const client = require('../server').client;

client.cluster.health({},function(err,resp,status) {  
  console.log("-- Client Health --",resp);
});

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