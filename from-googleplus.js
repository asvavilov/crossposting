var config = require('./config/googleplus.js');
var http = require('https');
var querystring = require('querystring');

var api_key = config['API_KEY'];
var user_id = config['userId'];

// GET https://www.googleapis.com/plus/v1/people/{userId}/activities/{collection}
// https://www.googleapis.com/plus/v1/people/{userId}/activities/public?key={YOUR_API_KEY}

var googleapis = require('googleapis');

googleapis
	.discover('plus', 'v1')
	.execute(function(err, client) {
		// handle discovery errors
		var getUserAuthdReq = client.plus.people.get({ userId: user_id }).withApiKey(api_key);
		getUserAuthdReq.execute(function(err, user) {
			console.log((err ? err.message : user.displayName));
		});
		
		var getActs = client.plus.activities.list({ userId: user_id, collection: 'public', maxResults: 1 }).withApiKey(api_key);
		getActs.execute(function(err, data) {
			console.log((err ? err.message : data));
		});

	});
