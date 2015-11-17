// @auther: love_taneja
/**
This is validator service to validate the request parameters.
Refere following link for available validator functions: 
https://www.npmjs.com/package/validator
*/
var logger = require('../../framework/logger.js');
var validator = require('validator');
var execute = function(request){
	var status;
	// Validation for TAX
	if (request.body.apiName == 'TAX'){
		if (validator.isAlpha(request.body.senderName)&&validator.isEmail(request.body.senderEmail)){
			status = 'success';
		}else{
			status = 'failure';
		}		
	}
	// Add more logic here for validation of other APIs
	return status;
};
exports.execute = execute;