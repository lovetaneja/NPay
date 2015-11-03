// @auther: love_taneja
/**
This is the file to get the workflow name from nools. The workflow name will be decided
based upon the API name in the request.
*/
// Define a nools variable
var nools = require('nools');
var logger = require('./logger.js');

/** This function will return workflow name for a given API */
// Create a flow from nools file
var flow = nools.compile("../ruleEngine/nools/getWorkflowName.nools", {name:"wfNameFlow0"});
var getWorkflowName = function(apiName, callback){
	try{
		var API = flow.getDefined("API");
		// Create a session
		var session = flow.getSession();	
		var api = new API(apiName);
		// Assert Session
		session.assert(api);
		// Execute Rules	
		session.match().then(function(err){
			if(err){
				callback(err);	
			}else{
				callback(null, api.workflowName);	
			}
		});
		logger.info('Workflow Name for ' + apiName + ' API is ' + api.workflowName + '.');
		// Clear Session
		session.dispose();
	}catch(errorMessage){
		callback(errorMessage);
	}
};
exports.getWorkflowName = getWorkflowName;


/** This method will reload getWorkflowName.nools file so that
	rules can be reflected without starting the server.
	*/
var ruleNumber = 0;
var reloadRules = function(){
	// Delete old flow
	var oldFlowName = 'wfNameFlow' + ruleNumber;
	nools.deleteFlow(oldFlowName);
	logger.info('Deleted flow having name = ' + oldFlowName);
	// Compile new rules to create a new flow	
	ruleNumber++;
	var newFlowName = 'wfNameFlow' + ruleNumber;
	flow = nools.compile("../ruleEngine/nools/getWorkflowName.nools", {name:newFlowName});
	logger.info('Reloaded Rules with flow name = ' + newFlowName);
}
exports.reloadRules = reloadRules;