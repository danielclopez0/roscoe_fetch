var mongoose = require('mongoose');

var mongooseDefs = {
	schemas: {
		campaignAggregate: mongoose.Schema({
			spendTotal: Number,
			_p_marketingChannel: String,
			platformCampaignId: String,
			name: String,
			salesTotal: Number,
			status: String,
			_created_at: String,
			forDateEndingOn: [Date]
		})
	},
	models: {}
};

mongooseDefs.models.campaigns = {
	daily: mongoose.model('CampaignAggregate',mongooseDefs.schemas.campaignAggregate,'CampaignAggregate'),
	weekly: mongoose.model('CampaignAggregateWeekly',mongooseDefs.schemas.campaignAggregate,'CampaignAggregateWeekly'),
	monthly: mongoose.model('CampaignAggregateMonthly',mongooseDefs.schemas.campaignAggregate,'CampaignAggregateMonthly')
};


module.exports=mongooseDefs;