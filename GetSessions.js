var request = require('request');
var getBuildID = require('./GetBuildID');
var http = require('http');
var fs = require('fs');


var username = process.env.BROWSERSTACK_USERNAME
var accessKey = process.env.BROWSERSTACK_ACCESS_KEY
var basicAuthVal = "Basic "+ new Buffer.from(username+":"+accessKey).toString("base64");

module.exports.getSession = function(build_name, callback){
	var session_details = '';
	var html_details = '';
	
	getBuildID(build_name, function(build_id){
		console.log('Build Name: '+build_name);
		console.log('Build ID: '+build_id); 

		//console.log('==============SESSIONS=================');
		console.log('Please find the generated report in ./reports/report-'+build_name+'.html');
		request(
			{
				url: 'https://api.browserstack.com/automate/builds/'+build_id+'/sessions.json?limit=100',
				headers: {
					"Authorization": basicAuthVal
				},
				json: true
			},
			function(err, response, body){
				if (err) { return console.log(err); }

				// session_details+='\nTest Name: '+ body[index].automation_session.name
				// 	+'\nTest Duration : '+ body[index].automation_session.duration
				// 	+'\nOS : '+ body[index].automation_session.os
				// 	+'\nOS Version: '+ body[index].automation_session.os_version
				// 	+'\nBrowser: '+ body[index].automation_session.browser
				// 	+'\nBrowser Version: '+ body[index].automation_session.browser_version
				// 	+'\nStatus: '+ body[index].automation_session.status
				// 	+'\nReason: '+ body[index].automation_session.reason
				// 	+'\nPublic Session URL: '+ body[index].automation_session.public_url
				// 	+'\n===============================';
					
				html_details = '<!DOCTYPE html>'
					       + '<html>'
					       + '<head><title>title</title></head>'
					       + '<style>table, th, td {border:1px solid black;border-collapse: collapse;}</style>'
					       + '<body>'
					       + '<h2><center><u>BrowserStack Report</u></center></h2>'
					       + '<h3><center>Build Name: '+build_name+'</center></h3>'
					       + '<h3><center>Build ID: '+build_id+'</center></h3>'
					       + '<p><center>This report can only fetch a maximum of 100 sessions per build.</center></p>'
					       + '<table style="width:100%"><thead><th style="height:50px">Name</th><th>Duration</th><th>OS</th><th>OS Version</th>'
					       + '<th>Browser</th><th>Browser Version</th><th>Status</th><th>Reason</th><th>Session ID</th><th>Public Session URL</th></thead>'
					       + '<tbody>';
				for(const index in body){
					html_details+='<tr>'
					       + '<td>'+body[index].automation_session.name+'</td>'
					       + '<td>'+body[index].automation_session.duration+'</td>'
					       + '<td>'+body[index].automation_session.os+'</td>'
					       + '<td>'+body[index].automation_session.os_version+'</td>'
					       + '<td>'+body[index].automation_session.browser+'</td>'
					       + '<td>'+body[index].automation_session.browser_version+'</td>'
					       + '<td>'+body[index].automation_session.status+'</td>'
					       + '<td>'+body[index].automation_session.reason+'</td>'
					       + '<td>'+body[index].automation_session.hashed_id+'</td>'
					       + '<td><a href="'+body[index].automation_session.public_url+'">Public Session URL</a></td>'
					       + '</tr>';
					
				}
				html_details+= '</tbody></table>'
					       + '</body>'
					       + '</html>'
				return callback(html_details);
			}
		);
	})
}


