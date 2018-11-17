const torrentStream = require('torrent-stream');
const parseTorrent = require('parse-torrent');
const request = require('request')
const Download = require('../models/download.model');
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

exports.torrent = async (req, res) => {
    console.log("REQ", req.body)
    const inMongo = await Download.findOne({imdbid: req.body.imdbid, quality: req.body.quality});
    if (inMongo === null) {
        const process = fork(`./controllers/dl.js`)
        process.send({ msg: "START", req: {hostname: req.hostname, body: req.body} });

        process.on('message', (message) => {
            console.log("MSG", message.msg)
            console.log("MSG", message)
            switch (message.msg) {
                case "ADD_IN_MONGO":
                    const toAddInDb = new Download({...message.data, imdbid: req.body.imdbid, quality: req.body.quality});
                    toAddInDb.save(err => {
                        if (err) {
                            console.log("error not added in db", err)
                        } else {
                            console.log("added in db")
                        }
                    })
                break ;
                case "RESPONSE":
                    console.log("GOT RESPONSE")
                    res.status(200).json(message.data)
                break ;
                case "COMPLETED":
                    console.log("COMPLETETETETETETETETETETTETETTETTETETTETETTETETTETETTEETTETETTETETETTE")
                    process.kill(process.pid)
                break ;
                default:
                break ;
            }
            console.log(`${message.msg}`);
        });
    } else {
        updateDb(req.body.imdbid, {$set: {date_last_seen: Date.now()}})
        fs.stat(`${inMongo.folder_path}/out.m3u8`, function(err, stat) {
            if(err === null) {
                res.status(200).json({
                    message: "can start streaming",
                    stream_link: `http://${req.hostname}:8080${inMongo.folder_path.substring(1)}/out.m3u8`,
                    en: inMongo.en,
                    fr: inMongo.fr
                });
            } else {
                console.log('Some other error: ', err.code);
            }
        });
    }

    //torrentdl(req, res);
}

