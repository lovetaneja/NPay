var logger = require('../../framework/logger.js');
var execute = function(){
	var status;
	logger.debug("Executing Service 1");
	status = 'success';
	return status;
};
exports.execute = execute;