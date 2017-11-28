const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const validators = require('./userDetailsValidator');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const usernameValidators = [
    {
	validator: validators.usernameLength,
	message: 'Username must be at least 3 character long and not more than 15.'
    },
    {
	validator: validators.validUsername,
	message: 'Username must not have any special characters.'
    }
];

const emailValidators = [
    {
	validator: validators.emailLength,
	message: 'Email must be at least 5 character long and not more than 30.'
    },
    {
	validator: validators.validEmail,
	message: 'Email must be in valid format.'
    }
];

const passwordValidators = [
    {
	validator: validators.passwordLength,
	message: 'Password must be at least 8 character long and not more than 35.'
    },
    {
	validator: validators.validPassword,
	message: 'Password must have at least one uppercase, lowercase, special character and a number.'
    }
];


const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
    username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
    password: { type: String, required: true, validate: passwordValidators }
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password'))
	return next();

    bcrypt.hash(this.password, null, null, (err, hash) => {
	if (err) return next(err);
	this.password = hash;
	next();
    });
});

userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
