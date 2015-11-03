// @auther: love_taneja
/**
This is the file to get the next service name in a workflow. The next service will be decided
based upon the workflow name, previous service and status of previous service.
*/
// Define a nools variable
var nools = require('nools');
var logger = require('./logger.js');

// Create a flow from nools file
var flow = nools.compile("../ruleEngine/nools/getNextServiceName.nools", {name:"nextServiceFlow0"});
var getNextService = function(workFlowName,serviceName,serviceStatus,callback){
	try{
		logger.debug('Inside getNextService method with: workflowName = ' + workFlowName + ' lastServiceName = ' + serviceName + ' lastServiceStatus = ' + serviceStatus);
		// Define DecisionTable from flow
		var DecisonTable = flow.getDefined("DecisionTable");
		// Create a session
		var session = flow.getSession();
		// Populate Decision table
		var dt = new DecisonTable(workFlowName,serviceName,serviceStatus);
		// Assert Session
		session.assert(dt);
		// Execute Rules
		session.match().then(function(err){
			if(err){
				callback(err);	
			}else{
				callback(null, dt.nextServiceName);
			}
		});
		if (dt.nextServiceName!=''){
			logger.info('Next Service Name is = ' + dt.nextServiceName);
		}
		// Cleare Session
		session.dispose();
	}catch(errorMessage){
		callback(errorMessage);
	}
};
exports.getNextService = getNextService;

/** This method will reload getNextServiceName.nools file so that
	rules can be reflected without starting the server.
	*/
var ruleNumber = 0;
var reloadRules = function(){
	// Delete old flow
	var oldFlowName = 'nextServiceFlow' + ruleNumber;
	nools.deleteFlow(oldFlowName);
	logger.info('Deleted flow having name = ' + oldFlowName);
	// Compile new rules to create a new flow	
	ruleNumber++;
	var newFlowName = 'nextServiceFlow' + ruleNumber;
	flow = nools.compile("../ruleEngine/nools/getNextServiceName.nools", {name:newFlowName});
	logger.info('Reloaded Rules with flow name = ' + newFlowName);
}
exports.reloadRules = reloadRules;