var express = require('express');
var router = express.Router();
var debug = require('debug')('signin:index');
var querystring = require('querystring');
var url = require('url');
var mongo = require('mongodb'),
	Server = mongo.Server,
	Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('test', server);

db.open(function(err, db) {
	if (err) throw err;

	var userManager = require('../module/user')(db);

	// ******************/ page************************************************************************
	router.get('/', function(req, res, next) {
		req.session.username = querystring.parse(url.parse(req.url).query).username;
		req.session.signedIn ? res.render('info', { title: 'information' , user : req.session.user }) : res.redirect('/signin');
	});

	// ******************index page************************************************************************
	router.get('/register', function(req, res, next) {
		res.render('index', { title: 'index' });
	});

	router.post('/register', function(req, res, next) {
		if (req.body.username === undefined || req.body.username === null || req.body.username === "")
			return;
		userManager.findUserByUsername(req.body.username);
		setTimeout(function() {
			if (userManager.userdata === null || userManager.userdata === "") {
				userManager.createUser(req.body);
				req.session.user = req.body;
				req.session.signIn = true;
				res.redirect('info');
			} else res.render('index', { title: 'index' , error : '用户名已存在' });
		}, 100);

	});

	// ******************info page************************************************************************
	router.get('/info', function(req, res, next) {
		if (!req.session.signIn) res.redirect('signin');
		req.session.signIn = true;
		var username = req.session.username || querystring.parse(url.parse(req.url).query).username;
		delete req.session.username;
		if (username === undefined || username === null || username === "" || username === req.session.user.username) res.render('info', { title: 'information' , user : req.session.user });
		else res.render('info', { title: 'information' , user : req.session.user , error : "只能够访问自己的数据" });
	});

	// ******************signin page************************************************************************
	router.get('/signin', function(req, res, next) {
		if (req.session.signIn) res.redirect('info');
		res.render('signin', { title: 'sigin' });
	});

	router.post('/signin', function(req, res, next) {
		delete req.session.username;
		if (req.body.username === undefined || req.body.username === null || req.body.username === "")
			return;
		userManager.findUserByUsernameAndPassword(req.body.username, req.body.password);
		setTimeout(function() {
			if (userManager.userdata === null || userManager.userdata === "")
				res.render('signin', { title: 'sigin' , error : '错误的用户名或者密码' });
			else {
				req.session.signIn = true;
				req.session.user = userManager.userdata;
				res.redirect('info');
			}
		}, 100);
	});
	//
	// ******************signout page************************************************************************
	router.get('/signout', function(req, res, next) {
		delete req.session.signIn;
		res.redirect('/signin');
	});

	router.all('*', function(req, res, next) {
		req.session.user ? next() : res.redirect('/signin');
	});
});

module.exports = router;
