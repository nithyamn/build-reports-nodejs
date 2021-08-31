const request = require('request');
var username = process.env.BROWSERSTACK_USERNAME
var accessKey = process.env.BROWSERSTACK_ACCESS_KEY
var basicAuthVal = "Basic "+ new Buffer.from(username+":"+accessKey).toString("base64");

module.exports = function(build_name, callback){
	var build_id = '';
	var check_if_exists = 0;
	request(
		{
			url: 'https://api.browserstack.com/automate/builds.json',
			headers: {
				"Authorization" : basicAuthVal
			},
			json: true
		},
		function(err, response, body){
			if (err) { return console.log(err); }
			console.log(response.statusCode);
			for(const index in body){
				if(body[index].automation_build.name == build_name){
					build_id = body[index].automation_build.hashed_id;
					check_if_exists = 1;
					return callback(build_id);
				}
			}
			if(check_if_exists == 0){
				console.log('This build name does not exists!');
			}
		}
	);
}
