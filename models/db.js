var mongoose = require('mongoose');
var Post = require('./Post');

for (var i = 0; i < 10; i++) {
	var post = new Post();
	post._id = i + "";
	post.title = 'My blog post #' + (i+1);
	post.body = 'This is the content of my blog post number ' + (i+1);
	post.date = Date.now();
	post.state = 'published';
	//post.author.name = 'Kjell Arne';
	//post.author.email = 'ka@wsv.no';
	//post.comments.push({email: 'asdf@asdf.no', body: 'asdfa asdf asdflasdfa'});
	post.save();
	console.log('saved record #' + (i+1));
}


/*
console.log('here');

post.save(function(err) {
	if (err) { throw err; }
	console.log('saved');
	console.log('going to find');
	Post.recent(10, function(err, posts) {
		if (err) { console.log(err); throw err; }
		console.log('found');
		posts.forEach(function(post) {
			console.log(post.shortBody);
			mongoose.disconnect();
		})
	});
});
*/
