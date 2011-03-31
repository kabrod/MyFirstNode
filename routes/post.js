
var Post = require('../models/Post');

exports.mount = function(app) {

	// POST LIST - posts.jade

	app.get('/posts', function(req, res) {
		Post.find({}, {}, function (err, posts) {
			if (err) {
				req.flash('error', err.message);
			} else {
				res.render('post/list', { title: 'Posts', posts: posts });
			}
		});
	});


	// POST ADD - post.jade

	app.get('/post/add', function(req, res){
		res.render('post/edit', { post: { _id: 'new' }, title: 'New post' });
	});


	// POST EDIT - post.jade

	app.get('/post/edit/:post', function(req, res) {
		Post.findById(req.param('post'), function (err, doc) {
		    if (err) {
				req.flash('error', err.message);
			} else {
				res.render('post/edit', { post: doc, title: 'Edit', statusOptions: doc.__proto__.schema.paths.state.enumValues });
			}
		});
	});


	// POST DELETE - post.jade

	app.get('/post/delete/:post', function(req, res) {
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
						return res.redirect('/posts');
					}
				}); 
			}
		});
	});


	// POST SAVE - post.jade

	app.post('/post/save/:post', function(req, res) {

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
					doc.state = post.state;
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
					return res.redirect('/posts');
				}); 
			});
		}
	});
}
