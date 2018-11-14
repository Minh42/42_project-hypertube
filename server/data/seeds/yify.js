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
                    let data = new Object();
                    let movie = res.data.data.movies[j];
                    console.log(movie)
                    if (movie.torrents && movie.imdb_code) {
                        throttle(function() {
                            axios.get('http://www.omdbapi.com/?i=' + movie.imdb_code + '&apikey=' + keys.OMDB_API_KEY)
                                .then((res) => {
                                    data['id'] = movie.id;
                                    data['title'] = res.data.Title;
                                    data['sypnosis'] = res.data.Plot;
                                    data['runtime'] = res.data.Runtime;
                                    data['year'] = res.data.Year;
                                    data['genres'] = res.data.Genre;
                                    data['imdb_rating'] = res.data.imdbRating;
                                    data['imdb_id'] = movie.imdb_code;
                                    data['image'] = res.data.Poster;
                                    data['director'] = res.data.Director;  
                                    data['writer'] = res.data.Writer;  
                                    data['actors'] = res.data.Actors;
                                    data['torrents'] = movie.torrents;
                                    fs.appendFileSync("movies.json", JSON.stringify(data), 'utf8');
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