
var Post = require('../../models/Post');


// POST LIST - posts.jade

exports.mount = function(app, mountPath) {

	app.get(mountPath, function(req, res) {
		Post.find({}, {}, function (err, docs) {
			if (err) {
				req.flash('error', err.message);
			} else {
				res.render('post/list', { title: 'Posts', posts: docs });
			}
		});
	});
}
