const MovieSeen = require('../models/movieSeen.model');

exports.addSeen = async (req, res) => {
    MovieSeen.find({userID: req.user._id, imdbid: req.body.imdbid}, function(err, movie) {
        if (!err){ 
            if (movie.length > 0) {
                res.status(200).json("already seen")
                return ;
            }
            const toAddInDb = new MovieSeen({userID: req.user._id ,imdbid: req.body.imdbid, date: Date.now()});
            toAddInDb.save(err => {
            if (err) {
                console.log("error not added in db", err)
                res.status(400).json({msg: "failed to add in db"})
            } else {
                console.log("added in db")
                res.status(200).json(toAddInDb)
            }
        })
        } else {console.log(err);
            res.status(400).json("ERROR ")
        }
    });
    
}

exports.getSeen = async (req, res) => {
    console.log("GET ALL MOVIE SEEN")
    MovieSeen.find({userID: req.user._id}, function(err, movies) {
        if (!err){ 
            console.log(movies);
            res.status(200).json(movies)
        } else {console.log(err);
            res.status(400).json("ERROR ")
        }
    });
}