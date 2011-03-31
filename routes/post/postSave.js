
var mongoose = require('mongoose');
var Post = require('../../models/Post');


// POST SAVE - post.jade

exports.mount = function(app, mountPath, returnPath) {

	// Save a post

	app.post(mountPath, function(req, res) {
		
		var data = req.body.post;
		var post = new Post(data);

		if (data._id === 'new') {
			var max = 1;
			Post.find({}, function (err, docs) {
				if (err) {
					req.flash('error', err.message);
				}
				for (var i = 0; i < docs.length; i++) {
					if (docs[i]._id > max) max = docs[i]._id;
				}
				post = new Post({ _id: Number(max)+1, title: data.title, body: data.body });
				validateAndSave(post, 'created');
			});

		} else {
			
			Post.findById(data._id, function(err, doc) {
				if (! doc) {
					return next(new Error('Could not load Post'));
				} else {
					doc.title = post.title;
					doc.body = post.body;
					validateAndSave(doc, 'updated');
				}
			});
		}

		function validateAndSave(thisPost, action) {
			thisPost.validate(function(err) {
				if (err) {
					req.flash('error', err.message);
					return res.redirect('back');
				}

				thisPost.save(function(err) {
					if (err) {
						req.flash('error', err.message);
						return res.redirect('back');
					}
					req.flash('info', 'Successfully ' + action + ' post _%s_', thisPost.title);
					return res.redirect(returnPath);
				}); 
			});
		}
	});
}
