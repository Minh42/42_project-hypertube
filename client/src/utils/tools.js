const isJpg = require('is-jpg');
const isPng = require('is-png');
const isGif = require('is-gif');
const isBmp = require('is-bmp');

function isEmail(email) {
	var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!regex.test(email)) return false;
	return true;
}

function isPassword(password) {
	var regex = /(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
	if (!regex.test(password)) return false;
	return true;
}

function getRandomArbitrary(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function isValid(buffer, mimetype, size) {
	const allowedMimeTypes = ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/png', 'image/bmp'];
	if ((isJpg(buffer) || isPng(buffer) || isGif(buffer) || isBmp(buffer)) 
		&& allowedMimeTypes.includes(mimetype) && size < 2000000) {  
		return true;
	} else {
		return false;
	}
}

function convertMinsToHrsMins(mins) {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    return (h + "h" + m).toString();
}

module.exports = {
	isEmail : isEmail,
	isPassword : isPassword,
	getRandomArbitrary : getRandomArbitrary,
	isValid : isValid,
	convertMinsToHrsMins : convertMinsToHrsMins
}