
var Post = require('../../models/Post');


// POST EDIT - post.jade

exports.mount = function(app, mountPath) {

	app.get(mountPath, function(req, res) {
		Post.findById(req.param('post'), function (err, doc) {
		    if (err) {
				req.flash('error', err.message);
			} else {
				res.render('post/edit', { post: doc, title: 'Edit' });
			}
		});
	});
}

