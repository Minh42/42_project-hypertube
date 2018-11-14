const torrentStream = require('torrent-stream');
const parseTorrent = require('parse-torrent');
const request = require('request')
const Comment = require('../models/comment.model');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const OS = require('opensubtitles-api');
const srt2vtt = require('srt-to-vtt');
const stringSimilarity = require('string-similarity');
const https = require('https');
const {torrentdl} = require('./dl');
const { fork } = require('child_process');

updateDb = (imdbid, updated) => {
    Download.findOneAndUpdate({imdbid: imdbid}, updated, {upsert:true}, function(err, doc){
        if (err) console.log("error");
        else console.log("succesfully updated");
    });
}

exports.comment = async (req, res) => {
    console.log("REQ", req.body)
    const toAddInDb = new Comment({imdbid: req.body.imdbid, username: req.body.username, message: req.body.message, date: Date.now()});
        toAddInDb.save(err => {
            if (err) {
                console.log("error not added in db", err)
                res.status(400).json({msg: "failed to add in db"})
            } else {
                console.log("added in db")
                res.status(200).json(toAddInDb)
            }
        })
}

exports.allComment = async (req, res) => {
    console.log("IMI", req.body.imdbid)
    Comment.find({imdbid: req.body.imdbid}, function(err, comments) {
        if (!err){ 
            console.log(comments);
            res.status(200).json(comments)
        } else {console.log(err);
            res.status(400).json("ERROR ")
        }
    });
    
    
}