const index = 'hypertube';
const type = 'movies';
const fs = require('fs');
const JSONStream = require("JSONStream");
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({  
  host: '192.168.99.100:9200',
  log: 'trace'
});

client.ping({
  requestTimeout: 30000,
}, function(err) {
  if (err) {
      console.error('Elasticsearch cluster is down!');
  } else {
      console.log('Everything is ok');
  }
});

// client.cluster.health({},function(err,resp,status) {  
//   console.log("-- Client Health --",resp);
// });

function readStream(callback) {
  let bulk = [];

  let stream = fs.createReadStream('./data/seeds/yify.json');
  let jsonStream = JSONStream.parse('*');
  stream.pipe(jsonStream);
  jsonStream.on('data', function(data) {
    bulk.push({index:{
        _index:'hypertube',
        _type:'movies'
      }
    })
    bulk.push(data);
  })
  jsonStream.on('end', function() {
    callback(bulk);
  })
}

// async function insertMovieMapping () {
//   const schema = {
//     title: { type: 'keyword' },
//     author: { type: 'keyword' },
//     location: { type: 'integer' },
//     text: { type: 'text' }
//   }

//   return client.indices.putMapping({ index, type, body: { properties: schema } })
// }

async function resetIndex() {
  if (await client.indices.exists({ index })) {
    await client.indices.delete({ index })
  }

  await client.indices.create({ index });
  // await insertMovieMapping()

  readStream(function(bulk) {
    client.bulk({body:bulk}, function(err, res) { 
      if(err) { 
          console.log("Failed Bulk operation") ;
      } else { 
          console.log("Successfully imported " + bulk.length + " movies"); 
      } 
    }); 
  });
}

resetIndex();

module.exports = client;