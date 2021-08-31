var getSessions = require('./GetSessions');
var fs = require('fs');

var build_name = 'Azure .NetCore Sample';
var fileName = './reports/report-'+build_name+'.html';
var stream = fs.createWriteStream(fileName);


stream.once('open', function(fd) {
	getSessions.getSession(build_name, function(response){
		stream.end(response);
	})
	
});
