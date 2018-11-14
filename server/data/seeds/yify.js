const keys = require('../config/keys');
const axios = require('axios');
const fs = require('fs');

const throttledQueue = require('throttled-queue');
const throttle = throttledQueue(1, 1000);

function getAllMoviesFromYIFY(i) {
    axios.get('https://yts.am/api/v2/list_movies.json?page=' + i)
        .then((res) => {
            if (res.data.status === "ok") {
                for (var j = 0; j < res.data.data.movies.length; j++) {
                    let data = new Object();
                    let movie = res.data.data.movies[j];
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
                                    data['type'] = res.data.Type;
                                    data['imdb_rating'] = res.data.imdbRating;
                                    data['imdb_id'] = movie.imdb_code;

                                    // throttle(function () {
                                    // axios.get('https://api.themoviedb.org/3/find/' + movie.imdb_code + '?api_key=' + keys.TMDB_API_KEY + '&external_source=imdb_id')
                                    //     .then((res) => { 
                                    //         if (res.data.movie_results.length > 0) {
                                    //             if (res.data.movie_results[0].poster_path !== null) {
                                    //                 data['image'] = 'https://image.tmdb.org/t/p/w780' + res.data.movie_results[0].poster_path;
                                    //             } else {
                                    //                 data['image'] = 'N/A';
                                    //             }
                                    //         } else if (res.data.tv_results.length > 0) {
                                    //             if (res.data.tv_results[0].poster_path !== null) {
                                    //                 data['image'] = 'https://image.tmdb.org/t/p/w780' + res.data.tv_results[0].poster_path;
                                    //             } else {
                                    //                 data['image'] = 'N/A';
                                    //             }
                                    //         }
                                    //     })
                                    // })
                                    data['image'] = res.data.Poster;
                                    data['director'] = res.data.Director;  
                                    data['writer'] = res.data.Writer;  
                                    data['actors'] = res.data.Actors;
                                    data['torrents'] = movie.torrents;
                                    // console.log(data)
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