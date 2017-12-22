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

    router.get("/allBlogs", (req, res) => {
	Blog.find({})
	    .sort({ _id: -1 })
	    .exec((err, blogs) => {
	    if (err) {
		res.json({ success: false, message: 'Unable to retreive blogs. ' + err });
	    } else if (!blogs) {
		res.json({ success: false, message: 'No blogs found.' });
	    } else {
		res.json({ success: true, blogs: blogs });
	    }
	});
    });

    router.get('/singleBlog/:id', (req, res) => {

	if (!req.params.id) {
	    res.json({ success: false, message: "Blog id was not provided." });
	} else {
	    Blog.findOne({ _id: req.params.id }, (err, blog) => {
		if (err) {
		    res.json({ success: false, message: "Error while retriving blog." + err });
		} else if (!blog) {
		    res.json({ success: false, message: "Blog not found." });
		} else {
		    res.json({ success: true, blog: blog });
		}
	    });
	}
    });
    
    return router;
}
