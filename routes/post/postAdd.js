
// POST EDIT - post.jade

exports.mount = function(app, mountPath) {

	app.get(mountPath, function(req, res){
		res.render('post/edit', { post: { _id: 'new' }, title: 'New post' });
	});
}
