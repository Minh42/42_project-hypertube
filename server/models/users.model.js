const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const userSchema = new Schema({
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    activation_code: { type: String, required: true },
    status: { type: String, required: true },
    profile_picture: { type: String, required: true },
    token: { type: String, required: true },
    googleID: { type: String },
    date_created: { type: String, required: true },
    date_updated: { type: String, required: true }
})

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = this._hashPassword(this.password);
    }
    next();
  });

userSchema.methods = {
    hashPassword(password) {
        return hashSync(password);
    },
    addUser(userData) {
        var newUser = User({
            firstname: userData.firstname,
            username: 'starlord55',
            password: 'password',
            admin: true
          });
        newUser.save(function(err) {
            if (err) 
                res.sendStatus(500);
            else {
                res.status(200).json({
                    message: 'New user created',
                    data: newUser
                });
            }
        });  
    },
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

module.exports = mongoose.model('users', userSchema);