var logger = require('../../framework/logger.js');
var execute = function(){
	var status;
	logger.debug("Executing Service 3");
	status = 'success';
	return status;
};
exports.execute = execute;