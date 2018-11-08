const torrentStream = require('torrent-stream');
const parseTorrent = require('parse-torrent');
const requests = require('async-request')
const request = require('request')
const extend = require('extend');
const axios = require('axios');
const Buffer = require('buffer').Buffer;

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

const url = 'https://yts.am/torrent/download/D9E89F3E158725FCA53DA2E492EC8D0D27AA5385'

  const onResponse = (err, response) => {
      console.log("RRRRR", response.body)
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
        dl(uri);
    } catch (err) { console.log("error while to magnet")}
  };
/*
    request(extend({ url: url, encoding: null }, {}), onResponse);

*/

const convertToMagnet = async (url) => {
    
   const res = await request({ url: url, encoding: null }, onResponse);
    //console.log("RESSS", res)
    
    //const res = await axios.get(url, {responseType: 'stream'});
    //console.log("EXT", res.body)
   // const result = parseTorrent(Buffer.from(res.body));
   // console.log("result", res.body)
   // const uri = parseTorrent.toMagnetURI(result);
   // return uri;
    //console.log(uri);
}

const dl = (magnet) => {
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

    engine.on('download', (pieceindex) => {
        console.log("piece index", pieceindex);
        console.log("DLD", `${engine.swarm.downloaded/1000/1000}mb downloaded`)
    }) 

    engine.on('idle', () =>{
        console.log("downloaded completed")
    })

    engine.on('torrent', (meta) => {
        console.log("meta", meta)
    })
}

exports.start = async (req, res) => {
    console.log(req.body)
    let magnet = "";
    if (req.body.link !== "") {
        convertToMagnet(req.body.link);
    } else {
        //magnet = req.body.magnet;
        dl(req.body.magnet);
    }
}