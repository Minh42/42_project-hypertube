const client = require('../services/elasticsearch');

exports.getAllMovies = (req, res) => {
    client.search({  
        index: 'hypertube',
        type: 'movies',
        body: {
            from : 0, 
            size : 500,
            query: {
                match_all: {}
            }
        }
    }, function (error, response, status) {
        if (error) {
            res.sendStatus(500);
        } else {
            console.log(response.hits)
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
            size : 100,
            query: {
                match: { "title": req.body.input }
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