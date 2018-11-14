const keys = require('../config/keys');
const axios = require('axios');
const fs = require('fs');

function getDataFromIMDB(movie, imdb_id) {
    axios.get('http://www.omdbapi.com/?i=' + res.data.data.movies[j].imdb_code + '&apikey=' + keys.OMDB_API_KEY)
        .then((res) => {
            movie['director'] = res.data.Director;  
            movie['writer'] = res.data.Writer;  
            movie['actors'] = res.data.Actors;
            movie['imdb_rating'] = res.data.imdbRating;
            fs.appendFileSync("movies.json", JSON.stringify(movie), 'utf8');
        })
        .catch(error => {
            console.log(error.response)
        });
}

function getAllMoviesFromYIFY(i) {
    axios.get('https://yts.am/api/v2/list_movies.json?page=' + i)
        .then((res) => {
            if (res.data.status === "ok") {
                for (var j = 0; j < res.data.data.movies.length; j++) {
                    let movie = res.data.data.movies[j];
                    if (res.data.data.movies[j].imdb_code) {
                        setInterval(function(){ getDataFromIMDB(movie, imdb_id) }, 10000);
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