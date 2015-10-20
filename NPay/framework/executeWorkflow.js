// @auther: love_taneja
/**
This is the file to execute a given workflow. It is a 3 step process.
*/
var executeWorkflow = function(workflowName){
	// Load framework functions
	var wf = require('../framework/getWorkflowName.js')
	var sv = require('../framework/getNextServiceName.js')
	var es = require('../framework/executeService.js');
	// Callback for Step 1
	var workflowCallback = function (err, wfName) {
		if (err) return console.error(err);
		// Callback for Step 2
		var nextServiceCallback = function (err, service) {
			if (err) return console.error(err);
			// Callback for Step 3
			var executeServiceCallback = function (err, service, status) {
				if (err) return console.error(err);
				/*
				###############################################################
				STEP 2: Get the next service to be executed in a given workflow
				###############################################################
				*/
				sv.getNextService(wfName, service, status, nextServiceCallback);
			}			
			/*
			###################################################################
			STEP 3: Execute the service
			###################################################################
			*/
			es.executeService(service, executeServiceCallback);
		};
		sv.getNextService(wfName, 'firstService', 'success', nextServiceCallback);
	};
	/*
	#############################################################################
	STEP 1: Get the workflow name
	#############################################################################
	*/
	wf.getWorkflowName(workflowName, workflowCallback);
};
exports.executeWorkflow = executeWorkflow;