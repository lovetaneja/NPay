// @auther: love_taneja
/**
This is the file to execute a service.
*/
var executeService = function(serviceName, request, callback){
	try{
		// Define service by loading <<serviceName>>.js file
		var service = require('../services/common/' + serviceName +'.js');
		// Execute Service
		status = service.execute(request);
		// Return the service name and status
		callback(null, serviceName, status);
	}catch(errorMessage){
		callback(errorMessage);
	}
};
exports.executeService = executeService;