const Users = require('../models/users.model');
const Picture = require('../models/profilePicture.model');

exports.getPicture = (req, res) => {
    console.log(req.body)
    Picture.findOne({"userID" :req.body.id}, (err, picture) => {
        if (err) {
            res.sendStatus(500);  
        }
        if (!picture) {
            res.sendStatus(404);    
        } else {
            console.log(picture)
            res.json(picture)
        }
    })
}