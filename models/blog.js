const mongoose = require('mongoose');

const validators = require('./blogDetailsValidator');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const titleValidators = [
    {
	validator: validators.titleLengthValidator,
	message: 'Title of the blog must be at least 5 character long and not more than 50 characters.'
    }
];

const bodyValidators = [
    {
	validator: validators.bodyLengthValidator,
	message: 'Content of blog must be at least 5 character long and not more than 2000 characters.'
    }
];

const commentValidators = [
    {
	validator: validators.commentLengthValidator,
	message: 'Comments must be at least 5 character long and not more than 2000 characters.'
    }
];

const blogSchema = new Schema({
    title: { type: String, required: true, validate: titleValidators },
    body: { type: String, required: true, validate: bodyValidators },
    createdBy: { type: String, required: true },
    createdOn: { type: Date, default: Date.now() },
    likes: { type: Number, default: 0 },
    likedBy: { type: Array },
    dislikes: { type: Number, default: 0},
    dislikedBy: { type: Array },
    comments: [
	{
	    comment: { type: String, validate: commentValidators },
	    commentator: { type: String }
	}
    ]
});

module.exports = mongoose.model('Blog', blogSchema);
