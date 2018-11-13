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
/*
    initiated = on a commence a telecharge
    stream = on a assez pour streamer
    downloaded = telechargement termine
    sliced = sliced completed
*/

const options = {
	connections: 100,     // Max amount of peers to be connected to.
	uploads: 10,          // Number of upload slots.
	tmp: './my-files/',          // Root folder for the files storage.
	                      // Defaults to '/tmp' or temp folder specific to your OS.
	                      // Each torrent will be placed into a separate folder under /tmp/torrent-stream/{infoHash}
//	path: './my-files', // Where to save the files. Overrides `tmp`.
	verify: true,         // Verify previously stored data before starting
	                      // Defaults to true
	dht: true,            // Whether or not to use DHT to initialize the swarm.
	                      // Defaults to true
	tracker: true//,        // Whether or not to use trackers from torrent file or magnet link
	                      // Defaults to true
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }


updateDb = (updated) => {
    Download.findOneAndUpdate({imdbid: movie.imdbid}, updated, {upsert:true}, function(err, doc){
        if (err) console.log("error");
        else console.log("succesfully updated");
    });
}

let movie = null;
let hostname = null;

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

const addSubtitles = (movieFile, res, folder_path) => {
    const OpenSubtitles = new OS({
        useragent:'v1',
        username: 'hyper42',
        password: 'Test123*',
        ssl: true
    });
    console.log("FIND SUBTITLES ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''", movie.imdbid)
    OpenSubtitles.login()
        .then(response => {
            OpenSubtitles.search({
                sublanguageid: ['eng', 'fre'].join(),       // Can be an array.join, 'all', or be omitted.
              
                extensions: ['srt', 'vtt'], // Accepted extensions, defaults to 'srt'.
                limit: '3',                 // Can be 'best', 'all' or an
                                           
                imdbid: movie.imdbid,           // 'tt528809' is fine too.
                fps: '23.96',               // Number of frames per sec in the video.
               
            }).then(async subtitles => {
                console.log("GET SUBTITLES ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''")

                const fr = await getBestSub(movieFile.name, subtitles.fr);
                const en = await getBestSub(movieFile.name, subtitles.en);
                const frLink = `${folder_path.substring(1)}/fr.vtt`;
                const enLink = `${folder_path.substring(1)}/en.vtt`;
                const streamLink = `http://${hostname}:8080${folder_path.substring(1)}/out.m3u8`;
                if (en.length > 0) { 
                    const fileen = fs.createWriteStream(`${folder_path}/en.srt`);
                    https.get(en[0].url, function(response) {
                    response.pipe(fileen);
                    fs.createReadStream(`${folder_path}/en.srt`)
                    .pipe(srt2vtt())
                    .pipe(fs.createWriteStream(`${folder_path}/en.vtt`))
                    
                    if (fr.length > 0) {
                        const filefr = fs.createWriteStream(`${folder_path}/fr.srt`);
                        https.get(fr[0].url, function(response) {
                            response.pipe(filefr);
                            fs.createReadStream(`${folder_path}/fr.srt`)
                            .pipe(srt2vtt())
                            .pipe(fs.createWriteStream(`${folder_path}/fr.vtt`))
                            updateDb({$set:{en: enLink, fr: frLink}})
                            res.status(200).json({
                                message: "can start streaming",
                                stream_link: streamLink,
                                fr: `http://${hostname}:8080${frLink}`,
                                en: `http://${hostname}:8080${enLink}`
                            });
                        });
                    } else {
                        updateDb({$set:{en: enLink, fr: ""}})
                        res.status(200).json({
                            message: "can start streaming",
                            stream_link: streamLink,
                            fr: ``,
                            en: `http://${hostname}:8080${enLink}`
                        });
                        return ;
                    }
                    });
                } else {
                    updateDb({$set:{en: "", fr: ""}})
                    res.status(200).json({
                        message: "can start streaming",
                        stream_link: streamLink,
                        fr: ``,
                        en: ``
                    });
                    return ;
                }
            });
        })
        .catch(err => {
            console.log(err);
        });
}

