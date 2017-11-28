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
			res.json({ success: false, message: 'Username or email already exists' });
		    else
			res.json({ success: false, message: 'Database error occurred: ' + err });
		} else {
		    res.json({ success: true, message: 'Account created successfully!' });
		}
	    });
	}
    });
    
    return router;
}
