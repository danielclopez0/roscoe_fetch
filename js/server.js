var path = require('path');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var prompt = require('prompt');

//enter in username and pw for hardcoded mongo db
//don't run app without getting username and p/w
prompt.start();
prompt.get(['username','password'], function(err, result){

	//config ====================
	mongoose.connect('mongodb://' + result.username + ':'+ result.password + '@ds061385.mlab.com:61385/planet9');

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	
	//CampaignAggregate schema
	var campaignAggregateSchema = mongoose.Schema({
		spendTotal: Number,
    	_p_marketingChannel: String,
    	platformCampaignId: String,
    	name: String,
    	salesTotal: Number,
    	status: String,
    	_created_at: String
	});

	//define campaign model
	var CampaignAggregate = mongoose.model('CampaignAggregate',campaignAggregateSchema,'CampaignAggregate');

	app.use(express.static(path.join(__dirname, '/../')));
	app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());



    //routes =====================
    	//api -----------------------
    	//get all docs
    	app.get('/api/campaignAggregates/:status', function(req,res){

    		//use mongoose to get first 10 campaign aggregate docs
    		CampaignAggregate.find({status: req.params.status}).sort({salesTotal: -1}).limit(10).exec(function(err, campaignAggregates){
    			if(err)
    				res.send(err)

    			res.json(campaignAggregates);
    		});
    	});


		app.get('*', function(req,res){
			res.sendFile('/index.html');
		});

	//start node server ============
	app.listen(3000,function(){
		console.log('listening on port 3000')
	});
});


