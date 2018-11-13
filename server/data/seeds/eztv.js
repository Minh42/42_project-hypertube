const keys = require('../config/keys');
const fs = require('fs');
const axios = require('axios');

const throttledQueue = require('throttled-queue');
const throttle = throttledQueue(39, 20000);

function getAllMoviesFromEZTV(i) {
    axios.get('https://eztv.ag/api/get-torrents?page=' + i)
        .then((res) => {
            if (res.status === 200) {
                for (var j = 0; j < res.data.torrents.length; j++) {
                    let movie = res.data.torrents[j];
                    if (res.data.torrents[j].imdb_id) {
                        movie['imdb'] = 'tt' + res.data.torrents[j].imdb_id
                        let imdb_id = res.data.torrents[j].imdb_id;
                        throttle(function () {
                            axios.get('http://www.omdbapi.com/?i=tt' + imdb_id + '&apikey=' + keys.OMDB_API_KEY)
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
                getAllMoviesFromEZTV(i);
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
    getAllMoviesFromEZTV(i);
}, 10000);