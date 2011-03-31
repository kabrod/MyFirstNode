var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var roleSchema = new Schema({
	_id: String,
	name: String
});

var UserSchema = new Schema({
	_id: String,
	password: String,
	firstName: String,
	lastName: String,
	date:   { type: Date, default: Date() },
	state:  { type: String, enum: ['draft', 'published', 'private'], default: 'draft' }
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

