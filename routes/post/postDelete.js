
var Post = require('../../models/Post');


// POST DELETE - post.jade

exports.mount = function(app, mountPath, returnPath) {

	app.get(mountPath, function(req, res) {
		Post.findById(req.param('post'), function (err, post) {
		    if (err) {
				req.flash('error', err.message);
			} else {
				post.remove(function(err) {
					if (err) {
						req.flash('error', err.message);
						return res.redirect('back');
					} else {
						req.flash('info', 'Successfully deleted post _%s_', post.title);
						return res.redirect(returnPath);
					}
				}); 
			}
		});
	});
}
