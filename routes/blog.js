const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Blog = require('../models/blog');
const dbConfig = require('../config/database');

module.exports = (router) => {

    router.post('/newBlog', (req, res) => {
	if (!req.body.title) {
	    res.json({ success: false, message: 'Blog title is missing.' });
	} else if (!req.body.body) {
	    res.json({ success: false, message: 'Blog body is missing.' });
	} else if (!req.body.createdBy) {
	    res.json({ success: false, message: 'Blog creator is missing.' });
	} else {
	    blog = new Blog({
		title: req.body.title,
		body: req.body.body,
		createdBy: req.body.createdBy
	    });

	    blog.save((err) => {
		if (err) {
		    if (err.errors) {
			if (err.errors.title) {
			    res.json({ success: false, message: err.errors.title.message});
			} else if ( err.errors.body) {
			    res.json({ success: false, message: err.errors.body.message});
			} else {
			    res.json({ success: false, message: 'Unable to save blog due to - ' + err});
			}
		    } else {
			res.json({ success: false, message: 'Unable to save blog due to - ' + err});
		    }
		} else {
		    res.json({ success: true, message: 'Blog saved!'});
		}
	    });
	}
    });
    return router;
}
