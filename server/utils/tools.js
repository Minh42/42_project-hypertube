const isJpg = require('is-jpg');
const isPng = require('is-png');
const isGif = require('is-gif');
const isBmp = require('is-bmp');

function isValid(buffer, mimetype, size) {
	const allowedMimeTypes = ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/png', 'image/bmp'];
	if ((isJpg(buffer) || isPng(buffer) || isGif(buffer) || isBmp(buffer)) 
		&& allowedMimeTypes.includes(mimetype) && size < 2000000) {  
		return true;
	} else {
		return false;
	}
}

module.exports = {
	isValid : isValid
}