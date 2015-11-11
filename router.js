'use strict';

var express = require('express'),
		router  = express.Router(),
		service = require('./service/service');

router.get('/', function(req, res, next) {
	res.redirect('/home');
});

router.get('/home', function(req, res, next) {
	if(process.env.NODE_ENV === 'production'){
		res.sendfile(__dirname + '/build/home.html');
	}else{
		res.sendfile(__dirname + '/home.html');
	}
});

router.post('/api/send', service.send);

module.exports = router;