import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const UserSchema = new Schema({
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    activation_code: { type: String, required: true },
    status: { type: String, required: true },
    profile_picture: { type: String, required: true },
    token: { type: String, required: true },
    date_created: { type: String, required: true },
    date_updated: { type: String, required: true }
})

UserSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = this._hashPassword(this.password);
    }
    next();
  });


UserSchema.methods = {
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
                throw err;
            else {
                res.json({
                    message: 'New user created',
                    data: newUser
                });
            }
        });  
    }

}

module.exports = mongoose.model('User', UserSchema);