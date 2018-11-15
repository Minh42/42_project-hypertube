const client = require('../services/elasticsearch');

exports.getAllMovies = (req, res) => {
    client.search({  
        index: 'hypertube',
        type: 'movies',
        body: {
            from : 0, 
            size : 100,
            query: {
                match_all: {}
            }
        }
    }, function (error, response, status) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            console.log(response.hits.hits)
            res.json({movies: response.hits.hits})
        }
    })
}

exports.getMovies = (req, res) => {
    client.search({  
        index: 'hypertube',
        type: 'movies',
        body: {
            from : 0, 
            size : 10000,
            query: {
                match: { "title": req.body.input }
            },
            collapse : {
                field : "imdb_id"
            }
        }
    }, function (error, response, status) {
        if (error) {
            res.sendStatus(500);
        } else {
            res.json({movies: response.hits.hits})
        }
    })
}