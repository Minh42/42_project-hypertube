const torrentStream = require('torrent-stream');
const parseTorrent = require('parse-torrent');
const request = require('request')
const Download = require('../models/download.model');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const OS = require('opensubtitles-api');
const srt2vtt = require('srt-to-vtt');
const stringSimilarity = require('string-similarity');
const axios = require('axios');
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


let movie = null;
let httpRes = null;

const getBestSub = async (name, subtitles) => {
    let sub = await subtitles.map(s => {
        return s.filename ;
    })
    var matches = stringSimilarity.findBestMatch(name, sub);
    
    let best = await subtitles.filter(s => {
        if (s.filename === matches.bestMatch.target)
            return s ;
    })

    console.log("SUB BEST MATCHES", best)
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
                // an array of objects, no duplicates (ordered by
                // matching + uploader, with total downloads as fallback)
                



                const fr = await getBestSub(movieFile.name, subtitles.fr);
                const en = await getBestSub(movieFile.name, subtitles.en);

                if (fr.length > 0) { 
                    const conf = {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8',
                        }
                    }
                    
                    const frFile = await axios.get(fr[0].url, conf)
                    //const srtFr = await fs.readFileSync(fr[0].url);
                   // console.log("SRTTTTTTTTttttttt", frFile.data);

                    await fs.writeFileSync(`${folder_path}/fr.srt`, frFile.data, 'utf8');
                    fs.createReadStream(`${folder_path}/fr.srt`)
                    .pipe(srt2vtt())
                    .pipe(fs.createWriteStream(`${folder_path}/fr.vtt`))







                  /*  srt2vtt(frFile.data, async (err, vttData) => {
                        console.log('ooooooooooooooooooooooooooooooooooooo');
                        
                        console.log("WRIIIIIIiiiiiiiiinnnnnggggggggg////////////////////////////////////////////////////////////////////////////")
                        await fs.writeFileSync(`${folder_path}/fr.vtt`, vttData);
                    });*/
                }

                /*const srtEn = await fs.readFileSync(en[0].url);
                srt2vtt(srtEn, (err, vttData) => {
                    if (err) throw new Error(err);
                    fs.writeFileSync(`${folder_path}/en.vtt`, vttData);
                });
*/
                res.status(200).json({
                    message: "can start streaming",
                    stream_link: `http://localhost:8080${folder_path.substring(1)}/out.m3u8`,
                    fr: `http://localhost:8080${folder_path.substring(1)}/fr.vtt`,
                    en: `http://localhost:8080${folder_path.substring(1)}/en.vtt`
                });
            });
        })
        .catch(err => {
            console.log('CTACHHHHHHHHHH')
            console.log(err);
        });
}

const slicing = (path, to, res, folder_path, movieFile) => {
    let sent = -1;
    console.log("##########################    SLICING", path, to, sent)
    ffmpeg(path, { timeout: 432000 }).addOptions([
        //  '-profile:v baseline', // baseline profile (level 3.0) for H264 video codec
        //  '-level 3.0', 
       //   '-s 640x360',          // 640px width, 360px height output video dimensions
          '-start_number 0',     // start the first .ts segment at index 0
          '-hls_time 2',        // 10 second segment duration
          '-hls_list_size 0',    // Maxmimum number of playlist entries (0 means all entries/infinite)
       //   '-f hls'               // HLS format
        ]).output(to).on('end', () => {
            console.log("slicing completed")
            const updated = {imdbid: movie.imdbid, folder_path: folder_path,
                complete_path: `${folder_path}/${movieFile.path}`, title: movieFile.name, langue: movie.langue,
                status: 'sliced'
            }
            Download.findOneAndUpdate({imdbid: movie.imdbid}, updated, {upsert:true}, function(err, doc){
                if (err) console.log("error");
                else console.log("succesfully updated");
            });
        })
        .on('progress', function(progress) {
            console.log('Processing: ' + progress.percent + '% done', `${folder_path}/out.m3u8`);
            fs.stat(`${folder_path}/out.m3u8`, function(err, stat) {
                    
                if(err == null) {
                    
                    if (sent === -1) {
                        sent = 1;
                        console.log(' STREAM LINK SENT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

                        addSubtitles(movieFile, res, folder_path);

                        
                    }
                } else {
                    console.log('Some other error: ', err.code);
                }
            });

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
                console.log(uri);
                dl(uri, res);
            } catch (err) { console.log("error while to magnet")}
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
            console.log('filename:', file.name);
            console.log('filepath:', file.path);
            console.log('filelength:', file.length);
            var stream = file.createReadStream({start: 0, end: 15});
            file.createReadStream({start: 16, end: file.length});
            // stream is readable stream to containing the file content
        });
        //engine.files[0].select()
    });

    engine.on('download', (pieceindex, d) => {
       // console.log('Enter download', d);
        if (pieceindex <= 15) {
            status = status | Math.pow(2, pieceindex);
            console.log("STATUS", status, pieceindex)
            const updated = {imdbid: movie.imdbid, folder_path: folder_path,
                complete_path: `${folder_path}/${movieFile.path}`, title: movieFile.name, langue: movie.langue,
                status: 'stream'
            }
            Download.findOneAndUpdate({imdbid: movie.imdbid}, updated, {upsert:true}, function(err, doc){
                if (err) console.log("error");
                else console.log("succesfully updated");
            });
            
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
            const toAddInDb = new Download({imdbid: movie.imdbid, folder_path: folder_path,
                complete_path: `${folder_path}/${movieFile.path}`, title: movieFile.name, langue: movie.langue,
                status: 'downloaded'
            });
            toAddInDb.save(err => {
                if (err) {
                    console.log("error not added in db")
                } else {
                    console.log("added in db")
                }
            })
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
        console.log("MOVIE", movieFile);
        const updated = {imdbid: movie.imdbid, folder_path: folder_path,
            complete_path: `${folder_path}/${movieFile.path}`, title: movieFile.name, langue: movie.langue,
            status: 'initiated'
        }
        Download.findOneAndUpdate({imdbid: movie.imdbid}, updated, {upsert:true}, function(err, doc){
            if (err) console.log("error");
            else console.log("succesfully updated");
        });/*
        const toAddInDb = new Download({imdbid: movie.imdbid, folder_path: folder_path,
            complete_path: `${folder_path}/${movieFile.path}`, title: movieFile.name, langue: movie.langue,
            status: 'initiated'
        });
        toAddInDb.save(err => {
            if (err) {
                console.log("error not added in db")
            } else {
                console.log("added in db")
            }
        })*/
    })
}

manageTorrentMagnet = (req, res) => {
    if (req.body.link !== "") {
        convertToMagnet(req.body.link, res);
    } else {
        //magnet = req.body.magnet;
        dl(req.body.magnet, res);
    }
}

exports.torrent = async (req, res) => {
    console.log(req.body)
   // httpRes = res
    movie = JSON.parse(JSON.stringify(req.body));
    let magnet = "";
    const inMongo = await Download.findOne({imdbid: req.body.imdbid})
    console.log("RET", inMongo)
    if (inMongo === null) {
        manageTorrentMagnet(req, res);
    } else {
        fs.stat(`${inMongo.folder_path}/out.m3u8`, function(err, stat) {
            if(err == null) {
                res.status(200).json({
                    message: "can start streaming",
                    stream_link: `http://localhost:8080${inMongo.folder_path.substring(1)}/out.m3u8`
                });
                // return ;
            } else {
                manageTorrentMagnet(req, res);
                console.log('Some other error: ', err.code);
            }
        });
        
        
    }
}

exports.stream = async () => {

}