const keys = require('../config/keys');
const fs = require('fs');
const axios = require('axios');

const throttledQueue = require('throttled-queue');
const throttle = throttledQueue(39, 10000);

function getAllMoviesFromEZTV(i) {
    axios.get('https://eztv.ag/api/get-torrents?page=' + i)
        .then((res) => {
            let k = 0;
            if (res.status === 200) {
                for (var j = 0; j < res.data.torrents.length; j++) {
                    let data = new Object();
                    let movie = res.data.torrents[j];
                    if (movie.torrents_url || movie.magnet_url && movie.imdb_id) {
                        throttle(function () {
                            axios.get('http://www.omdbapi.com/?i=tt' + movie.imdb_id + '&apikey=' + keys.OMDB_API_KEY)
                                .then((res) => {
                                    data['id'] = movie.id;
                                    data['title'] = res.data.Title;
                                    data['sypnosis'] = res.data.Plot;
                                    data['runtime'] = res.data.Runtime;
                                    data['year'] = res.data.Year;
                                    data['genres'] = res.data.Genre;
                                    data['type'] = res.data.Type;
                                    data['imdb_rating'] = res.data.imdbRating;
                                    data['imdb_id'] = 'tt' + movie.imdb_id;
                                    data['image'] = res.data.Poster;
                                    data['director'] = res.data.Director;  
                                    data['writer'] = res.data.Writer;  
                                    data['actors'] = res.data.Actors;
                                    let torrents = new Array();
                                    torrents.push({
                                        "url" : movie.torrent_url,
                                        "magnet" : movie.magnet_url,
                                        "hash" : movie.hash,
                                        "quality" : movie.filename,
                                        "seeds" : movie.seeds,
                                        "peers" : movie.peers,
                                        "size_bytes": movie.size_bytes
                                    })
                                    data['torrents'] = torrents;
                                    // console.log(data);
                                    fs.appendFileSync("movies.json", JSON.stringify(data), 'utf8');
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