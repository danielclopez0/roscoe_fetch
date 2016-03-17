var path = require('path');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var prompt = require('prompt');

//enter in username and pw for hardcoded mongo db
prompt.start();
prompt.get(['username','password'], function(err, result){
	mongoose.connect('mongodb://' + result.username + ':'+ result.password + '@ds061385.mlab.com:61385/planet9');

	//don't run app without getting username and p/w
	app.use(express.static(path.join(__dirname, '/../')));
	app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());


	app.get('/', function(request,response){
		response.redirect('/index.html');
	});

	app.listen(3000,function(){
		console.log('listening on port 3000')
	});
});


