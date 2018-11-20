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

let langs = null;
let host = null;

updateDb = (imdbid, quality, updated) => {
    console.log('On Update la db, query:', updated, imdbid, quality);
    Download.findOneAndUpdate({ imdbid: imdbid, quality:quality }, updated, { upsert:true }, function(err, doc) {
        if (err) 
            console.log("error: ", err);
        else 
            console.log("succesfully updated : ", imdbid, quality);
    });
}

addInMongo = (data, imdbid, quality, ) => {
    const toAddInDb = new Download({...data, imdbid: imdbid, quality: quality});
    toAddInDb.save(err => {
        if (err) {
            console.log("error not added in db", err)
        } else {
            console.log("added in db : ", imdbid, quality);
        }
    });
}

sendResponseToFront = (res, imdbid, quality, message, langs) => {
    console.log("GOT RESPONSE");
    updateDb(imdbid, quality, {$set:message.data});
    const resp = {
        stream_link: `http://${host}:8080${message.data.stream_link.substring(1)}`, 
        fr: langs !== null ? langs.fr : '',
        en: langs !== null ? langs.en : ''
    }

    console.log('la reponse: ', resp);

    res.status(200).json(resp);
}

const getBestSub = async (name, subtitles) => {
    if (subtitles === null || subtitles === undefined) { return [];}
    let sub = await subtitles.map(s => {
        return s.filename ;
    })
    var matches = stringSimilarity.findBestMatch(name, sub);
    
    let best = await subtitles.filter(s => {
        if (s.filename === matches.bestMatch.target)
            return s ;
    });
    return best ;
}

const getSubtitles = async (imdbid, quality, filename, meta) => {
    console.log('lol');
    const folder_path = `./my-files/torrent-stream/${meta.infoHash}`;
    const OpenSubtitles = new OS({
        useragent:'v1',
        username: 'hyper42',
        password: 'Test123*',
        ssl: true
    });
    console.log("FIND SUBTITLES ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''", imdbid);
    const os = await OpenSubtitles.login();

    const subs = await OpenSubtitles.search({
        sublanguageid: ['eng', 'fre'].join(),       // Can be an array.join, 'all', or be omitted.
        extensions: ['srt', 'vtt'], // Accepted extensions, defaults to 'srt'.
        limit: 'all',                 // Can be 'best', 'all' or an
        imdbid: imdbid,           // 'tt528809' is fine too.
        fps: '23.96',               // Number of frames per sec in the video.
       
    });

    const en = await getBestSub(filename, subs.en);
    const fr = await getBestSub(filename, subs.fr);
    
    let enLink = ``;
    let frLink = ``;
    let e = ``;
    let f = ``;

    if (en.length > 0) {
        createSubFile(en, 'en', folder_path);
        e = `${folder_path}/en.vtt`;
        enLink = `http://${host}:8080${folder_path.substring(1)}/en.vtt`;
    }

    if (fr.length > 0) {
        createSubFile(fr, 'fr', folder_path);
        f = `${folder_path}/fr.vtt`;
        frLink = `http://${host}:8080${folder_path.substring(1)}/fr.vtt`;
    }

    langs = { fr: frLink, en: enLink };
    updateDb(imdbid, quality, {$set: {fr: f, en: e}});
}

const createSubFile = (subs, name, folder_path) => {
    console.log('CREATE SRT FILESSSS');
    const fileen =  fs.createWriteStream(`${folder_path}/${name}.srt`)
                    https.get(subs[0].url, function(response) {
                        response.pipe(fileen);
                        fs.createReadStream(`${folder_path}/${name}.srt`)
                        .pipe(srt2vtt())
                        .pipe(fs.createWriteStream(`${folder_path}/${name}.vtt`))
                    });
}

exports.torrent = async (req, res) => {
    console.log("REQ", req.body)
    const inMongo = await Download.findOne({imdbid: req.body.imdbid, quality: req.body.quality});
    host = req.hostname;
    if (inMongo === null) {
        const process = fork(`./controllers/dl.js`);

        process.send({ msg: "START", req: {hostname: req.hostname, body: req.body} });

        process.on('message', (message) => {
            switch (message.msg) {
                case "META_LOADED" :
                    console.log("META_LOADED", message);
                    getSubtitles(req.body.imdbid, req.body.quality, message.data.name, message.meta);                    
                    break;
                case "ADD_IN_MONGO": 
                    console.log("ADD_IN_MONGO", message);
                    addInMongo(message.data, req.body.imdbid, req.body.quality); 
                    break ;
                case "RESPONSE": 
                    console.log("RESPONSE", message);
                    sendResponseToFront(res, req.body.imdbid, req.body.quality, message, langs); 
                    break;
                case "COMPLETED":
                    console.log("COMPLETED", message);
                    updateDb(req.body.imdbid, req.body.quality, {$set:{status: 'sliced'}});
                break ;
                default: break ;
            }
            console.log(`${message.msg}`);
        });
    } else {
        updateDb(req.body.imdbid, req.body.quality, {$set: {date_last_seen: Date.now()}})
        fs.stat(`${inMongo.folder_path}/out.m3u8`, function(err, stat) {
            if(err === null) {

                const fr = inMongo.fr != '' ? `http://${req.hostname}:8080${inMongo.fr.substring(1)}` : '';
                const en = inMongo.en != '' ? `http://${req.hostname}:8080${inMongo.en.substring(1)}` : '';

                res.status(200).json({
                    message: "can start streaming",
                    stream_link: `http://${req.hostname}:8080${inMongo.folder_path.substring(1)}/out.m3u8`,
                    en: en,
                    fr: fr,
                });
            } else {
                console.log('Some other error: ', err.code);
            }
        });
    }
}