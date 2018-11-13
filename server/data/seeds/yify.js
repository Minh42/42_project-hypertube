const keys = require('../config/keys');
const axios = require('axios');
const fs = require('fs');

const throttledQueue = require('throttled-queue');
const throttle = throttledQueue(39, 10000);

function getAllMoviesFromYIFY(i) {
    axios.get('https://yts.am/api/v2/list_movies.json?page=' + i)
        .then((res) => {
            if (res.data.status === "ok") {
                for (var j = 0; j < res.data.data.movies.length; j++) {
                    let movie = res.data.data.movies[j];
                    if (res.data.data.movies[j].imdb_code) {
                        movie['imdb'] = res.data.data.movies[j].imdb_code;
                        let imdb_code = res.data.data.movies[j].imdb_code;
                        throttle(function() {
                            axios.get('http://www.omdbapi.com/?i=' + imdb_code + '&apikey=' + keys.OMDB_API_KEY)
                                .then((res) => {
                                    movie['imdb_rating'] = res.data.imdbRating;
                                    movie['director'] = res.data.Director;  
                                    movie['writer'] = res.data.Writer;  
                                    movie['actors'] = res.data.Actors;
                                    console.log(movie)
                                    fs.appendFileSync("movies.json", JSON.stringify(movie), 'utf8');
                                })
                                .catch(error => {
                                    console.log(error.response)
                                });
                        });
                    }
                }
                i++;
                getAllMoviesFromYIFY(i);
            }
            else {
                console.log('done')
            }
        })
        .catch(error => {
            console.log(error.response)
        });
}

var i = 1;

setInterval(function() { 
    getAllMoviesFromYIFY(i);
}, 10000);