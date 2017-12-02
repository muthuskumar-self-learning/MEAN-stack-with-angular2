const User = require('../models/user');

module.exports = (router) => {
    router.post('/register', (req, res) => {
	console.log(req.body);
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
    
    return router;
}
