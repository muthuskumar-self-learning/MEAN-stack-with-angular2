const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Blog = require('../models/blog');
const dbConfig = require('../config/database');

module.exports = (router) => {

    router.post('/newBlog', (req, res) => {

	res.send('test');
    });
    return router;
}
