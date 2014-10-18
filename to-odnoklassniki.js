// По умолчанию права на постинг заблокированы и получение их осуществляется через службу поддержки.
// см. новый метод http://apiok.ru/wiki/display/api/mediatopic.post+ru

// документация
// http://apiok.ru/wiki/pages/viewpage.action?pageId=46137373
// калькулятор запросов:
// http://apiok.ru/wiki/pages/viewpage.action?pageId=75989046
// авторизация по oauth2.0
// http://apiok.ru/wiki/pages/viewpage.action?pageId=42476652
// npm module (Node.js)
// https://github.com/astronz/ok.ru

var config = require('./config/odnoklassniki.js');
var http = require('https');
var querystring = require('querystring');

// получение кода авторизации (доступен 2 минуты)
// http://www.odnoklassniki.ru/oauth/authorize?client_id=<APPLICATION_ID>&scope=PUBLISH_TO_STREAM;SET_STATUS;PHOTO_CONTENT;VALUABLE_ACCESS;APP_INVITE;VIDEO_CONTENT&response_type=code&redirect_uri=<REDIRECT_URI>

// код авторизации из предыдущего запроса (нужен для полчения токенов)
var code = '...';
// ниже получение токенов (маркер доступа - 30 минут, маркер обновления - 30 дней)
// {"token_type":"session","refresh_token":"...","access_token":"..."}

var app = {
		'application_id': config['application_id'], // уникальный идентификатор приложения
		'application_key': config['application_key'], // публичный ключ приложения
		'application_secret_key': config['application_secret_key'] // секретный ключ приложения
};
var redirect_uri = config['redirect_uri'];
var data = querystring.stringify({
	'code': code, // код авторизации, полученный в ответном адресе URL пользователя
	'redirect_uri': redirect_uri, // тот же URI для переадресации, который был указан при первом вызове
	'grant_type': 'authorization_code', // на данный момент поддерживается только код авторизации authorization_code
	'client_id': app['application_id'], // идентификатор приложения
	'client_secret': app['application_secret_key'] // секретный ключ приложения
});
var options = {
    host: 'api.odnoklassniki.ru',
    path: '/oauth/token.do',
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
