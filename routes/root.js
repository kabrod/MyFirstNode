
// ROOT - index.jade

exports.mount = function(app, mountPath) {

	app.get(mountPath, function(req, res) {
	    res.render('index', {
	        title: 'EXPRESS testing'
	    });
	});
}
