const keys = require('../config/keys');
const axios = require('axios');
const fs = require('fs');

const throttledQueue = require('throttled-queue');
const throttle = throttledQueue(1, 1000);

async function getAllMoviesFromYIFY(i) {
    try {
        const res = await axios.get('https://yts.am/api/v2/list_movies.json?page=' + i);
        if (res.data.status === 'ok') {
            for (var j = 0; j < res.data.data.movies.length; j++) {
                let data = new Object();
                let movie = res.data.data.movies[j];
                if (movie.torrents && movie.imdb_code) {
                    throttle(async function() {
                        try {
                            const res = await axios.get('http://www.omdbapi.com/?i=' + movie.imdb_code + '&apikey=' + keys.OMDB_API_KEY);
                            const res2 = await axios.get('https://api.themoviedb.org/3/find/' + movie.imdb_code + '?api_key=' + keys.TMDB_API_KEY + '&external_source=imdb_id');
                            data['id'] = movie.id;
                            data['title'] = res.data.Title;
                            data['sypnosis'] = res.data.Plot;
                            data['runtime'] = res.data.Runtime;
                            data['year'] = res.data.Year;
                            data['genres'] = res.data.Genre;
                            data['type'] = res.data.Type;
                            data['imdb_rating'] = res.data.imdbRating;
                            data['imdb_id'] = movie.imdb_code;
                            data['director'] = res.data.Director;  
                            data['writer'] = res.data.Writer;  
                            data['actors'] = res.data.Actors;
                            data['torrents'] = movie.torrents;
                            if (res2.data.movie_results.length > 0) {
                                if (res2.data.movie_results[0].poster_path !== null) {
                                    data['image'] = 'https://image.tmdb.org/t/p/w780' + res2.data.movie_results[0].poster_path;
                                } else {
                                    data['image'] = 'N/A';
                                }
                            } else if (res2.data.tv_results.length > 0) {
                                if (res2.data.tv_results[0].poster_path !== null) {
                                    data['image'] = 'https://image.tmdb.org/t/p/w780' + res2.data.tv_results[0].poster_path;
                                } else {
                                    data['image'] = 'N/A';
                                }
                            }
                            console.log(data);
                            fs.appendFileSync("movies.json", JSON.stringify(data), 'utf8');
                        } catch (err) { 
                            console.log(err.response)
                        }  

                    })
                }
            }
            i++;
            getAllMoviesFromYIFY(i);   
        } else {
            console.log('done');
        }
    } catch (err) { 
        console.log(err.response)
    }   
}

var i = 1;

setInterval(function() { 
    getAllMoviesFromYIFY(i);
}, 10000);