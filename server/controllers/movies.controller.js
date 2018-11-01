const client = require('../server').client;

exports.getAllMovies = (req, res) => {
    client.search({index:'hypertube', type:'movies'})
        .then(results => {
            console.log(results)
            // res.send(results.hits.hits);
        })
        .catch(err => {
            console.log(err)
            // res.send([]);
        });
}