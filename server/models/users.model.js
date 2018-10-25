const mongoose = require('mongoose');
var validate = require('mongoose-validator')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

var nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [1, 30],
        message: 'Your firstname/lastname is too short or too long'
    }),
    validate({
        validator: 'isAlpha',
        passIfEmpty: true,
        message: 'Your firstname/lastname  must contain only alphabetic characters'
    }),
]

var usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [1, 30],
        message: 'Your username is too short or too long'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Your username must contain only alphanumeric characters'
    }),
]

var emailValidator = [
    validate({
        validator: 'isLength',
        arguments: [1, 30],
        message: 'Your email is too short or too long'
    }),
    validate({
        validator: 'isEmail',
        passIfEmpty: true,
        message: 'Please enter a valid email address'
    }),
]

var passwordValidator = [
    validate({
        validator: 'matches',
        arguments: /(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        message: 'Your password must contain at least 6 character, a capital letter and a number'
    }),
]

const userSchema = new Schema({
    firstname: { type: String, required: true, trim: true, validate: nameValidator },
    lastname: { type: String, required: true, trim: true, validate: nameValidator },
    username: { type: String, required: true, trim: true, unique: true, validate: usernameValidator },
    email: { type: String, required: true, trim: true, unique: true, validate: emailValidator },
    password: { type: String, required: true, trim: true, validate: passwordValidator },
    googleID: { type: String },
    facebookID: { type: String },
    twitterID: { type: String },
    githubID: { type: String },
    linkedinID: { type: String },
    school42ID: { type: String },
    date_created: { type: Date, required: true, default: Date.now },
    date_updated: { type: Date, required: true, default: Date.now }
    // activation_code: { type: Boolean },
    // status: { type: Boolean, required: true },
    // profile_picture: { type: String },
    // token: { type: Boolean }
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