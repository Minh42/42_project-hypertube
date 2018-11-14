const download = require('express').Router();
const downloadController = require('../controllers/download.controller');

// download.get('/', authenticate, downloadController.getAlldownload);
// download.post('/', authenticate, downloadController.createMovie);
// download.get('/:id', authenticate, downloadController.getMovie);
// download.put('/:id', authenticate, downloadController.updateMovie);
// download.delete('/:id', authenticate, downloadController.deleteMovie);

/*title: "Final Fantasy VII: Advent Children",
            imdbid: "tt0385700",
            langue: "eng",
            link: "https://yts.am/torrent/download/38DE5EFB131A480B5F82D918AEEBFEE8E18F78AF",
            magnet: ""*/

download.post('/torrent', downloadController.torrent)
module.exports = download;