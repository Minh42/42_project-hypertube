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

process.on('message', async (message) => {
    switch(message.msg) {
        case "START": torrentdl(message.req); break ;
        default: break ;
    }
});

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
    Download.findOneAndUpdate({imdbid: movie.imdbid, quality: movie.quality}, updated, {upsert:true}, function(err, doc){
        if (err) console.log("error");
        else console.log("succesfully updated");
    });
}

const sendToMainProcess = (msg, data) => {
    process.send({
        msg: msg, 
        data: data
    });
}

let movie = null;
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
            process.send({msg:'COMPLETED'});
        })
        .on('progress', function(progress) {
            if (sent === -1) {
                console.log('Processing: ' + progress.percent + '% done', `${folder_path}/out.m3u8`);
                fs.stat(`${folder_path}/out.m3u8`, function(err, stat) {
                        
                    if (err == null) {
                        sent = 1;
                        console.log(' STREAM LINK SENT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                        const data = {
                            stream_link: `${folder_path}/out.m3u8`
                        }
                        sendToMainProcess('RESPONSE', data);
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
            console.log("STATUS", status, pieceindex);

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

        process.send({
            msg:'ADD_IN_MONGO', 
            data: { 
                imdbid: movie.imdbid, folder_path: folder_path,
                complete_path: `${folder_path}/${movieFile.path}`, title: movieFile.name,
                en: '', fr: '',
                status: 'initiated',
                date_created: Date.now(), date_last_seen: Date.now()
            }
        });

        process.send({
            msg: 'META_LOADED', 
            data: movieFile,
            meta: meta
        });
    });
}

manageTorrentMagnet = (req, res) => {
    const magnet = req.body.link;
    if (magnet.includes('magnet:')) {
        dl(magnet, res);
    } else {
        convertToMagnet(magnet, res);
    }
}

torrentdl = async (req, res) => {
    console.log("HOSTNAME", req)
    hostname = req.hostname;
    console.log("OOOOOOOO")
    movie = req.body;
    console.log("PPPPP")
    manageTorrentMagnet(req, res);
}