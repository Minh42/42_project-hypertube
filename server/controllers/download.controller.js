const torrentStream = require('torrent-stream');
const parseTorrent = require('parse-torrent');
const request = require('request')
const Download = require('../models/download.model');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
/*
    initiated = on a commence a telecharge
    stream = on a assew pour streamer
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
                    console.log('////////////////////////// File exists can send 200 ///////////////////////////', sent);
                    if (sent === -1) {
                        sent = 1;
                        console.log(' STREAM LINK SENT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                        res.status(200).json({
                            message: "can start streaming",
                            stream_link: `http://localhost:8080${folder_path.substring(1)}/out.m3u8`
                        });
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
            var stream = file.createReadStream({start: 5000, end: file.length});
            // stream is readable stream to containing the file content
        });
        //engine.files[0].select()
    });

    engine.on('download', (pieceindex, d) => {
        console.log('Enter download', d);
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

exports.torrent = async (req, res) => {
    console.log(req.body)
   // httpRes = res
    movie = JSON.parse(JSON.stringify(req.body));
    let magnet = "";
    if (req.body.link !== "") {
        convertToMagnet(req.body.link, res);
    } else {
        //magnet = req.body.magnet;
        dl(req.body.magnet, res);
    }
}

exports.stream = async () => {

}