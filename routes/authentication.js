const jwt = require('jsonwebtoken');

const User = require('../models/user');
const dbConfig = require('../config/database');

module.exports = (router) => {
    router.post('/register', (req, res) => {
	if (!req.body.email) {
	    res.json({ success: false, message: 'email id is required.' });
	} else if (!req.body.username) {
	    res.json({ success: false, message: 'username is required.' });
	} else if (!req.body.password) {
	    res.json({ success: false, message: 'password is required.' });
	} else {
	    let user = User({
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	    });
	    console.log('User ', user);
	    user.save((err) => {
		if (err) {
		    if (err.code === 11000)
			res.json({ success: false, message: 'Username or email already exists.' });
		    else
			res.json({ success: false, message: 'Database error occurred: ' + err });
		} else {
		    res.json({ success: true, message: 'Account created successfully!' });
		}
	    });
	}
    });

    router.get('/checkEmail/:email', (req, res) => {
	if (!req.params.email) {
	    return { success: false, message: "Username not provided." };
	} else {
	    User.findOne({email: req.params.email}, (err, user) => {
		if (err) {
		    res.json({ success: false, message: "An error occurred while finding the user." + err });
		} else {
		    if (user) {
			res.json({ success: false, message: "Email already registered" });
		    } else {
			res.json({ success: true, message: "Email id available" });
		    }
		}
	    });
	}
    });

    router.get('/checkUsername/:username', (req, res) => {
	if (!req.params.username) {
	    return { success: false, message: "Username not provided." };
	} else {
	    User.findOne({username: req.params.username}, (err, user) => {
		if (err) {
		    res.json({ success: false, message: "An error occurred while finding the user." + err });
		} else {
		    if (user) {
			res.json({ success: false, message: "Username already taken" });
		    } else {
			res.json({ success: true, message: "Username available" });
		    }
		}
	    });
	}
    });    

    router.post('/login', (req, res) => {
	if (!req.body.username) {
	    res.json({ success: false, message: 'Username was not provided' });
	} else if (!req.body.password) {
	    res.json({ success: false, message: 'Password was not provided' });
	} else {
	    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
		if (err) {
		    res.json({ success: false, message: err });
		} else if (!user) {
		    res.json({ success: false, message: 'Username not found'});
		} else {
		    const validPassword = user.comparePassword(req.body.password);
		    if (!validPassword) {
			res.json({ success: false, message: 'Invalid password' });
		    } else {
			const token = jwt.sign({ userId: user._id }, dbConfig.secret, { expiresIn: '24h' });
			res.json({ success: true, message: 'Login successfull', token: token, user: { username: user.username } });
		    }
		}
	    })
	}
    });
    
    return router;
}
