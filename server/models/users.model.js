const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const valid  = require('validator');
const tools = require('../../src/utils/tools.js');
const SALT_WORK_FACTOR = 10;

function isLength (v) {
    return valid.isByteLength(v, { min : 1, max : 30 });
};

function isAlpha (v) {
    return valid.isAlpha(v);
}

function isAlphanumeric (v) {
    return valid.isAlphanumeric(v);
}

function isEmail (v) {
    return valid.isEmail(v);
}

function isPassword (v) {
    return tools.isPassword(v);
}
  
const userSchema = new Schema({
    firstname: { type: String, required: true, trim: true, validate: [isLength , 'Your firstname is too short or too long'], validate: [isAlpha, 'Your firstname must contain only alphabetic characters'] },
    lastname: { type: String, required: true, trim: true, validate: [isLength , 'Your lastname is too short or too long'], validate: [isAlpha, 'Your firstname must contain only alphabetic characters'] },
    username: { type: String, required: true, trim: true, unique: true, validate: [isLength , 'Your username is too short or too long'], validate: [isAlphanumeric, 'Your username must contain only alphanumeric characters']},
    email: { type: String, required: true, trim: true, unique: true, validate: [isLength , 'Your email is too short or too long'], validate: [isEmail, 'Please enter a valid email address']},
    password: { type: String, required: true, validate: [isPassword , 'Your password must contain at least 6 character, a capital letter and a number'] },
    // activation_code: { type: Boolean },
    // status: { type: Boolean, required: true },
    // profile_picture: { type: String },
    // token: { type: Boolean },
    // date_created: { type: Date },
    // date_updated: { type: Date }
})

userSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) 
        return next();
 
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) return next(err);
 
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);
 
            user.password = hash;
            next();
        });
    });
});
 

userSchema.methods = {
    editUser(userData) {
        user.save(function(err) {
            if (err) 
                res.sendStatus(500);
            else {
                res.status(200).json({
                    message: 'User info updated',
                    data: user
                });
            }
        })
    }

}

module.exports = mongoose.model('Users', userSchema);