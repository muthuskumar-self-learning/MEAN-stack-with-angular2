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

    router.route('/blogs/:id')
	.get((req, res) => {
	    if (!req.params.id) {
		res.json({ success: false, message: "Blog id was not provided." });
	    } else {
		Blog.findOne({ _id: req.params.id }).exec()
		    .then((blog) => {
			if (!blog) {
			    res.json({ success: false, message: "Blog not found." });
			} else {
			    User.findOne({ _id: req.decoded.userId }).exec()
				.then((user) => {
				    if (!user) {
					res.json({ success: false, message: "User not found." });
				    } else {
					if (user.username !== blog.createdBy) {
					    res.json({ success: false, message: "User not allowed to view this blog."});
					} else {
					    res.json({ success: true, blog: blog });
					}
				    }
				})
				.catch((err) => {
				    res.json({ success: false, message: "Unauthorized User. " + err });
				});
			}
			
		    })
		    .catch((err) => {
			res.json({ success: false, message: "An error occurred while retrieving blog. " + err});
		    })
		}
	})
	.put((req, res) => {
	    if (!req.body._id) {
		res.json({ success: false, message: "Blog id was not provided." });
	    } else {
		Blog.findOne({ _id: req.body._id }).exec()
		    .then((blog) => {
			if (!blog) {
			    res.json({ success: false, message: "Blog not found."});
			} else {
			    User.findOne({ _id: req.decoded.userId }).exec()
				.then((user) => {
				    if (!user) {
					res.json({ success: false, message: "User not found."});
				    } else {
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
				    }
				    
				})
				.catch((err) => {
				    res.json({ success: false, message: "Unauthorized user. " + err });
				});
			}
			
		    })
		    .catch((err) => {
			res.json({ success: false, message: "Unable to update blog. " + err });
		    })
		}
	})
	.delete((req, res) => {
	    if (!req.params.id) {
		res.json({ success: false, message: "Blog id was not provided."});
	    } else {
		Blog.findOne({ _id: req.params.id }).exec()
		    .then((blog) => {
			if (!blog) {
			    res.json({ success: false, message: "Blog not found."});
			} else {
			    User.findOne({ _id: req.decoded.userId }).exec()
				.then((user) => {
				    if (!user) {
					res.json({ success: false, message: "User not found." });
				    } else {
					if (user.username !== blog.createdBy) {
					    res.json({ success: false, message: "User is unauthorized to delete this blog."});
					} else {
					    blog.remove()
						.then((blog) => {
						    res.json({ success: true, message: "Blog deleted."});
						})
						.catch((err) => {
						    res.json({ success: false, message: "Unable to delete blog. " + err });
						});
					}
				    }
				})
				.catch((err) => {
				    res.json({ success: false, message: "Unauthorized user." + err});
				});

			}
		    })
		    .catch((err) => {
			res.json({ success: false, message: "Unable to delete blog" + err });
		    });
	    }
	});

    router.put('/blogs/:id/likes', (req, res) => {
	Blog.findOne({ _id: req.params.id }).exec()
	    .then((blog) => {
		if (!blog) {
		    res.json({ success: false, message: "Blog could not be found." });
		}

		User.findOne({ _id: req.decoded.userId }).exec()
		    .then((user) => {
			if (!user) {
			    res.json({ success: false, message: "User could not found." });
			}

			if (user.username !== blog.createdBy) {
			    if (blog.likedBy.includes(user.username)) {
				res.json({ success: false, message: "You have already liked this post."});
			    } else {
				if (blog.dislikedBy.includes(user.username)) {
				    blog.dislikes--;
				    blog.dislikedBy.splice(blog.dislikedBy.indexOf(user.username),1);
				}
				blog.likes++;
				blog.likedBy.push(user.username);

				blog.save()
				    .then((blog) => {
					res.json({ success: true, message: "Blog successfully  liked." });
				    })
				    .catch((err) => {
					res.json({ success: false, message: "Unable to like blog. " + err });
				    });
			    }
			} else {
			    res.json({ success: false, message: "You cannot like your own blog." });
			}			
		    })
		    .catch((err) => {
			res.json({ success: false, message: "An error occurred while retrieving user details for authorization." + err});
		    });
	    })
	    .catch((err) => {
		res.json({ success: false, message: "An error occurred while updating likes" + err });
	    });
    });

    router.put('/blogs/:id/dislikes', (req, res) => {
	Blog.findOne({ _id: req.params.id }).exec()
	    .then((blog) => {
		if (!blog) {
		    res.json({ success: false, message: "Blog could not be found." });
		}

		User.findOne({ _id: req.decoded.userId }).exec()
		    .then((user) => {
			if (!user) {
			    res.json({ success: false, message: "User could not found." });
			}

			if (user.username !== blog.createdBy) {
			    if (blog.dislikedBy.includes(user.username)) {
				res.json({ success: false, message: "You have already disliked this blog."});
			    } else {
				if (blog.likedBy.includes(user.username)) {
				    blog.likes--;
				    blog.likedBy.splice(blog.likedBy.indexOf(user.username),1);
				}
				blog.dislikes++;
				blog.dislikedBy.push(user.username);

				blog.save()
				    .then((blog) => {
					res.json({ success: true, message: "Blog successfully  disliked." });
				    })
				    .catch((err) => {
					res.json({ success: false, message: "Unable to dislike blog. " + err });
				    });
			    }
			} else {
			    res.json({ success: false, message: "You cannot dislike your own blog." });
			}			
		    })
		    .catch((err) => {
			res.json({ success: false, message: "An error occurred while retrieving user details for authorization." + err});
		    });
	    })
	    .catch((err) => {
		res.json({ success: false, message: "An error occurred while updating likes." + err });
	    });
    });    

    
    return router;
}
