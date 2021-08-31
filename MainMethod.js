var getSessions = require('./GetSessions');
var fs = require('fs');

var build_name = process.env.BROWSERSTACK_BUILD_NAME;
var username = process.env.BROWSERSTACK_USERNAME
var accessKey = process.env.BROWSERSTACK_ACCESS_KEY
var basicAuthCreds = "Basic "+ new Buffer.from(username+":"+accessKey).toString("base64");

var fileName = './reports/report-'+build_name+'.html';
var stream = fs.createWriteStream(fileName);


stream.once('open', function(fd) {
	getSessions.getSession(build_name, basicAuthCreds, function(response){
		stream.end(response);
	})
	
});
