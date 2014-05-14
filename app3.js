var express = require('express'),
	mongoose = require('mongoose')
, http = require('http');

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + "/public"));
});

mongoose.connect("mongodb://localhost/computer");

var UserSchema = new mongoose.Schema({
	screen_size:String,
	memory_size:String,
	price:Number,
	hard_drive:String
}),

	Users = mongoose.model('Users', UserSchema);
// INDEX	
app.get("/users", function (req, res) {
	Users.find({}, function (err, docs) {
		res.render('users/index', { users: docs });
	});
});

//NEW
app.get('/users/new', function (req, res) {
	res.render("users/new");
});

//CREATE
app.post('/users', function (req, res) {
	var b = req.body;
	new Users({
		screen_size: b.screen_size,
		memory_size: b.memory_size,
		price: b.price,
		hard_drive: b.hard_drive
	}).save(function (err, user) {
		if (err) res.json(err);
		res.redirect('/users/' + user._id);
	});
});

app.param('_id', function (req, res, next,_id) {
	Users.find({_id:_id }, function (err, docs) {
		req.user = docs[0];
		next();
	});
});

// SHOW
app.get('/users/:_id', function (req, res) {
	res.render("users/show", { user: req.user });
});

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});














