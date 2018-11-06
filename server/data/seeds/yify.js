const mongoose = require('mongoose');
const keys = require('../configdb/keys');
const mongoURI = keys.mongoURI;
const Movies = require('../../models/movies.model');
const async = require('async');
const axios = require('axios');
const fs = require('fs');

function getAllMoviesFromYIFY(i) {
    axios.get('https://yts.am/api/v2/list_movies.json?page=' + i)
        .then((res) => {
            console.log(res.data.status, i)
            if (res.data.status === "ok") {
                fs.appendFileSync("movies.json", JSON.stringify(res.data.data.movies), 'utf8');
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