var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CommentSchema = new Schema({
	email: String,
	body:  String
});

var PostSchema = new Schema({
	_id:    String,
	title:  String,
	body:   String,
	date:   { type: Date, default: Date() },
	state:  { type: String, enum: ['draft', 'published', 'private'], default: 'draft' }
/*
	author: {
		name:  String,
		email: { type: String, validate: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ }
	},
	comments: [CommentSchema]
*/
});

PostSchema.static('recent', function(days, callback) {
	days = days || 1;
	this.find({ date: { $gte: Date.now() - 1000 * 60 * 60 * 24 * days } }, callback);
});

PostSchema.virtual('shortBody').get(function() {
	return this.body.substring(0, 30);
});

mongoose.connect('mongodb://localhost/blog');
mongoose.model('Post', PostSchema);

var Post = module.exports = mongoose.model('Post');