const slicing = (path, to, res, folder_path, movieFile) => {
    let sent = -1;
    console.log("##########################    SLICING", path, to, sent)
    ffmpeg(path, { timeout: 432000 }).addOptions([
       //   '-s 640x360',          // 640px width, 360px height output video dimensions
          '-start_number 0',     // start the first .ts segment at index 0
          '-hls_time 2',        // 10 second segment duration
          '-hls_list_size 0',    // Maxmimum number of playlist entries (0 means all entries/infinite)
        ]).output(to).on('end', () => {
            console.log("slicing completed")
            const updated = {
                $set: {status: 'sliced'}
            }
            updateDb(updated);
        })
        .on('progress', function(progress) {
            console.log('Processing: ' + progress.percent + '% done', `${folder_path}/out.m3u8`);
            if (sent === -1) {
                fs.stat(`${folder_path}/out.m3u8`, function(err, stat) {
                        
                    if(err == null) {
                        sent = 1;
                        console.log(' STREAM LINK SENT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                        addSubtitles(movieFile, res, folder_path);
                    } else {
                        console.log('Some other error: ', err.code);
                    }
                });
            }
        })
        .run()
}

const convertToMagnet = async (url, res) => {
    const onRes = (res) => {
        return (err, response) => {
            if (err) {
                console.log("error", err)
              return ;
            }
            if (response.statusCode >= 400) {
                console.log("Bad response", response.statusCode)
                return ;
            }
            try {
                const result = parseTorrent(response.body);
                const uri = parseTorrent.toMagnetURI(result);
                dl(uri, res);
            } catch (err) { 
                console.log("error while to magnet") 
            }
        }
    }
    const onResponse = onRes(res);
    await request({ url: url, encoding: null }, onResponse);
}

const dl = (magnet, res) => {
    let status = 0;
    let nbFile = 0;
    let nbFileSaved = 0;
    let movieFile = null;
    let folder_path = "";

    const engine = torrentStream(magnet, options);

    engine.on('ready', () => {
        console.log("engine is ready");
        engine.files.forEach(function(file) {
            var stream = file.createReadStream({start: 0, end: 15});
            file.createReadStream({start: 16, end: file.length});
        });
    });

    engine.on('download', (pieceindex, d) => {
        if (pieceindex <= 15) {
            status = status | Math.pow(2, pieceindex);
            console.log("STATUS", status, pieceindex)
            const updated = { 
                $set: {
                    status: 'stream' }
            }
            updateDb(updated);
            
            if (status === 0b1111111111111111) {
                console.log("First parts dl --------------------------------")
                fs.stat(`${folder_path}/${movieFile.path}`, function(err, stat) {
                    if(err == null) {
                        console.log('*************************************************************************************************** SLICING', d);
                        slicing(`${folder_path}/${movieFile.path}`, `${folder_path}/out.m3u8`, res, folder_path, movieFile);
                        
                    } else {
                        console.log('Some other error: ', err.code);
                    }
                });
            }
        }
        console.log(pieceindex);
        console.log(`${engine.swarm.downloaded/1000/1000}mb`)
    }) 

    engine.on('idle', () =>{
        nbFileSaved++;
        console.log("downloaded completed", `${nbFileSaved}/${nbFile}`)
        if (nbFileSaved === nbFile) {
            const updated = { $set: {
                status: 'downloaded'}
            }
            updateDb(updated)
        }
    })

    engine.on('torrent', async (meta) => {
        let ff = null;
        console.log("meta", meta)
        folder_path = `./my-files/torrent-stream/${meta.infoHash}`;
        await asyncForEach(meta.files, async (f) => {
            if (ff === null) {
                ff = f;
            } else if (f.length > ff.length) {
                ff = f;
            }
        });
        nbFile = meta.files.length;
        console.log("NB FILES", nbFile);
        movieFile = JSON.parse(JSON.stringify(ff));
        console.log("MOVIEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE", movieFile);
        const toAddInDb = new Download({imdbid: movie.imdbid, folder_path: folder_path,
            complete_path: `${folder_path}/${movieFile.path}`, title: movieFile.name, langue: movie.langue,
            en: '', fr: '',
            status: 'initiated',
            date_created: Date.now(), date_last_seen: Date.now()
        });
        toAddInDb.save(err => {
            if (err) {
                console.log("error not added in db", err)
            } else {
                console.log("added in db")
            }
        })
    })
}

manageTorrentMagnet = (req, res) => {
    if (req.body.link !== "") {
        convertToMagnet(req.body.link, res);
    } else {
        dl(req.body.magnet, res);
    }
}

exports.torrent = async (req, res) => {
    console.log("HOSTNAME", req.hostname)
    hostname = req.hostname;
    movie = JSON.parse(JSON.stringify(req.body));
    const inMongo = await Download.findOne({imdbid: req.body.imdbid})
    console.log("RET", inMongo)
    if (inMongo === null) {
        manageTorrentMagnet(req, res);
    } else {
        updateDb({$set: {date_last_seen: Date.now()}})
        fs.stat(`${inMongo.folder_path}/out.m3u8`, function(err, stat) {
            if(err === null) {
                res.status(200).json({
                    message: "can start streaming",
                    stream_link: `http://${hostname}:8080${inMongo.folder_path.substring(1)}/out.m3u8`,
                    en: inMongo.en,
                    fr: inMongo.fr
                });
            } else {
                manageTorrentMagnet(req, res);
                console.log('Some other error: ', err.code);
            }
        });
        
        
    }
}

exports.stream = async () => {

}