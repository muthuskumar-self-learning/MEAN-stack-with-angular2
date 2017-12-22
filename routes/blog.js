const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Blog = require('../models/blog');
const dbConfig = require('../config/database');

module.exports = (router) => {

    router.route('/blogs')
	.get((req, res) => {
	    Blog.find({})
		.sort({ _id: -1 })
		.exec()
		.then((blogs) => {
		    if (!blogs) {
			res.json({ success: false, message: 'No blogs found.' });
		    } else {
			res.json({ success: true, blogs: blogs });
		    }
		})
		.catch((err) => {
		    res.json({ success: false, message: 'Unable to retreive blogs. ' + err });
		});
	})
	.post((req, res) => {
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

		blog.save()
		    .then((blog) => {
			res.json({ success: true, message: 'Blog saved!'});
		    })
		    .catch((err) => {
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
		    });
	    }
	});

    router.get('/singleBlog/:id', (req, res) => {

	if (!req.params.id) {
	    res.json({ success: false, message: "Blog id was not provided." });
	} else {
	    Blog.findOne({ _id: req.params.id }).exec()
		.then((blog) => {
		    User.findOne({ _id: req.decoded.userId }).exec()
			.then((user) => {
			    if (user.username !== blog.createdBy) {
				res.json({ success: false, message: "User not allowed to view this blog."});
			    } else {
				res.json({ success: true, blog: blog });
			    }
			})
			.catch((err) => {
			    res.json({ success: false, message: "Unauthorized User. " + err });
			});
		})
		.catch((err) => {
		    res.json({ success: false, message: "An error occurred while retrieving blog. " + err});
		})
	}
    });

    router.put('/blog', (req, res) => {
	if (!req.body._id) {
	    res.json({ success: false, message: "Blog id was not provided." });
	} else {
	    Blog.findOne({ _id: req.body._id }).exec()
		.then((blog) => {
		    User.findOne({ _id: req.decoded.userId }).exec()
			.then((user) => {
			    if (user.username !== blog.createdBy) {
				res.json({ success: false, message: "User not allowed to modify this blog."});
			    } else {
				blog.title = req.body.title;
				blog.body = req.body.body;

				blog.save()
				    .then((blog) => {
					res.json({ success: true, message: "Blog saved.", blog: blog });
				    })
				    .catch((err) => {
					res.json({ success: false, message: "Unable to update blog. " + err});
				    });
			    }
			})
			.catch((err) => {
			    res.json({ success: false, message: "Unauthorized User. " + err });
			});
		})
		.catch((err) => {
		    res.json({ success: false, message: "Unable to update blog. " + err });
		})
	}
    });
    
    return router;
}
