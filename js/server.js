var path = require('path');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var config = require('../private/config');
var mongooseDefs = require('../mongooseDefs');


//config ====================
mongoose.connect(config.mongo.url);
    //mongoose definition variables
    var campaignsDaily = mongooseDefs.models.campaigns.daily;
    var campaignsWeekly = mongooseDefs.models.campaigns.weekly;
    var campaignsMonthly = mongooseDefs.models.campaigns.monthly;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


app.use(express.static(path.join(__dirname, '/../')));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());



//routes =====================
	//api -----------------------
    app.get('/api/campaigns/:frequency', function(req,res){
        var currentModel;
        switch (req.params.frequency){
            case "daily":
            default:
                currentModel = campaignsDaily;
                break;
            case "weekly":
                currentModel = campaignsWeekly;
                break;
            case "monthly":
                currentModel = campaignsMonthly;
        }

        var startDate = new Date(2016,3,1);

        //use mongoose to get running campaigns from this year
        currentModel.find({status:"RUNNING",forDateEndingOn:{"$gte": startDate}}).sort({salesTotal: -1}).exec(function(err, campaignAggregates){
            if(err)
                res.send(err)

            res.send(campaignAggregates);
        });
    });

    app.get('/api/campaigns/:frequency/chart', function(req,res){
        var currentModel;
        switch (req.params.frequency){
            case "daily":
            default:
                currentModel = campaignsDaily;
                break;
            case "weekly":
                currentModel = campaignsWeekly;
                break;
            case "monthly":
                currentModel = campaignsMonthly;
        }

        var chartStartDate = new Date(2016,2,1);


        //use mongoose to get running campaigns from this year
        currentModel.find({status:"RUNNING", salesTotal: {"$gt":0},forDateEndingOn:{"$gte": chartStartDate}}).sort({forDateEndingOn: 1}).exec(function(err, campaignAggregates){
            if(err)
                res.send(err)

            res.send(campaignAggregates);
        });
    });


	app.get('*', function(req,res){
		res.sendFile('/index.html');
	});

//start node server ============
app.listen(3000,function(){
	console.log('listening on port 3000')
});


