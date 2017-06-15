const request = require('request');
const baseUrl = "http://www.diax.me/dialect/";

(function(dialectnode) {
		var Dialect = function(_token, trainer) {
			this.token = _token;
			this.isTrainer = trainer;

  		this.ask = function(string, callback) {
				var options = {
				  uri: baseUrl + 'api/chatbot/ask',
				  method: 'POST',
				  json: {
				    "input": string
				  },
  				headers: {
    				'X-Token': this.token
  				}
				};
				request(options, function (error, response, body) {
					var dialectApiResponse;
				  if (!error && response.statusCode == 200) {
						var out = body.output;
						dialectApiResponse = out;
				  }
					else if (error) {
						console.log("Error occured:", error);
						dialectApiResponse = error;
					}
					callback(dialectApiResponse);
				});
  		};

			this.train = function(input, output) {
				if (this.isTrainer) {
					var options = {
					  uri: baseUrl + 'api/chatbot/train',
					  method: 'POST',
					  json: {
					    "input": input, "output": output
					  },
	  				headers: {
	    				'X-Token': this.token
	  				}
					};
					request(options, function (error, response, body) {if (error) console.log(error);});
				}
				else {
					throw "You are not a trainer. If you were recently granted the permission, try restarting your application";
				}
  		};
		}

		dialectnode.create = function (_token, callback) {
			var _isTrainer = false;
			var options1 = {
				uri: baseUrl + 'api/verification/verifytoken',
				method: 'POST',
				json: {
					"token": _token
				}
			};
			var options2 = {
				uri: baseUrl + 'api/verification/checktrainer',
				method: 'POST',
				json: {
					"token": _token
				}
			};
			request(options1, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					if (body.response == "0") {
						throw "Invalid Token";
					}
					request(options2, function (error2, response2, body2) {
						if (!error2 && response2.statusCode == 200) {
							if (body2.response == "1") {
								_isTrainer = true;
							}
							callback(new Dialect(_token, _isTrainer));
						}
						else if (error2) {
							throw new Error(error2);
						}
					});
				}
				else if (error) {
					throw new Error(error);
				}
			});
		};
}(module.exports));
