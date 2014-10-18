var config = require('./config/vk.js');
var http = require('https');
var querystring = require('querystring');

//получение токена VK
/*
https://oauth.vk.com/authorize? 
 client_id=APP_ID& 
 scope=PERMISSIONS& 
 redirect_uri=REDIRECT_URI& 
 display=DISPLAY& 
 v=API_VERSION& 
 response_type=token 
*/
// запрос:
// https://oauth.vk.com/authorize?client_id=<APP_ID>&scope=offline,wall&redirect_uri=https://oauth.vk.com/blank.html&display=page&v=5.21&response_type=token
// ответ:
// https://oauth.vk.com/blank.html#access_token=<ACCESS_TOKEN>&expires_in=0&user_id=<USER_ID>

var app = {
		'access_token': config['access_token']
};

// https://api.vk.com/method/'''METHOD_NAME'''?'''PARAMETERS'''&access_token='''ACCESS_TOKEN'''
var method = 'wall.post';
var data = querystring.stringify({
	'message': 'Привет от Node.js.',
	//'attachments': '',
	'access_token': app['access_token']
});
var options = {
    host: 'api.vk.com',
    port: 443,
    path: '/method/'+method,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
    }
};

var req = http.request(options, function(res) {
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log("body: " + chunk);
    });
});

req.write(data);
req.end();

req.on('error', function(e) {
  console.error(e);
});
