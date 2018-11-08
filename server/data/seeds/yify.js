const keys = require('../config/keys');
const axios = require('axios');
const fs = require('fs');

function getAllMoviesFromYIFY(i) {
    axios.get('https://yts.am/api/v2/list_movies.json?page=' + i)
        .then((res) => {
            if (res.data.status === "ok") {
                for (var j = 0; j < res.data.data.movies.length; j++) {
                    let movies = res.data.data.movies[j];
                    if (res.data.data.movies[j].imdb_code) {
                        setInterval(function () {
                            axios.get('http://www.omdbapi.com/?i=' + res.data.data.movies[j].imdb_code + '&apikey=' + keys.OMDB_API_KEY)
                                .then((res) => {
                                    console.log(res.data)
                                    movies['director'] = res.data.Director;  
                                    movies['writer'] = res.data.Writer;  
                                    movies['actors'] = res.data.Actors;
                                    movies['imdb_rating'] = res.data.imdbRating;
                                    fs.appendFileSync("movies.json", JSON.stringify(movies), 'utf8');
                                })
                                .catch(error => {
                                    console.log(error.response)
                                });
                        }, 10000);
                    }
                }
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