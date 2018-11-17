const keys = require('../config/keys');
const fs = require('fs');
const axios = require('axios');

const throttledQueue = require('throttled-queue');
const throttle = throttledQueue(1, 1000);

async function getAllMoviesFromEZTV(i) {
    try {
        const res = await axios.get('https://eztv.ag/api/get-torrents?page=' + i);
        if (res.status === 200) {
            for (var j = 0; j < res.data.torrents.length; j++) {
                let data = new Object();
                let movie = res.data.torrents[j];
                if (movie.torrents_url || movie.magnet_url && movie.imdb_id) {
                    throttle(async function () {
                        try {
                            const res = await axios.get('http://www.omdbapi.com/?i=tt' + movie.imdb_id + '&apikey=' + keys.OMDB_API_KEY);
                            const res2 = await axios.get('https://api.themoviedb.org/3/find/tt' + movie.imdb_id + '?api_key=' + keys.TMDB_API_KEY + '&external_source=imdb_id');
                            data['id'] = movie.id;
                            data['title'] = res.data.Title;
                            data['sypnosis'] = res.data.Plot;
                            data['runtime'] = res.data.Runtime;
                            data['year'] = res.data.Year;
                            data['genres'] = res.data.Genre;
                            data['type'] = res.data.Type;
                            data['imdb_rating'] = res.data.imdbRating;
                            data['imdb_id'] = 'tt' + movie.imdb_id;
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
            getAllMoviesFromEZTV(i);
        } else {
            console.log('done');
        }
    } catch (err) { 
        console.log(err.response)
    }
}

var i = 1;

setInterval(function() { 
    getAllMoviesFromEZTV(i);
}, 10000);