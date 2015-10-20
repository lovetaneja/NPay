// @auther: love_taneja
/**
This is the file to execute a service.
*/
var executeService = function(serviceName, callback){
	// Define service by loading <<serviceName>>.js file
	var service = require('../services/common/' + serviceName +'.js');
	// Execute Service
	status = service.execute();
	// Return the service name and status
	callback(null, serviceName, status);
};
exports.executeService = executeService;