const mongoose = require('mongoose');
const keys = require('../configdb/keys');
const mongoURI = keys.mongoURI;
const Movies = require('../../models/movies.model');
const async = require('async');
const axios = require('axios');
const fs = require('fs');

function getAllMoviesFromYIFY(i) {
    axios.get('https://yts.am/api/v2/list_movies.json?page=' + i)
        .then((res) => {
            console.log(res.data.status, i)
            if (res.data.status === "ok") {
                fs.appendFileSync("movies.json", JSON.stringify(res.data.data.movies), 'utf8');
                i++;
                getAllMoviesFromYIFY(i);
            }
            else {
                console.log('done')
            }
        })
}

var i = 1;

getAllMoviesFromYIFY(i);

// async.series([
//     function(callback) {
//         mongoose.connect(mongoURI, {useCreateIndex: true, useNewUrlParser: true}, function(err, db) {
//         if(err) throw err;
//         db.dropDatabase(function(err, result) {
//           db.close(true, function(err, result) {
//             callback(null, 'Database dropped');
//           });
//         });
//       });
//     },
//     function(callback) {
//         mongoose.connect(mongoURI, {useCreateIndex: true, useNewUrlParser: true});
//         mongoose.connection.on('connected', function () {
//             callback(null, 'Connected to mongodb');
//         }); 
//     },
//     function(callback) {
//         var movies = [];
//         var max = 20;
//         for (i = 0; i < max; i++) {
//             var movie = new Movies({
//                 name: i
//             });
//             movies.push(movie);
//         }
//         async.eachSeries(
//             movies, 
//             function(movie, movieSavedCallBack) {
//                 movie.save(function(err) {
//                     if(err) console.log(err);
//                     movieSavedCallBack();
//                 });
//             },
//             function(err){
//                 if (err) console.log(err);
//                 callback(null, 'Seed database');
//             }
//         );
//     }
// ],
// function(err, results){
//     if(err) {
//       console.log(err)
//     } else {
//       console.log(results);
//     }
//     process.exit(0);
// });