const keys = require('../config/keys');
const fs = require('fs');
const axios = require('axios');

function getDataFromIMDB(movie, imdb_id) {
    axios.get('http://www.omdbapi.com/?i=tt' + imdb_id + '&apikey=' + keys.OMDB_API_KEY)
        .then((res) => {
            movie['director'] = res.data.Director;  
            movie['writer'] = res.data.Writer;  
            movie['actors'] = res.data.Actors;
            movie['imdb_rating'] = res.data.imdbRating;
            fs.appendFileSync("eztv.json", JSON.stringify(movie), 'utf8');
        })
        .catch(error => {
            console.log(error.response)
        });
}

async function getAllMoviesFromEZTV(i) {
    axios.get('https://eztv.ag/api/get-torrents?page=' + i)
        .then((res) => {
            if (res.status === 200) {
                for (var j = 0; j < res.data.torrents.length; j++) {
                    let movie = res.data.torrents[j];
                    fs.appendFileSync("eztv.json", JSON.stringify(movie), 'utf8');
                    if (res.data.torrents[j].imdb_id) {
                        let imdb_id = res.data.torrents[j].imdb_id;
                        setInterval(function(){ getDataFromIMDB(movie, imdb_id) }, 10000);
                    }
                }
                i++;
                getAllMoviesFromEZTV(i);
            }
            else {
                console.log('done')
            }
        })
}

var i = 1;

getAllMoviesFromEZTV(i)