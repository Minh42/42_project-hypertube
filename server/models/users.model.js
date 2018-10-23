const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true, unique: true},
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    // activation_code: { type: Boolean },
    // status: { type: Boolean, required: true },
    // profile_picture: { type: String },
    // token: { type: Boolean },
    // date_created: { type: Date },
    // date_updated: { type: Date }
})

// userSchema.path('fistname').validate(function (v) {
//     return v.length > 15;
// }, 'Your fistname is too long'); 

// userSchema.path('lastname').validate(function (v) {
//     return v.length > 15;
// }, 'Your lastname is too long');

// userSchema.path('username').validate(function (v) {
//     return v.length > 15;
// }, 'Your username is too long'); 

// userSchema.pre('save', function(next) {
//     if (this.isModified('password')) {
//         this.password = this._hashPassword(this.password);
//     }
//     next();
// });

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